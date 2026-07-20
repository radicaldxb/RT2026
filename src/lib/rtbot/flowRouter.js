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
export const QC_Q_DONE = "We will get back to you as soon as possible.";

const CHIP_TO_FLOW = {
  "i have a bold idea": FLOW.BOLD_IDEA,
  "i have a business problem": FLOW.BUSINESS_PROBLEM,
  "get in touch": FLOW.QUICK_CONTACT,
};

const QUICK_CONTACT_SIGNALS = [
  "get in touch",
  "i want to get in touch",
  "just want to get in touch",
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
  "talk to stephan",
  "speak to stephan",
  "set up a call",
  "set up a meeting",
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
  if (flowFromChip(message)) return true;
  const lower = message.toLowerCase();
  return QUICK_CONTACT_SIGNALS.some((s) => lower.includes(s));
}

/** Exact opening-chip match. */
export function flowFromChip(message) {
  return CHIP_TO_FLOW[normalize(message)] || null;
}

/**
 * Route from the first substantive visitor message (or chip).
 * Vendor / job-seeker exits are handled separately by detectEarlyExit.
 */
export function detectConversationFlow(message) {
  if (!message || typeof message !== "string") return null;

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

  return null;
}

/**
 * Resolve flow for this turn. Once meta.flow is set, commit (do not re-route).
 */
export function resolveFlowForTurn({ meta, chatInput, exitCategory, requestedFlow = null }) {
  if (exitCategory === "vendor" || exitCategory === "jobseeker") {
    return meta.flow || null;
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

/**
 * Flow 5 step: 0 = awaiting name, 1 = awaiting help, 2 = awaiting email, 3 = done.
 */
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
 * Deterministic Flow 5 handler. Returns null if not in quick_contact or already closed.
 */
export function processQuickContactTurn(meta, chatInput) {
  if (meta.flow !== FLOW.QUICK_CONTACT) return null;
  if (meta.quick_contact_closed) return null;

  const input = typeof chatInput === "string" ? chatInput.trim() : "";
  const step = getQuickContactStep(meta);

  // Chip or contact intent — start with question 1 (do not count as an answer).
  if (step === 0 && isQuickContactOpener(input)) {
    return {
      reply: QC_Q_NAME,
      meta: { quick_contact_answers: 0 },
      fireWebhook: false,
    };
  }

  // Step 0: name
  if (step === 0) {
    if (!isPlausiblePersonName(input)) {
      return { reply: QC_Q_NAME, meta: {}, fireWebhook: false };
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
      reply: QC_Q_DONE,
      meta: {
        captured_email: input.trim(),
        quick_contact_answers: 3,
        quick_contact_closed: true,
      },
      fireWebhook: true,
    };
  }

  return {
    reply: QC_Q_DONE,
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
