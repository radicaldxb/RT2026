import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import {
  COOKIE,
  cookieOptions,
  getVerifySecret,
  isPayloadValid,
  refreshVerifiedPayload,
  signPayload,
  TTL,
  verifySignedToken,
} from "@/lib/verifyToken";
import { getSystemPrompt } from "@/lib/rtbot/systemPrompt";
import { getKnowledge } from "@/lib/rtbot/knowledgeLoader";
import { detectEarlyExit } from "@/lib/rtbot/exitDetector";
import {
  applyConfirmedIntentFloor,
  categoryFromScore,
  isPlausiblePersonName,
  scoreConversation,
} from "@/lib/rtbot/scorer";
import { applyVisitorGeo, getVisitorCountry } from "@/lib/rtbot/gdpr";
import {
  extractLeadFields,
  generateSituationRead,
  isSituationReadMessage,
  isVendorExitMessage,
  isWrapUpMessage,
  resolveWrapUpConfirmation,
  buildWrapUpConfirmationMessage,
  shouldForceWrapUpConfirmation,
  wrapUpSystemNote,
  isValidEmail,
  visitorProvidedEmail,
} from "@/lib/rtbot/wrapUp";
import {
  fireJobSeeker,
  fireQualifiedLead,
  fireVendor,
  fireWarmLead,
  shouldBlockWebhook,
} from "@/lib/rtbot/webhooks";
import { stripInternalNarration } from "@/lib/rtbot/replySanitizer";
import { loadConversation, saveConversation } from "@/lib/rtbot/conversations";

const rateLimit = new Map();
const SESSION_ID_RE = /^[a-zA-Z0-9_-]{8,64}$/;
const REF_RE = /^[a-z0-9-]{1,64}$/;
const ALLOWED_SOURCES = new Set(["portfolio", "insights", "services", "work"]);
const UPSTREAM_TIMEOUT_MS = 30_000;
const MODEL = "claude-haiku-4-5-20251001";

let anthropicClient = null;

function getAnthropic() {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

function cleanupRateLimit() {
  const now = Date.now();
  const windowMs = 60 * 1000;
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.lastReset > windowMs) {
      rateLimit.delete(ip);
    }
  }
}

