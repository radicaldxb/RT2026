import {
  extractCapturedContact,
  extractCompany,
  extractRoleInterest,
  visitorMessages,
} from "./scorer";

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
    /look right to you/i.test(text) ||
    /do you give permission/i.test(text) ||
    /permission to receive emails/i.test(text) ||
    /you will receive a follow-up from radical thinking/i.test(text)
  );
}

export function isAffirmative(text) {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  if (!trimmed || NEGATIVE_RE.test(trimmed)) return false;
  if (AFFIRMATIVE_RE.test(trimmed)) return true;

  // Short natural confirmations: "yes please", "that's fine", "go for it"
  if (trimmed.length <= 60) {
    return /\b(yes|yeah|yep|yup|sure|correct|right|fine|good|absolutely|definitely|please)\b/i.test(
      trimmed
    );
  }

  return false;
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
