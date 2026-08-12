import { isJobSeekerSignal, isVendorSignal } from "./exitDetector";
import { isPlausiblePersonName, stripSystemNote } from "./scorer";
import { isValidEmail } from "./wrapUp";

export const FLOW = {
  BOLD_IDEA: "bold_idea",
  BUSINESS_PROBLEM: "business_problem",
  QUICK_CONTACT: "quick_contact",
};

export const QC_Q_NAME = "What is your name?";
export const QC_Q_HELP = "How can we help? Describe what you are looking for.";
export const QC_Q_EMAIL = "What is your email address?";

export function buildQuickContactDoneReply(name) {
  const first =
    name && typeof name === "string" ? name.trim().split(/\s+/)[0] : null;
  if (first) {
    return `Thanks, ${first}. We've got your details. Someone from Radical Thinking will generally be back to you within one business day. Is there anything else we can help with while you're here?`;
  }
  return "Thanks. We've got your details. Someone from Radical Thinking will generally be back to you within one business day. Is there anything else we can help with while you're here?";
}

export const QC_Q_RESPONSE_TIME =
  "Generally within one business day. Is there anything else we can help with while you're here?";

const CHIP_TO_FLOW = {
  "i have a bold idea": FLOW.BOLD_IDEA,
  "i have a business problem": FLOW.BUSINESS_PROBLEM,
  "get in touch": FLOW.QUICK_CONTACT,
};

const QUICK_CONTACT_SIGNALS = [
  "get in touch",
  "i want to get in touch",
  "just want to get in touch",
  "just looking to get in touch",
  "who do i speak to",
  "who should i speak to",
  "book a call",
  "book an appointment",
  "book a meeting",
  "make an appointment",
  "schedule a call",
  "schedule a meeting",
  "schedule an appointment",
  "speak to someone",
  "talk to someone",
  "talk to a human",
  "set up a call",
  "set up a meeting",
];

const HELP_SEEKING_SIGNALS = [
  "need help",
  "looking for help",
  "want help",
  "could use help",
  "need advice",
  "looking for advice",
  "need support",
  "help us",
  "help me with",
  "help with",
  "looking for someone",
  "need someone to",
  "ai advisory",
  "advisory on",
  "consulting",
  "consultation",
];

const BOLD_IDEA_SIGNALS = [
  "bold idea",
  "i want to build",
  "i want to create",
  "i want to launch",
  "we want to build",
  "we want to launch",
  "starting something",
  "new product",
  "new app",
  "an idea for",
];

const BUSINESS_PROBLEM_SIGNALS = [
  "business problem",
  "not working",
  "is broken",
  "tried and",
  "is failing",
  "struggling with",
  "help with my business",
  "problem with",
  "pain point",
];

function normalize(text) {
  return typeof text === "string" ? text.toLowerCase().trim().replace(/[.!?]+$/, "") : "";
}

function isQuickContactOpener(message) {
  if (!message || typeof message !== "string") return false;
  if (flowFromChip(message) === FLOW.QUICK_CONTACT) return true;
  const lower = message.toLowerCase();
  return QUICK_CONTACT_SIGNALS.some((s) => lower.includes(s));
}

function isHelpSeekingMessage(message) {
  if (!message || typeof message !== "string") return false;
  const lower = message.toLowerCase();
  if (lower.length < 8) return false;
  return HELP_SEEKING_SIGNALS.some((s) => lower.includes(s));
}

function isResponseTimeQuestion(input) {
  return /how long|when will|get back|hear from|response time|turnaround|how soon|wait to hear/i.test(
    input
  );
}

/** Short closers after quick-contact is done. Keep the canned reply for these only. */
function isTrivialFollowUp(input) {
  const lower = normalize(input);
  if (!lower) return true;
  if (lower.length > 48) return false;
  return /^(thanks|thank you|thx|ty|ok|okay|cool|great|perfect|cheers|bye|goodbye|no|nope|nothing|nothing else|that's all|thats all|all good|no thanks|no thank you)$/i.test(
    lower
  );
}

/** Exact opening-chip match. */
export function flowFromChip(message) {
  return CHIP_TO_FLOW[normalize(message)] || null;
}

/**
 * Route from the first substantive visitor message (or chip).
 * Vendor / job-seeker are handled via detectEarlyExit in the route.
 */
export function detectConversationFlow(message) {
  if (!message || typeof message !== "string") return null;

  if (isVendorSignal(message) || isJobSeekerSignal(message)) {
    return null;
  }

  const chip = flowFromChip(message);
  if (chip) return chip;

  const lower = message.toLowerCase();

  if (QUICK_CONTACT_SIGNALS.some((s) => lower.includes(s))) {
    return FLOW.QUICK_CONTACT;
  }
  if (BOLD_IDEA_SIGNALS.some((s) => lower.includes(s))) {
    return FLOW.BOLD_IDEA;
  }
  if (BUSINESS_PROBLEM_SIGNALS.some((s) => lower.includes(s))) {
    return FLOW.BUSINESS_PROBLEM;
  }
  if (isHelpSeekingMessage(message)) {
    return FLOW.QUICK_CONTACT;
  }

  return null;
}

/**
 * Resolve flow for this turn. Once meta.flow is set, commit (do not re-route).
 */
