import { extractCapturedContact } from "./scorer";

const URL_RE = /https?:\/\/[^\s<>"']+|(?:www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const AFFIRMATIVE_RE =
  /^(yes|yeah|yep|yup|correct|that'?s right|that looks right|looks good|all good|sure|ok|okay|go ahead|please do|i agree|you have my permission|absolutely|definitely)\b/i;

const NEGATIVE_RE =
  /^(no|nope|nah|don'?t|do not|not really)\b|(?:no thanks|don'?t send|do not contact|don'?t email|withdraw)/i;

export function isWrapUpMessage(text) {
  if (!text || typeof text !== "string") return false;
  return (
    /before i send this over/i.test(text) ||
    /does that look right/i.test(text) ||
    /do you give permission/i.test(text)
  );
}

export function isAffirmative(text) {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  if (NEGATIVE_RE.test(trimmed)) return false;
  return AFFIRMATIVE_RE.test(trimmed);
}

export function isNegative(text) {
  if (!text || typeof text !== "string") return false;
  return NEGATIVE_RE.test(text.trim());
}

function extractRoleInterest(messages) {
  for (const msg of [...messages].reverse()) {
    if (msg.role !== "user") continue;
    const roleMatch = msg.content.match(
      /(?:looking for|interested in|role|position|work as)\s+(.{3,120})/i
    );
    if (roleMatch) return roleMatch[1].trim();
  }
  return null;
}

function extractCompany(messages) {
  const combined = messages.map((m) => m.content).join("\n");
  const patterns = [
    /(?:company(?:\s+name)?|we(?:'re| are)|i work at|from)\s+(?:is\s+)?([A-Z][A-Za-z0-9 &.'-]{2,60})/i,
    /(?:at|for)\s+([A-Z][A-Za-z0-9 &.'-]{2,40})/,
  ];
  for (const pattern of patterns) {
    const match = combined.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}

function extractLocation(messages) {
  for (const msg of [...messages].reverse()) {
    if (msg.role !== "user") continue;
    const locMatch = msg.content.match(
      /(?:based in|located in|from|i(?:'m| am) in)\s+([A-Za-z][A-Za-z\s,.-]{2,40})/i
    );
    if (locMatch) return locMatch[1].trim();
  }
  return null;
}

function extractProblemSummary(messages) {
  for (const msg of messages) {
    if (msg.role !== "user") continue;
    const text = msg.content.trim();
    if (text.length < 20 || text.length > 280) continue;
    if (/^(yes|no|ok|hello|hi)\b/i.test(text)) continue;
    if (/@/.test(text)) continue;
    return text.length > 200 ? `${text.slice(0, 197)}...` : text;
  }
  return null;
}

function extractSituationRead(messages) {
  for (const msg of [...messages].reverse()) {
    if (msg.role !== "assistant") continue;
    if (
      /stepping stone|that gap between|that's exactly where radical thinking works/i.test(
        msg.content
      )
    ) {
      return msg.content;
    }
  }
  return null;
}

export function extractLeadFields(messages, meta = {}) {
  const contact = extractCapturedContact(messages);
  const combined = messages.map((m) => m.content).join("\n");
  const urlMatch = combined.match(URL_RE);

  return {
    name: meta.captured_name || contact.name || null,
    email: meta.captured_email || contact.email || null,
    company: meta.captured_company || extractCompany(messages) || null,
    url: meta.captured_url || (urlMatch ? urlMatch[0] : null),
    location: meta.captured_location || extractLocation(messages) || null,
    problem_summary: meta.problem_summary || extractProblemSummary(messages) || null,
    situation_read: meta.situation_read || extractSituationRead(messages) || null,
    role_interest: meta.role_interest || extractRoleInterest(messages) || null,
  };
}

export function resolveWrapUpConfirmation({ priorMeta, userMessage, gdprRequired }) {
  if (!priorMeta?.wrap_up_pending) {
    return { confirmed: false, declined: false, clearPending: false };
  }

  if (isAffirmative(userMessage)) {
    return { confirmed: true, declined: false, clearPending: true };
  }

  if (isNegative(userMessage)) {
    return {
      confirmed: false,
      declined: true,
      clearPending: true,
      gdprDeclined: gdprRequired,
    };
  }

  return { confirmed: false, declined: false, clearPending: true };
}
