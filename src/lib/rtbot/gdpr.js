export const GDPR_COUNTRIES = [
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI",
  "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT",
  "NL", "PL", "PT", "RO", "SE", "SI", "SK", "GB", "IS", "LI", "NO",
];

export function isGdprRequired(country) {
  if (!country || typeof country !== "string") return false;
  return GDPR_COUNTRIES.includes(country.toUpperCase());
}
