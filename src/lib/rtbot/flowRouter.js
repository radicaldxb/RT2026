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
  "who do i speak to",
  "who should i speak to",
  "book a call",
  "speak to someone",
  "talk to someone",
  "schedule a call",
  "talk to a human",
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
 */
export function resolveFlowForTurn({ meta, chatInput, exitCategory }) {
  if (exitCategory === "vendor" || exitCategory === "jobseeker") {
    return meta.flow || null;
  }
  if (meta.flow) return meta.flow;
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

/** Third-answer language that should divert to Flow 4 instead of calendar. */
export function signalsExploringOnly(message) {
  if (!message || typeof message !== "string") return false;
  return /explor|still think|not ready|just looking|researching|early days|early stage|not sure yet|kicking tyres|kicking tires|maybe later|just curious/i.test(
    message
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
