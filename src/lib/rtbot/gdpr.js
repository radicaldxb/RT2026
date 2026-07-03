export const GDPR_COUNTRIES = [
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI",
  "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT",
  "NL", "PL", "PT", "RO", "SE", "SI", "SK", "GB", "IS", "LI", "NO",
];

/**
 * Netlify injects geo on proxied serverless requests. Next.js route handlers do
 * not need `export const runtime = 'edge'` for this; on Netlify, edge runtime
 * API routes still execute in the Node functions region.
 */
export function getVisitorCountry(req) {
  const fromHeader =
    req.headers.get("x-country") ||
    req.headers.get("x-nf-country") ||
    "";

  if (fromHeader) return fromHeader.toUpperCase();

  try {
    const code = globalThis.Netlify?.context?.geo?.country?.code;
    if (code) return code.toUpperCase();
  } catch {
    // Netlify global unavailable outside their runtime
  }

  return "";
}

export function isGdprRequired(country) {
  if (!country || typeof country !== "string") return false;
  return GDPR_COUNTRIES.includes(country.toUpperCase());
}
