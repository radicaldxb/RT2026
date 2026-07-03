export const GDPR_COUNTRIES = [
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI",
  "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT",
  "NL", "PL", "PT", "RO", "SE", "SI", "SK", "GB", "IS", "LI", "NO",
];

function countryFromHeaders(req) {
  const fromHeader =
    req.headers.get("x-rt-visitor-country") ||
    req.headers.get("x-country") ||
    req.headers.get("x-nf-country") ||
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "";

  return fromHeader ? fromHeader.toUpperCase() : "";
}

function countryFromNetlifyContext() {
  try {
    const code = globalThis.Netlify?.context?.geo?.country?.code;
    if (code) return code.toUpperCase();
  } catch {
    // unavailable outside Netlify
  }
  return "";
}

async function countryFromNetlifyFunctions() {
  try {
    const { getContext } = await import("@netlify/functions");
    const code = getContext()?.geo?.country?.code;
    if (code) return code.toUpperCase();
  } catch {
    // @netlify/functions unavailable locally or outside Netlify
  }
  return "";
}

export async function getVisitorCountry(req) {
  const fromHeader = countryFromHeaders(req);
  if (fromHeader) return fromHeader;

  const fromGlobal = countryFromNetlifyContext();
  if (fromGlobal) return fromGlobal;

  return countryFromNetlifyFunctions();
}

export function isGdprRequired(country) {
  if (!country || typeof country !== "string") return false;
  return GDPR_COUNTRIES.includes(country.toUpperCase());
}

/** Persist geo on meta without wiping a previously detected country. */
export function applyVisitorGeo(meta, country) {
  if (country) {
    meta.visitor_country = country;
    meta.gdpr_required = isGdprRequired(country);
    return meta;
  }

  if (!meta.visitor_country) {
    meta.gdpr_required = false;
  }

  return meta;
}
