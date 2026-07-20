import { isPlausiblePersonName, stripSystemNote } from "./scorer";

export const FLOW = {
  BOLD_IDEA: "bold_idea",
  BUSINESS_PROBLEM: "business_problem",
  QUICK_CONTACT: "quick_contact",
};

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

export const CALENDAR_BOOKING_URL = "https://radical-thinking.net/chat";

function normalize(text) {
  return typeof text === "string" ? text.toLowerCase().trim().replace(/[.!?]+$/, "") : "";
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
 * Chip/metadata.flow wins when meta.flow is not yet set.
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
 * After name is known, each non-chip / non-name user turn counts as one
 * Flow 5 answer. Returns the updated answer count.
 * Also stamps problem / timeline / readiness on meta in question order.
 */
export function nextQuickContactAnswerCount({
  meta,
  chatInput,
  nameWasAlreadyKnown,
}) {
  const current = Number(meta.quick_contact_answers) || 0;
  if (meta.flow !== FLOW.QUICK_CONTACT) return current;
  if (!meta.captured_name || !nameWasAlreadyKnown) return current;
  if (flowFromChip(chatInput)) return current;
  if (isPlausiblePersonName(chatInput)) return current;

  const next = current + 1;
  const answer = typeof chatInput === "string" ? chatInput.trim() : "";
  if (next === 1 && answer) meta.qc_problem = answer;
  if (next === 2 && answer) meta.qc_timeline = answer;
  if (next === 3 && answer) meta.qc_readiness = answer;
  return next;
}

export function shouldOfferQuickContactCalendar(meta) {
  if (meta.flow !== FLOW.QUICK_CONTACT) return false;
  if (meta.calendar_offered) return false;
  return (Number(meta.quick_contact_answers) || 0) >= 3;
}

export function isQuickContactReadyToFire(meta) {
  return (
    meta.flow === FLOW.QUICK_CONTACT &&
    !meta.quick_contact_fired &&
    (Number(meta.quick_contact_answers) || 0) >= 3
  );
}

/**
 * Per-turn coaching for Flow 5 so the model stays on the three-question path.
 * Returns null when calendar/exploring notes should take over instead.
 */
export function quickContactGuidanceNote(meta) {
  if (meta.flow !== FLOW.QUICK_CONTACT) return null;
  if (meta.calendar_offered) return null;

  const answers = Number(meta.quick_contact_answers) || 0;
  const hasName = Boolean(meta.captured_name);

  if (!hasName) {
    return `[System note: flow=quick_contact. Name is not confirmed yet. Ask for their name only. Do not start the three qualifying questions yet. Do not offer the calendar.]`;
  }

  if (answers <= 0) {
    return `[System note: flow=quick_contact. Name is confirmed (${meta.captured_name}). Say "Hi ${meta.captured_name}, let's get into it." Then ask ONLY this question: "What are you trying to solve?" Do not ask anything else. No Situation Read. No brief.]`;
  }

  if (answers === 1) {
    return `[System note: flow=quick_contact. Answer 1 (problem) received. Ask ONLY this question next: "What is the timeline?" Do not re-ask the problem. No calendar yet.]`;
  }

  if (answers === 2) {
    return `[System note: flow=quick_contact. Answer 2 (timeline) received. Ask ONLY this question next: "Is this something you are actively looking to move on, or still at the exploring stage?" Do not ask anything else. No calendar yet.]`;
  }

  // answers >= 3 handled by calendar / exploring notes in the route
  return null;
}

/**
 * Hard lock block for the model system channel (not a user-message note).
 * Keeps Flow 5 from drifting into Flow 4 diagnostic questions.
 */
export function buildActiveFlowSystemBlock(meta) {
  if (!meta?.flow) return null;

  if (meta.flow === FLOW.QUICK_CONTACT) {
    if (meta.calendar_offered) {
      return `ACTIVE FLOW LOCK: quick_contact (Flow 5). Calendar step already triggered. Do not switch to Flow 3 or Flow 4. Do not ask diagnostic questions.`;
    }

    const answers = Number(meta.quick_contact_answers) || 0;
    const hasName = Boolean(meta.captured_name);
    let step;
    if (!hasName) {
      step = `Ask for their name only. Do not start qualifying questions.`;
    } else if (answers <= 0) {
      step = `Say "Hi ${meta.captured_name}, let's get into it." Then ask ONLY: "What are you trying to solve?"`;
    } else if (answers === 1) {
      step = `Ask ONLY: "What is the timeline?"`;
    } else if (answers === 2) {
      step = `Ask ONLY: "Is this something you are actively looking to move on, or still at the exploring stage?"`;
    } else {
      step = `Three answers are complete. Offer the calendar. Do not ask more questions.`;
    }

    return `ACTIVE FLOW LOCK: quick_contact (Flow 5 — Quick Contact).

You are locked to Flow 5 for this conversation. Do NOT use Flow 3 (Bold Idea) or Flow 4 (Business Problem) question lists.
Forbidden: "What specifically is not working?", "What have you already tried?", "What does the experience look like when it is fixed?", T²/C observations, Situation Read, brief artefacts, extra discovery questions.
Maximum three qualifying questions total. One question per reply.

Current step: ${step}`;
  }

  if (meta.flow === FLOW.BOLD_IDEA) {
    return `ACTIVE FLOW LOCK: bold_idea (Flow 3). Follow Flow 3 only. Do not switch to Flow 4 or Flow 5.`;
  }

  if (meta.flow === FLOW.BUSINESS_PROBLEM) {
    return `ACTIVE FLOW LOCK: business_problem (Flow 4). Follow Flow 4 only. Do not switch to Flow 5 unless the visitor explicitly asks to book a call.`;
  }

  return null;
}

/** Third-answer language that should divert to Flow 4 instead of calendar. */
export function signalsExploringOnly(message) {
  if (!message || typeof message !== "string") return false;
  const lower = message.toLowerCase().trim();
  // Only clear "still exploring / not ready" readiness answers — not problem descriptions.
  return /\b(still (at the )?explor|only explor|just explor|not ready|just looking|maybe later|just curious|kicking tyres|kicking tires|not sure yet)\b/i.test(
    lower
  );
}

export function quickContactCalendarSystemNote() {
  return `[System note: Flow 5 (quick_contact). The visitor has now answered the three qualifying questions. Offer the calendar immediately with: "Sounds like it makes sense to talk directly. Let me find a time that works." Include this booking link: ${CALENDAR_BOOKING_URL}. Do not ask more questions. Do not deliver a Situation Read or brief artefact.]`;
}

export function quickContactExploringSystemNote() {
  return `[System note: Flow 5 third answer signals exploring only. Do not offer the calendar. Switch to Flow 4 (Business Problem). Say there is still some thinking to do before a call and help them work through it in chat. Start with Flow 4 question order.]`;
}

export function flowRoutingSystemNote(flow) {
  if (!flow) return null;
  return `[System note: Commit to flow=${flow}. Do not announce the flow name. After name is confirmed, follow that flow's question order and close rules. Once routed, do not re-route unless the visitor explicitly changes intent.]`;
}
