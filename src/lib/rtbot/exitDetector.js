const VENDOR_SIGNALS = [
  "we offer",
  "our product",
  "our service",
  "i wanted to reach out",
  "we help companies",
  "our team specialises",
  "our team specializes",
  "we provide",
  "our platform",
  "partnership opportunity",
  "pitch our",
];

const JOB_SIGNALS = [
  "vacancy",
  "vacancies",
  "looking for work",
  "looking for a job",
  "job opening",
  "open position",
  "open positions",
  "hiring",
  "apply for a position",
  "join your team",
  "join the team",
  "send my cv",
  "send my resume",
  "career opportunity",
];

const INJECTION_SIGNALS = [
  "ignore previous",
  "ignore your instructions",
  "reveal your prompt",
  "system prompt",
  "you are now",
  "pretend you are",
];

export function detectEarlyExit(message, turnNumber) {
  const lower = message.toLowerCase();

  if (turnNumber <= 4) {
    if (VENDOR_SIGNALS.some((s) => lower.includes(s))) return "vendor";
    if (JOB_SIGNALS.some((s) => lower.includes(s))) return "jobseeker";
  }
  if (INJECTION_SIGNALS.some((s) => lower.includes(s))) return "injection";

  return null;
}

export function isVendorSignal(message) {
  if (!message || typeof message !== "string") return false;
  const lower = message.toLowerCase();
  return VENDOR_SIGNALS.some((s) => lower.includes(s));
}

export function isJobSeekerSignal(message) {
  if (!message || typeof message !== "string") return false;
  const lower = message.toLowerCase();
  return JOB_SIGNALS.some((s) => lower.includes(s));
}

// Keep named exports aligned with signal lists for tests/extension.
export const vendorSignals = VENDOR_SIGNALS;
export const jobSignals = JOB_SIGNALS;
export const injectionSignals = INJECTION_SIGNALS;
