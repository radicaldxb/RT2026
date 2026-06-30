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

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function secretOrError() {
  const secret = getVerifySecret();
  if (!secret) {
    return { error: jsonResponse({ error: "Server configuration error" }, 500) };
  }
  return { secret };
}

/** Issue a new math challenge (signed HttpOnly cookie + question for UI). */
export async function GET() {
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
