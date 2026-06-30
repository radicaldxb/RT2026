import { createHmac, timingSafeEqual } from "crypto";

const VERIFY_TTL_SEC = 30 * 60;
const CHALLENGE_TTL_SEC = 10 * 60;

const NUMBER_WORDS = {
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
};

export function getVerifySecret() {
  const secret = process.env.RT_VERIFY_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "development") {
    return "rt-dev-verify-secret-change-in-production";
  }
  return null;
}

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function signPayload(payload, secret) {
  const data = JSON.stringify(payload);
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${Buffer.from(data, "utf8").toString("base64url")}.${sig}`;
}

export function verifySignedToken(token, secret) {
  if (!token || typeof token !== "string") return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const dataB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let data;
  try {
    data = Buffer.from(dataB64, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = createHmac("sha256", secret).update(data).digest("base64url");
  if (!safeEqual(sig, expected)) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function createChallenge() {
  const n1 = Math.floor(Math.random() * 9) + 1;
  const n2 = Math.floor(Math.random() * 9) + 1;
  return { n1, n2, q: `${n1} + ${n2} =` };
}

export function normalizeAnswer(value) {
  return typeof value === "string" ? value.toLowerCase().trim() : "";
}

export function isValidChallengeAnswer(n1, n2, answer) {
  if (!Number.isInteger(n1) || !Number.isInteger(n2)) return false;
  if (n1 < 1 || n1 > 9 || n2 < 1 || n2 > 9) return false;

  const sum = n1 + n2;
  const normalized = normalizeAnswer(answer);
  if (!normalized) return false;

  const accepted = new Set([String(sum)]);
  const word = NUMBER_WORDS[sum];
  if (word) accepted.add(word);

  return accepted.has(normalized);
}

export function buildChallengePayload(n1, n2) {
  const exp = Date.now() + CHALLENGE_TTL_SEC * 1000;
  return { type: "challenge", n1, n2, exp };
}

export function buildVerifiedPayload() {
  const exp = Date.now() + VERIFY_TTL_SEC * 1000;
  return { type: "verified", exp };
}

export function refreshVerifiedPayload(existing) {
  if (!existing || existing.type !== "verified") return null;
  if (typeof existing.exp !== "number" || existing.exp < Date.now()) return null;
  return buildVerifiedPayload();
}

export function isPayloadValid(payload) {
  if (!payload || typeof payload.exp !== "number") return false;
  return payload.exp > Date.now();
}

export const COOKIE = {
  challenge: "rt_challenge",
  verified: "rt_verified",
};

export const TTL = {
  verifySec: VERIFY_TTL_SEC,
  challengeSec: CHALLENGE_TTL_SEC,
};

export function cookieOptions(maxAgeSec) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSec,
  };
}
