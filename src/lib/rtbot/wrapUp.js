import {
  extractCapturedContact,
  extractCompany,
  extractRoleInterest,
  isPlausiblePersonName,
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

function emptyToNull(value) {
  if (value == null) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  if (/^(not provided|n\/a|none|unknown|-)$/i.test(trimmed)) return null;
  return trimmed;
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

function extractBudget(messages) {
  for (const text of [...visitorMessages(messages)].reverse()) {
    const match = text.match(
      /(\d[\d,.]*(?:\s*[kK])?(?:\s*(?:AED|USD|GBP|EUR|£|\$))?|\b(?:AED|USD|GBP|EUR)\s*\d[\d,.]*)/i
    );
    if (match) return match[0].trim();
    if (/flexible|open|tbd/i.test(text) && text.length < 40) return text.trim();
  }
  return null;
}

function extractProblemSummary(messages) {
  for (const text of visitorMessages(messages)) {
    if (text.length < 20 || text.length > 280) continue;
    if (/^(yes|no|ok|hello|hi)\b/i.test(text)) continue;
    if (/@/.test(text)) continue;
    if (isConfirmation(text)) continue;
    if (isPlausiblePersonName(text)) continue;
    return text.length > 200 ? `${text.slice(0, 197)}...` : text;
  }
  return null;
}

/** Fields the bot already listed in the wrap-up confirmation block. */
function extractFromWrapUpAssistant(messages) {
  const out = {
    name: null,
    email: null,
    company: null,
    location: null,
    url: null,
    nutshell: null,
  };

  for (const msg of [...messages].reverse()) {
    if (msg.role !== "assistant" || !isWrapUpMessage(msg.content)) continue;
    const content = msg.content;

    const name = content.match(/^\s*Name:\s*(.+)$/im);
    const email = content.match(/^\s*Email:\s*(.+)$/im);
    const company = content.match(/^\s*Company:\s*(.+)$/im);
    const location = content.match(/^\s*Location:\s*(.+)$/im);
    const url = content.match(/^\s*URL:\s*(.+)$/im);
    const nutshell = content.match(/^\s*In a nutshell:\s*(.+)$/im);

    const nameValue = emptyToNull(name?.[1]);
    out.name = nameValue && isPlausiblePersonName(nameValue) ? nameValue : null;
    out.email = emptyToNull(email?.[1]);
    out.company = emptyToNull(company?.[1]);
    out.location = emptyToNull(location?.[1]);
    out.url = emptyToNull(url?.[1]);
    out.nutshell = emptyToNull(nutshell?.[1]);
    break;
  }

  return out;
}

/** Stage 3 plain-language summary (before go-deeper / send-summary question). */
function extractCloseSummary(messages) {
  for (const msg of [...messages].reverse()) {
    if (msg.role !== "assistant") continue;
    const content = msg.content;
    if (!content) continue;

    const nutshell = content.match(/^\s*In a nutshell:\s*(.+)$/im);
    if (nutshell) return emptyToNull(nutshell[1]);

    if (
      /would you like to go a bit deeper|shall i send you a summary of what we discussed/i.test(
        content
      )
    ) {
      const cleaned = content
        .replace(/Based on what you have shared[\s\S]*/i, "")
        .replace(/Would you like to go a bit deeper[\s\S]*/i, "")
        .trim();
      if (cleaned.length > 40) return cleaned;
    }
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

function substantiveVisitorLines(messages) {
  return visitorMessages(messages).filter((text) => {
    if (text.length < 8) return false;
    if (/@/.test(text)) return false;
    if (isConfirmation(text)) return false;
    if (isNegative(text)) return false;
    if (isPlausiblePersonName(text)) return false;
    if (/^(yes|no|ok|hello|hi|thanks|thank you)\b/i.test(text)) return false;
    if (/^(i have a bold idea|looking for help|i need help)/i.test(text)) return false;
    return true;
  });
}

function isThinFallbackSummary(text) {
  return /^Conversation summary(?: for [^:]+)?:/i.test(text || "");
}

export function generateSituationRead(messages, meta = {}) {
  // Keep a real Situation Read / close summary; rebuild thin one-line fallbacks
  if (meta.situation_read && !isThinFallbackSummary(meta.situation_read)) {
    return meta.situation_read;
  }

  const extracted = extractSituationRead(messages);
  if (extracted) return extracted;

  const closeSummary = extractCloseSummary(messages);
  if (closeSummary) return closeSummary;

  const wrapUp = extractFromWrapUpAssistant(messages);
  if (wrapUp.nutshell) return wrapUp.nutshell;

  const lines = substantiveVisitorLines(messages);
  const metaName = isPlausiblePersonName(meta.captured_name)
    ? meta.captured_name
    : null;
  const name = metaName || extractCapturedContact(messages).name || null;
  const budget = extractBudget(messages);

  if (lines.length) {
    const body = lines
      .slice(0, 6)
      .map((line) => (line.length > 180 ? `${line.slice(0, 177)}...` : line))
      .join(" ");
    const withBudget =
      budget && !new RegExp(budget.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(body)
        ? `${body} Budget: ${budget}.`
        : body;
    const clipped =
      withBudget.length > 800 ? `${withBudget.slice(0, 797)}...` : withBudget;
    return name ? `${name}: ${clipped}` : clipped;
  }

  const summary = meta.problem_summary || extractProblemSummary(messages);
  if (summary) {
    return name ? `${name}: ${summary}` : summary;
  }

  return null;
}

export function extractLeadFields(messages, meta = {}) {
  const contact = extractCapturedContact(messages);
  const visitorCombined = visitorMessages(messages).join("\n");
  const urlMatch = visitorCombined.match(URL_RE);
  const metaName = isPlausiblePersonName(meta.captured_name)
    ? meta.captured_name
    : null;
  const wrapUp = extractFromWrapUpAssistant(messages);

  return {
    name: metaName || contact.name || wrapUp.name || null,
    email: meta.captured_email || contact.email || wrapUp.email || null,
    company:
      meta.captured_company ||
      wrapUp.company ||
      extractCompany(messages) ||
      null,
    url: meta.captured_url || wrapUp.url || (urlMatch ? urlMatch[0] : null),
    location:
      meta.captured_location ||
      wrapUp.location ||
      extractLocation(messages) ||
      null,
    budget: meta.captured_budget || extractBudget(messages) || null,
    problem_summary:
      meta.problem_summary || extractProblemSummary(messages) || null,
    situation_read:
      meta.situation_read ||
      extractSituationRead(messages) ||
      extractCloseSummary(messages) ||
      wrapUp.nutshell ||
      null,
    role_interest: meta.role_interest || extractRoleInterest(messages) || null,
  };
}

export function resolveWrapUpConfirmation({ priorMeta, userMessage, gdprRequired }) {
  if (!priorMeta?.wrap_up_pending) {
    return { confirmed: false, declined: false, clearPending: false };
  }

  const confirmationMatch = isConfirmation(userMessage);
  const negativeMatch = isNegative(userMessage);
  console.log("[wrap-up confirmation check]", {
    wrap_up_pending: priorMeta.wrap_up_pending,
    userMessage,
    userMessageJSON: JSON.stringify(userMessage),
    isConfirmation: confirmationMatch,
    isNegative: negativeMatch,
  });

  if (confirmationMatch) {
    return { confirmed: true, declined: false, clearPending: true };
  }

  if (negativeMatch) {
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

/**
 * After email is captured, the wrap-up confirmation must be shown before any
 * lead webhook can fire. Returns true when we should inject that message.
 */
export function shouldForceWrapUpConfirmation({
  meta = {},
  fields = {},
  emailJustCaptured = false,
  assistantReply = "",
}) {
  if (!fields.email) return false;
  if (meta.wrap_up_confirmed) return false;
  if (meta.wrap_up_pending) return false;
  if (meta.no_contact) return false;
  if (meta.vendor_flow || meta.job_seeker_flow) return false;
  if (isWrapUpMessage(assistantReply)) return false;
  if (isVendorExitMessage(assistantReply)) return false;

  // Email landed this turn and Claude did not present confirmation
  return Boolean(emailJustCaptured);
}

export function buildWrapUpConfirmationMessage({
  fields = {},
  gdprRequired = false,
  nutshell = null,
}) {
  const name = emptyToNull(fields.name) || "Not yet provided";
  const email = emptyToNull(fields.email) || "Not yet provided";
  const company = emptyToNull(fields.company);
  const location = emptyToNull(fields.location);
  const url = emptyToNull(fields.url);
  const summaryRaw =
    emptyToNull(nutshell) ||
    emptyToNull(fields.situation_read) ||
    emptyToNull(fields.problem_summary) ||
    "A conversation about where you are and what you want to achieve.";
  const summary =
    summaryRaw.length > 220 ? `${summaryRaw.slice(0, 217)}...` : summaryRaw;

  const lines = [
    "Before I send this over, here is what I have:",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
  ];

  if (company) lines.push(`Company: ${company}`);
  if (location) lines.push(`Location: ${location}`);
  if (url) lines.push(`URL: ${url}`);
  lines.push(`In a nutshell: ${summary}`);
  lines.push("");

  if (gdprRequired) {
    lines.push(
      "Do you give permission to receive emails from Radical Thinking at that address? You can withdraw consent any time."
    );
  } else {
    lines.push(
      "You will receive a follow-up from Radical Thinking at that email. You can opt out any time. Does that look right?"
    );
  }

  return lines.join("\n");
}

/** System note so Claude delivers wrap-up immediately after email capture. */
export function wrapUpSystemNote({ gdprRequired = false } = {}) {
  const confirmLine = gdprRequired
    ? 'End with: "Do you give permission to receive emails from Radical Thinking at that address? You can withdraw consent any time."'
    : 'End with: "You will receive a follow-up from Radical Thinking at that email. You can opt out any time. Does that look right?"';

  return `[System note: The visitor just provided their email. Do not ask more discovery questions. Immediately deliver the wrap-up confirmation exactly in this form:

Before I send this over, here is what I have:

Name: [name]
Email: [email]
[Company: name if given]
[Location: location if given]
[URL: url if given]
In a nutshell: [one sentence plain-language summary in the visitor's words]

${confirmLine}

Do not fire or mention any webhook. Wait for their explicit yes/no.]`;
}