function sanitizeMetadata(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out = {};
  if (typeof raw.ref === "string" && REF_RE.test(raw.ref)) out.ref = raw.ref;
  if (typeof raw.source === "string" && ALLOWED_SOURCES.has(raw.source)) {
    out.source = raw.source;
  }
  return out;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function requireVerifiedCookie() {
  const secret = getVerifySecret();
  if (!secret) {
    return { error: jsonResponse({ error: "Server configuration error" }, 500) };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE.verified)?.value;
  const payload = verifySignedToken(token, secret);

  if (!payload || payload.type !== "verified" || !isPayloadValid(payload)) {
    return { error: jsonResponse({ error: "Verification required" }, 401) };
  }

  const refreshed = refreshVerifiedPayload(payload);
  if (refreshed) {
    cookieStore.set(
      COOKIE.verified,
      signPayload(refreshed, secret),
      cookieOptions(TTL.verifySec)
    );
  }

  return { ok: true };
}

function buildPageContext(metadata, country, gdprRequired) {
  return `Current page context:
- ref: ${metadata.ref || "none"}
- source: ${metadata.source || "none"}
- gdpr_required: ${gdprRequired}
- visitor_country: ${country || "unknown"}`;
}

function mergeContactIntoMeta(meta, fields) {
  if (isValidEmail(fields.email)) meta.captured_email = fields.email.trim();
  if (fields.name && isPlausiblePersonName(fields.name)) {
    meta.captured_name = fields.name;
  } else if (meta.captured_name && !isPlausiblePersonName(meta.captured_name)) {
    meta.captured_name = null;
  }
  if (fields.company) meta.captured_company = fields.company;
  if (fields.url) meta.captured_url = fields.url;
  if (fields.location) meta.captured_location = fields.location;
  if (fields.problem_summary) meta.problem_summary = fields.problem_summary;
  if (fields.situation_read) meta.situation_read = fields.situation_read;
  if (fields.budget) meta.captured_budget = fields.budget;
  if (fields.role_interest) meta.role_interest = fields.role_interest;
  return meta;
}

async function dispatchQualificationEvents({
  sessionId,
  score,
  exitCategory,
  session,
  conversationHistory,
  chatInput,
  assistantReply,
  unsubscribeToken,
}) {
  if (session.meta?.no_contact === true) {
    return { ...session.meta };
  }

  const meta = { ...session.meta };
  const gdprRequired = meta.gdpr_required === true;
  const fields = extractLeadFields(conversationHistory, meta);
  mergeContactIntoMeta(meta, fields);

  // Store Situation Read when delivered (not only at webhook fire time)
  if (isSituationReadMessage(assistantReply)) {
    meta.situation_read = assistantReply;
    fields.situation_read = assistantReply;
  }

  // Email submission turns must never be treated as wrap-up confirmation.
  const isEmailSubmissionTurn = /@/.test(String(chatInput || ""));

  const wrapUp = isEmailSubmissionTurn
    ? { confirmed: false, declined: false, clearPending: false }
    : resolveWrapUpConfirmation({
        priorMeta: session.meta,
        userMessage: chatInput,
        gdprRequired,
      });

  if (wrapUp.clearPending) {
    meta.wrap_up_pending = false;
  }

  if (wrapUp.declined) {
    meta.wrap_up_confirmed = false;
    if (wrapUp.gdprDeclined) {
      meta.gdpr_opt_in = false;
    }
    return meta;
  }

  if (wrapUp.confirmed) {
    meta.wrap_up_confirmed = true;
    meta.gdpr_opt_in = true;
  }

  // Pending only after a real visitor-provided email is in meta — never from
  // an assistant "Email:" line in a premature wrap-up message.
  // Email-submission turns skip confirmation above, but may still open pending
  // once the wrap-up reply is delivered with a captured email.
  if (
    isWrapUpMessage(assistantReply) &&
    isValidEmail(meta.captured_email) &&
    visitorProvidedEmail(conversationHistory, meta.captured_email, session.meta?.captured_email)
  ) {
    meta.wrap_up_pending = true;
  }

  // Confirmed wrap-up + email + problem beats keyword scoring
  applyConfirmedIntentFloor(score, {
    wrap_up_confirmed: meta.wrap_up_confirmed,
    email: fields.email || meta.captured_email,
    problem_summary: fields.problem_summary || meta.problem_summary,
  });

  if (shouldBlockWebhook(meta)) {
    return meta;
  }

  const hasConfirmedOptIn =
    (wrapUp.confirmed || meta.wrap_up_confirmed) && meta.gdpr_opt_in !== false;

  const canFireEmailWebhook = hasConfirmedOptIn && fields.email;

  if (canFireEmailWebhook) {
    const gdprOptIn = gdprRequired ? meta.gdpr_opt_in === true : true;

    // Prefer full Situation Read / close summary; otherwise build from conversation
    const richSummary = generateSituationRead(conversationHistory, {
      ...meta,
      situation_read: fields.situation_read,
    });
    if (richSummary) {
      fields.situation_read = richSummary;
      meta.situation_read = richSummary;
    }
    if (!fields.problem_summary) {
      fields.problem_summary = meta.problem_summary;
    }

    if (meta.wrap_up_confirmed && !meta.qualified_fired && score.total >= 9) {
      const sent = await fireQualifiedLead({
        fields,
        score,
        unsubscribeToken,
        gdprOptIn,
        sessionId,
      });
      if (sent) {
        meta.email_opt_in = true;
        meta.qualified_fired = true;
        meta.last_webhook_event = "qualified_lead";
        delete meta.last_webhook_skip;
        delete meta.last_webhook_error;
      } else {
        meta.last_webhook_error = "qualified_lead_failed";
      }
    } else if (
      meta.wrap_up_confirmed &&
      !meta.warm_fired &&
      score.total >= 5 &&
      score.total < 9
    ) {
      const sent = await fireWarmLead({
        fields,
        score,
        unsubscribeToken,
        gdprOptIn,
        sessionId,
      });
      if (sent) {
        meta.email_opt_in = true;
        meta.warm_fired = true;
        meta.last_webhook_event = "warm_lead";
        delete meta.last_webhook_skip;
        delete meta.last_webhook_error;
      } else {
        meta.last_webhook_error = "warm_lead_failed";
      }
    } else if (score.total < 5) {
      meta.last_webhook_skip = "score_below_5";
    }
  } else if (meta.wrap_up_pending && fields.email && !meta.wrap_up_confirmed) {
    meta.last_webhook_skip = "awaiting_confirmation";
  } else if (meta.wrap_up_confirmed && fields.email && !meta.qualified_fired && !meta.warm_fired) {
    if (score.total < 5) meta.last_webhook_skip = "score_below_5";
    else if (!fields.email) meta.last_webhook_skip = "missing_email";
  }

  const vendorReady =
    (exitCategory === "vendor" || meta.vendor_flow) &&
    fields.email &&
    fields.company &&
    isVendorExitMessage(assistantReply) &&
    !meta.vendor_fired;

  if (vendorReady && !shouldBlockWebhook(meta)) {
    const sent = await fireVendor({ fields, unsubscribeToken });
    if (sent) {
      meta.email_opt_in = true;
      meta.vendor_fired = true;
      meta.last_webhook_event = "vendor";
    } else {
      meta.last_webhook_error = "vendor_failed";
    }
  }

  if (exitCategory === "vendor") {
    meta.vendor_flow = true;
  }

  const jobReady =
    (exitCategory === "jobseeker" || meta.job_seeker_flow) &&
    fields.email &&
    fields.name &&
    fields.role_interest &&
    !meta.job_seeker_fired;

  if (jobReady && !shouldBlockWebhook(meta)) {
    const sent = await fireJobSeeker({ fields, unsubscribeToken });
    if (sent) {
      meta.email_opt_in = true;
      meta.job_seeker_fired = true;
      meta.last_webhook_event = "job_seeker";
    } else {
      meta.last_webhook_error = "job_seeker_failed";
    }
  }

  if (exitCategory === "jobseeker") {
    meta.job_seeker_flow = true;
  }

  return meta;
}

export async function POST(req) {
  try {
    const verified = await requireVerifiedCookie();
    if (verified.error) return verified.error;

    let ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (!ip) ip = req.headers.get("x-real-ip")?.trim();
    if (!ip) ip = "unknown";

    const limit = 40;
    const windowMs = 60 * 1000;

    if (rateLimit.size > 5000) cleanupRateLimit();

    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, { count: 0, lastReset: Date.now() });
    }

    const ipData = rateLimit.get(ip);
    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return jsonResponse({ error: "Too many requests. Please try again later." }, 429);
    }

    ipData.count += 1;

    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const chatInput = body?.chatInput;
    const sessionId =
      typeof body?.sessionId === "string" && SESSION_ID_RE.test(body.sessionId)
        ? body.sessionId
        : "anonymous";
    const metadata = sanitizeMetadata(body?.metadata);

    if (!chatInput || typeof chatInput !== "string") {
      return jsonResponse({ error: "chatInput must be a non-empty string" }, 400);
    }

    if (chatInput.length > 500) {
      return jsonResponse({
        reply: "Message is too long. Please limit it to 500 characters.",
      });
    }

    const anthropic = getAnthropic();
    if (!anthropic) {
      console.error("Missing ANTHROPIC_API_KEY environment variable");
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    const country = await getVisitorCountry(req);

    let session;
    try {
      session = await loadConversation(sessionId);
    } catch (err) {
      console.error("Failed to load conversation:", err);
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    applyVisitorGeo(session.meta, country);
    const resolvedCountry = session.meta.visitor_country || "unknown";
    const gdprRequired = session.meta.gdpr_required === true;

    const priorUserTurns = session.messages.filter((m) => m.role === "user").length;
    const turnNumber = priorUserTurns + 1;
    const exitCategory = detectEarlyExit(chatInput, turnNumber);
    const isFirstApiTurn = session.messages.length === 0;

    const fieldsBeforeReply = extractLeadFields(
      [...session.messages, { role: "user", content: chatInput }],
      session.meta
    );
    const emailJustCaptured = Boolean(
      isValidEmail(fieldsBeforeReply.email) && !isValidEmail(session.meta.captured_email)
    );
    const shouldPromptWrapUp =
      emailJustCaptured &&
      !exitCategory &&
      !session.meta.wrap_up_confirmed &&
      !session.meta.wrap_up_pending &&
      !session.meta.vendor_flow &&
      !session.meta.job_seeker_flow;

    let userContent = chatInput;
    if (exitCategory) {
      userContent = `[System note: early_exit_category=${exitCategory}]\n\n${chatInput}`;
    } else if (shouldPromptWrapUp) {
      userContent = `${wrapUpSystemNote({ gdprRequired })}\n\n${chatInput}`;
    } else if (isFirstApiTurn) {
      userContent = `[System note: The chat UI already delivered Hello, human verification, and asked: "What's on your mind? Are you here with a bold idea you want to bring to life, or are you looking for help with something in your current business?" The message below is the visitor's answer. Do not repeat that opening. If name is not yet captured, ask for name FIRST — do not answer their question or share contact details yet. Once name is confirmed, say "Hi [Name], let's get into it." then address their message.]\n\n${chatInput}`;
    }

    const conversationHistory = [
      ...session.messages,
      { role: "user", content: userContent },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    let response;
    try {
      response = await anthropic.messages.create(
        {
          model: MODEL,
          max_tokens: 500,
          system: [
            {
              type: "text",
              text: getSystemPrompt(),
              cache_control: { type: "ephemeral" },
            },
            {
              type: "text",
              text: getKnowledge(),
              cache_control: { type: "ephemeral" },
            },
            {
              type: "text",
              text: buildPageContext(metadata, resolvedCountry, gdprRequired),
            },
          ],
          messages: conversationHistory,
        },
        { signal: controller.signal }
      );
    } catch (err) {
      if (err?.name === "AbortError") {
        return jsonResponse({ error: "Upstream request timed out" }, 504);
      }
      console.error("Anthropic API error:", err);
      return jsonResponse({ error: "Upstream request failed" }, 502);
    } finally {
      clearTimeout(timeout);
    }

    const rawReply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    let reply = stripInternalNarration(rawReply) || rawReply;

    const fieldsAfterReply = extractLeadFields(
      [...conversationHistory, { role: "assistant", content: reply || "" }],
      session.meta
    );
    const emailCapturedThisTurn = Boolean(
      isValidEmail(fieldsAfterReply.email) && !isValidEmail(session.meta.captured_email)
    );

    if (
      shouldForceWrapUpConfirmation({
        meta: session.meta,
        fields: fieldsAfterReply,
        emailJustCaptured: emailCapturedThisTurn,
        assistantReply: reply,
      })
    ) {
      const nutshell = generateSituationRead(conversationHistory, {
        ...session.meta,
        situation_read: fieldsAfterReply.situation_read || session.meta.situation_read,
        problem_summary: fieldsAfterReply.problem_summary || session.meta.problem_summary,
        captured_name: fieldsAfterReply.name || session.meta.captured_name,
      });
      reply = buildWrapUpConfirmationMessage({
        fields: fieldsAfterReply,
        gdprRequired,
        nutshell,
      });
    }

    const updatedHistory = [
      ...conversationHistory,
      { role: "assistant", content: reply || "I need a moment. Could you say that again?" },
    ];

    const score = scoreConversation(updatedHistory);
    const category = categoryFromScore(score.total, exitCategory);

    let meta;
    let emailOptIn = session.email_opt_in;
    try {
      meta = await dispatchQualificationEvents({
        sessionId,
        score,
        exitCategory,
        session,
        conversationHistory: updatedHistory,
        chatInput,
        assistantReply: reply,
        unsubscribeToken: session.unsubscribe_token,
      });
      if (meta.email_opt_in === true) {
        emailOptIn = true;
        delete meta.email_opt_in;
      }
    } catch (err) {
      console.error("Qualification webhook dispatch failed:", err);
      meta = session.meta;
    }

    try {
      await saveConversation(sessionId, {
        messages: updatedHistory,
        qualification_score: score.total,
        category,
        meta,
        unsubscribe_token: session.unsubscribe_token,
        email_opt_in: emailOptIn,
      });
    } catch (err) {
      console.error("Failed to save conversation:", err);
    }

    return jsonResponse({ reply: reply || "I need a moment. Could you say that again?" });
  } catch (error) {
    console.error("API route crashed:", error);
    const message =
      process.env.NODE_ENV === "development" && error?.message
        ? error.message
        : "Internal Server Error";
    return jsonResponse({ error: message }, 500);
  }
}
