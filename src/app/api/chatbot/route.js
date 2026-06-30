// src/app/api/chatbot/route.js
import { cookies } from "next/headers";
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

const rateLimit = new Map();
const SESSION_ID_RE = /^[a-zA-Z0-9_-]{8,64}$/;
const REF_RE = /^[a-z0-9-]{1,64}$/;
const ALLOWED_SOURCES = new Set(["portfolio", "insights", "services", "work"]);
const UPSTREAM_TIMEOUT_MS = 30_000;

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

    const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing N8N_WEBHOOK_URL environment variable");
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    const n8nPayload = { chatInput, sessionId };
    if (Object.keys(metadata).length > 0) n8nPayload.metadata = metadata;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    let n8nRes;
    try {
      n8nRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n8nPayload),
        signal: controller.signal,
      });
    } catch (err) {
      if (err?.name === "AbortError") {
        return jsonResponse({ error: "Upstream request timed out" }, 504);
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    const rawText = await n8nRes.text();

    let data;
    try {
      const parsed = JSON.parse(rawText);
      const item = Array.isArray(parsed) ? parsed[0] || {} : parsed || {};
      let reply =
        item.output || item.reply || item.text || item.message || item.content;

      if (typeof reply === "object" && reply !== null) {
        reply = JSON.stringify(reply);
      } else if (reply === undefined || reply === null) {
        reply = typeof item === "string" ? item : JSON.stringify(item);
      }
      data = { reply: String(reply) };
    } catch {
      data = { reply: rawText || "No response from upstream service." };
    }

    return jsonResponse(data, n8nRes.ok ? 200 : 502);
  } catch (error) {
    console.error("API route crashed:", error);
    const message =
      process.env.NODE_ENV === "development" && error?.message
        ? error.message
        : "Internal Server Error";
    return jsonResponse({ error: message }, 500);
  }
}
