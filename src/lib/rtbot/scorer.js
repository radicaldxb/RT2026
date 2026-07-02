const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

function userText(messages) {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n")
    .toLowerCase();
}

function hasAny(text, patterns) {
  return patterns.some((p) => text.includes(p));
}

export function extractCapturedContact(messages) {
  const combined = messages.map((m) => m.content).join("\n");
  const emailMatch = combined.match(EMAIL_RE);
  let name = null;

  for (const msg of [...messages].reverse()) {
    if (msg.role !== "user") continue;
    const nameMatch = msg.content.match(
      /(?:my name is|i am|i'm|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i
    );
    if (nameMatch) {
      name = nameMatch[1].trim();
      break;
    }
  }

  return {
    email: emailMatch ? emailMatch[0] : null,
    name,
  };
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
