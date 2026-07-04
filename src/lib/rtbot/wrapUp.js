import {
  extractCapturedContact,
  extractCompany,
  extractRoleInterest,
  visitorMessages,
} from "./scorer";

const URL_RE = /https?:\/\/[^\s<>"']+|(?:www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const AFFIRMATIVES =
  /^(yes|yeah|great|perfect|correct|looks good|that'?s right|that'?s correct|yep|sure|absolutely|confirmed|go ahead|sounds good|all good|spot on)/i;

const NEGATIVE_RE =
  /^(no|nope|nah|don'?t|do not|not really)\b|(?:no thanks|don'?t send|do not contact|don'?t email|withdraw)/i;

const SITUATION_READ_RE =
  /stepping stone|that gap between|that'?s exactly where radical thinking works|we have covered a lot of ground|let me summarise what i am hearing/i;

export function isWrapUpMessage(text) {
  if (!text || typeof text !== "string") return false;
  return (
    /before i send this over/i.test(text) ||
    /does that look right/i.test(text) ||
    /look right to you/i.test(text) ||
    /do you give permission/i.test(text) ||
    /permission to receive emails/i.test(text) ||
    /you will receive a follow-up from radical thinking/i.test(text)
  );
}

export function isSituationReadMessage(text) {
  if (!text || typeof text !== "string") return false;
  return SITUATION_READ_RE.test(text);
}

export function isConfirmation(message) {
  if (!message || typeof message !== "string") return false;
  const trimmed = message.trim();
  if (!trimmed || NEGATIVE_RE.test(trimmed)) return false;
  return AFFIRMATIVES.test(trimmed);
}

/** @deprecated use isConfirmation */
export function isAffirmative(text) {
  return isConfirmation(text);
}

export function isNegative(text) {
  if (!text || typeof text !== "string") return false;
  return NEGATIVE_RE.test(text.trim());
}

export function isVendorExitMessage(text) {
  if (!text || typeof text !== "string") return false;
  return /not looking to bring on new vendors/i.test(text);
}

function extractLocation(messages) {
  for (const text of [...visitorMessages(messages)].reverse()) {
    const locMatch = text.match(
      /(?:based in|located in|from|i(?:'m| am) in)\s+([A-Za-z][A-Za-z\s,.-]{2,40})/i
    );
    if (locMatch) return locMatch[1].trim();
  }
  return null;
}

function extractProblemSummary(messages) {
  for (const text of visitorMessages(messages)) {
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
    if (isSituationReadMessage(msg.content)) {
      return msg.content;
    }
  }
  return null;
}

export function generateSituationRead(messages, meta = {}) {
  if (meta.situation_read) return meta.situation_read;

  const extracted = extractSituationRead(messages);
  if (extracted) return extracted;

  const summary = meta.problem_summary || extractProblemSummary(messages);
  const name =
    meta.captured_name || extractCapturedContact(messages).name || null;

  if (summary) {
    return name
      ? `Conversation summary for ${name}: ${summary}`
      : `Conversation summary: ${summary}`;
  }

  const recent = visitorMessages(messages).slice(-3).join(" ").trim();
  if (!recent) return null;
  const clipped = recent.length > 500 ? `${recent.slice(0, 497)}...` : recent;
  return name
    ? `Conversation summary for ${name}: ${clipped}`
    : `Conversation summary: ${clipped}`;
}

export function extractLeadFields(messages, meta = {}) {
  const contact = extractCapturedContact(messages);
  const visitorCombined = visitorMessages(messages).join("\n");
  const urlMatch = visitorCombined.match(URL_RE);

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

  if (isConfirmation(userMessage)) {
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

  // Keep pending open for natural follow-ups that are not yet a yes/no
  return { confirmed: false, declined: false, clearPending: false };
}