export function resolveFlowForTurn({ meta, chatInput, exitCategory, requestedFlow = null }) {
  if (exitCategory === "vendor" || exitCategory === "jobseeker") {
    return null;
  }
  if (meta.flow) return meta.flow;
  if (
    requestedFlow === FLOW.BOLD_IDEA ||
    requestedFlow === FLOW.BUSINESS_PROBLEM ||
    requestedFlow === FLOW.QUICK_CONTACT
  ) {
    return requestedFlow;
  }
  return detectConversationFlow(stripSystemNote(chatInput));
}

export function getQuickContactStep(meta) {
  return Number(meta.quick_contact_answers) || 0;
}

export function isQuickContactReadyToFire(meta) {
  return (
    meta.flow === FLOW.QUICK_CONTACT &&
    !meta.quick_contact_fired &&
    getQuickContactStep(meta) >= 3 &&
    isValidEmail(meta.captured_email)
  );
}

/**
 * Deterministic Flow 5 handler. Returns null if not in quick_contact.
 */
export function processQuickContactTurn(meta, chatInput) {
  if (meta.flow !== FLOW.QUICK_CONTACT) return null;

  const input = typeof chatInput === "string" ? chatInput.trim() : "";

  if (meta.quick_contact_closed) {
    if (isResponseTimeQuestion(input)) {
      return { reply: QC_Q_RESPONSE_TIME, meta: {}, fireWebhook: false };
    }
    // Real questions (work, AI, services, etc.) leave Flow 5 so Claude can answer.
    if (!isTrivialFollowUp(input)) {
      return {
        reply: null,
        handoff: true,
        meta: { flow: null },
        fireWebhook: false,
      };
    }
    return {
      reply:
        "Happy to help if there is anything else. Ask about Radical Thinking, our services, or our work.",
      meta: {},
      fireWebhook: false,
    };
  }

  const step = getQuickContactStep(meta);

  // Chip or contact intent — start with question 1 (do not count as an answer).
  if (step === 0 && isQuickContactOpener(input)) {
    return {
      reply: QC_Q_NAME,
      meta: { quick_contact_answers: 0 },
      fireWebhook: false,
    };
  }

  // Free-text help that routed to Flow 5 — acknowledge briefly, then ask name.
  if (step === 0 && isHelpSeekingMessage(input) && !isPlausiblePersonName(input)) {
    return {
      reply: `Happy to help. ${QC_Q_NAME}`,
      meta: { quick_contact_answers: 0, qc_help: input, qc_problem: input },
      fireWebhook: false,
    };
  }

  // Step 0: name
  if (step === 0) {
    if (!isPlausiblePersonName(input)) {
      return { reply: QC_Q_NAME, meta: {}, fireWebhook: false };
    }
    const helpAlready = meta.qc_help || meta.qc_problem;
    if (helpAlready) {
      return {
        reply: QC_Q_EMAIL,
        meta: {
          captured_name: input,
          quick_contact_answers: 2,
        },
        fireWebhook: false,
      };
    }
    return {
      reply: QC_Q_HELP,
      meta: {
        captured_name: input,
        quick_contact_answers: 1,
      },
      fireWebhook: false,
    };
  }

  // Step 1: help / what they are looking for
  if (step === 1) {
    if (input.length < 3) {
      return { reply: QC_Q_HELP, meta: {}, fireWebhook: false };
    }
    return {
      reply: QC_Q_EMAIL,
      meta: {
        qc_help: input,
        qc_problem: input,
        problem_summary: input,
        quick_contact_answers: 2,
      },
      fireWebhook: false,
    };
  }

  // Step 2: email
  if (step === 2) {
    if (!isValidEmail(input)) {
      return { reply: QC_Q_EMAIL, meta: {}, fireWebhook: false };
    }
    return {
      reply: buildQuickContactDoneReply(meta.captured_name),
      meta: {
        captured_email: input.trim(),
        quick_contact_answers: 3,
        quick_contact_closed: true,
      },
      fireWebhook: true,
    };
  }

  return {
    reply: buildQuickContactDoneReply(meta.captured_name),
    meta: { quick_contact_closed: true },
    fireWebhook: false,
  };
}

export function buildActiveFlowSystemBlock(meta) {
  if (!meta?.flow) return null;

  if (meta.flow === FLOW.QUICK_CONTACT) {
    return `ACTIVE FLOW LOCK: quick_contact (Flow 5). Handled deterministically by the server. Do not intervene.`;
  }

  if (meta.flow === FLOW.BOLD_IDEA) {
    return `ACTIVE FLOW LOCK: bold_idea (Flow 3). Follow Flow 3 only. Do not switch to Flow 4 or Flow 5.`;
  }

  if (meta.flow === FLOW.BUSINESS_PROBLEM) {
    return `ACTIVE FLOW LOCK: business_problem (Flow 4). Follow Flow 4 only.`;
  }

  return null;
}

export function flowRoutingSystemNote(flow) {
  if (!flow) return null;
  return `[System note: Commit to flow=${flow}. Do not announce the flow name. After name is confirmed, follow that flow's question order and close rules. Once routed, do not re-route unless the visitor explicitly changes intent.]`;
}
