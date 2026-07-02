const VENDOR_SIGNALS = [
  "we offer",
  "our product",
  "our service",
  "i wanted to reach out",
  "we help companies",
  "our team specialises",
  "our team specializes",
];

const JOB_SIGNALS = [
  "vacancy",
  "vacancies",
  "looking for work",
  "job opening",
  "hiring",
  "apply for a position",
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

  if (turnNumber <= 2) {
    if (VENDOR_SIGNALS.some((s) => lower.includes(s))) return "vendor";
    if (JOB_SIGNALS.some((s) => lower.includes(s))) return "jobseeker";
  }
  if (INJECTION_SIGNALS.some((s) => lower.includes(s))) return "injection";

  return null;
}

// Keep named exports aligned with signal lists for tests/extension.
export const vendorSignals = VENDOR_SIGNALS;
export const jobSignals = JOB_SIGNALS;
export const injectionSignals = INJECTION_SIGNALS;
