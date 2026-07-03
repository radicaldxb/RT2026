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
  categoryFromScore,
  extractCapturedContact,
  scoreConversation,
} from "@/lib/rtbot/scorer";
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

function buildPageContext(metadata) {
  return `Current page context:\n- ref: ${metadata.ref || "none"}\n- source: ${metadata.source || "none"}`;
}

async function postWebhook(url, payload) {
  if (!url) return;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch (err) {
    console.error("Webhook dispatch failed:", err);
  }
}

async function postChatWebhook(event, payload) {
  const url = process.env.N8N_CHAT_WEBHOOK;
  if (!url) return;
  await postWebhook(url, { event, ...payload });
}

async function dispatchQualificationEvents({
  sessionId,
  score,
  exitCategory,
  session,
  conversationHistory,
  metadata,
}) {
  const contact = extractCapturedContact(conversationHistory);
  const meta = { ...session.meta };

  if (contact.email) meta.captured_email = contact.email;
  if (contact.name) meta.captured_name = contact.name;

  const basePayload = {
    sessionId,
    email: meta.captured_email || null,
    name: meta.captured_name || null,
    score: score.total,
    conversation: conversationHistory,
    metadata,
  };

  if (exitCategory === "vendor" && !meta.vendor_fired) {
    await postChatWebhook("vendor_exit", basePayload);
    meta.vendor_fired = true;
  }

  if (exitCategory === "jobseeker" && !meta.job_seeker_fired) {
    await postChatWebhook("job_seeker", basePayload);
    meta.job_seeker_fired = true;
  }

  if (score.total >= 9 && !meta.qualified_fired) {
    await postChatWebhook("qualified_lead", basePayload);
    meta.qualified_fired = true;
  } else if (
    score.total >= 5 &&
    score.total <= 8 &&
    meta.captured_email &&
    !meta.warm_fired
  ) {
    await postChatWebhook("warm_lead", basePayload);
    meta.warm_fired = true;
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

    let session;
    try {
      session = await loadConversation(sessionId);
    } catch (err) {
      console.error("Failed to load conversation:", err);
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    const priorUserTurns = session.messages.filter((m) => m.role === "user").length;
    const turnNumber = priorUserTurns + 1;
    const exitCategory = detectEarlyExit(chatInput, turnNumber);
    const isFirstApiTurn = session.messages.length === 0;

    let userContent = chatInput;
    if (exitCategory) {
      userContent = `[System note: early_exit_category=${exitCategory}]\n\n${chatInput}`;
    } else if (isFirstApiTurn) {
      userContent = `[System note: The chat UI already delivered Hello, human verification, and asked: "What's on your mind? Are you here with a bold idea you want to bring to life, or are you looking for help with something in your current business?" The message below is the visitor's answer. Do not repeat that opening. Proceed to name capture (Turn 2).]\n\n${chatInput}`;
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
              text: buildPageContext(metadata),
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

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    const updatedHistory = [
      ...conversationHistory,
      { role: "assistant", content: reply || "I need a moment. Could you say that again?" },
    ];

    const score = scoreConversation(updatedHistory);
    const category = categoryFromScore(score.total, exitCategory);

    let meta;
    try {
      meta = await dispatchQualificationEvents({
        sessionId,
        score,
        exitCategory,
        session,
        conversationHistory: updatedHistory,
        metadata,
      });
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
