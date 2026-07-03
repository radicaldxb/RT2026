const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const SYSTEM_NOTE_RE = /^\[System note:[\s\S]*?\]\s*\n\n?/i;

const CHITCHAT_RE =
  /^(hello|hi|hey|yes|no|ok|okay|sure|thanks|thank you|yep|nope|correct|fine|good|great|cool|maybe|please|absolutely|definitely)\.?$/i;

const NAME_LABEL_RE =
  /(?:my name is|i am|i'm|im|this is|it's|its|call me|name's|name is)\s+([A-Za-z][A-Za-z' -]{0,48}[A-Za-z])/i;

const SIMPLE_NAME_RE = /^[A-Za-z][a-z]+(?:\s+[A-Za-z][a-z'-]+){0,2}$/;

/** Strip server-injected system notes from a stored user message. */
export function stripSystemNote(content) {
  if (typeof content !== "string") return "";
  return content.replace(SYSTEM_NOTE_RE, "").trim();
}

/** Actual visitor text only — never assistant content or system notes. */
export function visitorMessages(messages) {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => stripSystemNote(m.content))
    .filter((text) => text.length > 0);
}

function titleCaseName(raw) {
  return raw
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function looksLikeBareName(text) {
  if (!text || text.length > 50) return false;
  if (EMAIL_RE.test(text)) return false;
  if (CHITCHAT_RE.test(text)) return false;
  if (/\d/.test(text)) return false;
  if (/[?!@#$%^&*(){}[\]|\\/<>,]/.test(text)) return false;
  return SIMPLE_NAME_RE.test(text);
}

export function extractCapturedContact(messages) {
  const visitor = visitorMessages(messages);
  const combined = visitor.join("\n");
  const emailMatch = combined.match(EMAIL_RE);

  let name = null;
  for (const text of [...visitor].reverse()) {
    const labelMatch = text.match(NAME_LABEL_RE);
    if (labelMatch) {
      name = titleCaseName(labelMatch[1]);
      break;
    }
    if (looksLikeBareName(text)) {
      name = titleCaseName(text);
      break;
    }
  }

  return {
    email: emailMatch ? emailMatch[0] : null,
    name,
  };
}

export function extractCompany(messages) {
  for (const text of [...visitorMessages(messages)].reverse()) {
    const patterns = [
      /(?:company(?:\s+name)?|company is)\s+(?:is\s+)?([A-Za-z0-9][A-Za-z0-9 &.'-]{1,58})/i,
      /(?:i work at|we are|we're|work at)\s+([A-Za-z0-9][A-Za-z0-9 &.'-]{1,58})/i,
      /(?:our company is)\s+([A-Za-z0-9][A-Za-z0-9 &.'-]{1,58})/i,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
  }
  return null;
}

export function extractRoleInterest(messages) {
  for (const text of [...visitorMessages(messages)].reverse()) {
    if (/looking for help/i.test(text)) continue;
    if (/bold idea|current business/i.test(text)) continue;

    const patterns = [
      /(?:role|position|job)(?:\s+i(?:'m| am)\s+looking for)?\s*(?:is\s+)?(?:a\s+)?([A-Za-z][A-Za-z0-9 /,&-]{2,80})/i,
      /(?:interested in|looking for a)\s+(?:a\s+)?([A-Za-z][A-Za-z0-9 /,&-]{2,80})/i,
      /(?:i(?:'m| am) a)\s+([A-Za-z][A-Za-z0-9 /,&-]{2,80})/i,
      /(?:work as|want to be)\s+(?:a\s+)?([A-Za-z][A-Za-z0-9 /,&-]{2,80})/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (!match) continue;
      const value = match[1].trim();
      if (/^(help|work|something|a job|employment)\b/i.test(value)) continue;
      return value;
    }
  }
  return null;
}

function userText(messages) {
  return visitorMessages(messages).join("\n").toLowerCase();
}

function hasAny(text, patterns) {
  return patterns.some((p) => text.includes(p));
}

export function scoreConversation(messages) {
  const score = {
    problemClarity: 0,
    businessLegitimacy: 0,
    decisionAuthority: 0,
    budgetSignal: 0,
    intentSignal: 0,
  };

  const text = userText(messages);
  if (!text.trim()) {
    return { total: 0, breakdown: score };
  }

  if (hasAny(text, ["revenue", "customers", "users", "conversion", "churn", "pipeline"])) {
    score.problemClarity = 3;
  } else if (hasAny(text, ["problem", "issue", "struggling", "broken", "not working", "failing"])) {
    score.problemClarity = 2;
  } else if (hasAny(text, ["ai", "website", "automation", "chatbot", "platform"])) {
    score.problemClarity = 1;
  }

  if (hasAny(text, ["we run", "our company", "our business", "my team", "employees", "clients"])) {
    score.businessLegitimacy = 3;
  } else if (hasAny(text, ["company", "business", "startup", "agency", "brand"])) {
    score.businessLegitimacy = 2;
  } else if (hasAny(text, ["project", "idea", "product"])) {
    score.businessLegitimacy = 1;
  }

  if (hasAny(text, ["i decide", "decision maker", "founder", "ceo", "owner", "i run"])) {
    score.decisionAuthority = 2;
  } else if (hasAny(text, ["my boss", "team needs", "we need approval", "stakeholder"])) {
    score.decisionAuthority = 1;
  }

  if (hasAny(text, ["budget", "£", "$", "aed", "invest", "spend", "paid", "quote"])) {
    score.budgetSignal = 2;
  } else if (hasAny(text, ["afford", "cost", "pricing", "funds"])) {
    score.budgetSignal = 1;
  }

  if (hasAny(text, ["asap", "urgent", "this month", "ready to start", "need help now"])) {
    score.intentSignal = 2;
  } else if (hasAny(text, ["interested", "exploring", "looking for", "want to"])) {
    score.intentSignal = 1;
  }

  const total = Object.values(score).reduce((a, b) => a + b, 0);
  return { total, breakdown: score };
}

export function categoryFromExit(exitType) {
  if (exitType === "vendor") return "vendor";
  if (exitType === "jobseeker") return "jobseeker";
  if (exitType === "injection") return "spam";
  return "unknown";
}

export function categoryFromScore(total, exitType) {
  if (exitType) return categoryFromExit(exitType);
  if (total >= 9) return "prospect";
  if (total >= 5) return "warm";
  return "unknown";
}
