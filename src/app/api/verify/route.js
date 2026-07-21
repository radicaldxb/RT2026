import { cookies } from "next/headers";
import {
  buildChallengePayload,
  buildVerifiedPayload,
  COOKIE,
  cookieOptions,
  createChallenge,
  getVerifySecret,
  isPayloadValid,
  isValidChallengeAnswer,
  normalizeAnswer,
  signPayload,
  TTL,
  verifySignedToken,
} from "@/lib/verifyToken";

const rateLimit = new Map();
const VERIFY_LIMIT = 20;
const VERIFY_WINDOW_MS = 60 * 1000;

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function clientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.lastReset > VERIFY_WINDOW_MS) rateLimit.delete(ip);
  }
}

function checkRateLimit(req) {
  if (rateLimit.size > 5000) cleanupRateLimit();

  const ip = clientIp(req);
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 0, lastReset: Date.now() });
  }

  const ipData = rateLimit.get(ip);
  if (Date.now() - ipData.lastReset > VERIFY_WINDOW_MS) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= VERIFY_LIMIT) {
    return jsonResponse({ error: "Too many requests. Please try again later." }, 429);
  }

  ipData.count += 1;
  return null;
}

function secretOrError() {
  const secret = getVerifySecret();
  if (!secret) {
    return { error: jsonResponse({ error: "Server configuration error" }, 500) };
  }
  return { secret };
}

/** Issue a new math challenge (signed HttpOnly cookie + question for UI). */
export async function GET(req) {
  const limited = checkRateLimit(req);
  if (limited) return limited;

  const resolved = secretOrError();
  if (resolved.error) return resolved.error;

  const { n1, n2, q } = createChallenge();
  const token = signPayload(buildChallengePayload(n1, n2), resolved.secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE.challenge, token, cookieOptions(TTL.challengeSec));

  return jsonResponse({ q });
}

/** Validate challenge answer and set verified cookie. */
export async function POST(req) {
  const limited = checkRateLimit(req);
  if (limited) return limited;

  const resolved = secretOrError();
  if (resolved.error) return resolved.error;

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const answer = normalizeAnswer(body?.answer);
  if (!answer) {
    return jsonResponse({ error: "answer is required" }, 400);
  }

  const cookieStore = await cookies();
  const challengeToken = cookieStore.get(COOKIE.challenge)?.value;
  const challenge = verifySignedToken(challengeToken, resolved.secret);

  if (!challenge || challenge.type !== "challenge" || !isPayloadValid(challenge)) {
    return jsonResponse({ error: "Challenge expired or missing. Refresh and try again." }, 400);
  }

  if (!isValidChallengeAnswer(challenge.n1, challenge.n2, answer)) {
    const { n1, n2, q } = createChallenge();
    const nextToken = signPayload(buildChallengePayload(n1, n2), resolved.secret);
    cookieStore.set(COOKIE.challenge, nextToken, cookieOptions(TTL.challengeSec));
    return jsonResponse({ error: "Incorrect answer", q }, 401);
  }

  const verifiedToken = signPayload(buildVerifiedPayload(), resolved.secret);
  cookieStore.set(COOKIE.verified, verifiedToken, cookieOptions(TTL.verifySec));
  cookieStore.delete(COOKIE.challenge);

  return jsonResponse({ ok: true });
}

/** Clear verification cookies (e.g. when user clears chat). */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE.verified);
  cookieStore.delete(COOKIE.challenge);
  return jsonResponse({ ok: true });
}
