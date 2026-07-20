const NARRATION_PARAGRAPH_PATTERNS = [
  /\bPath [ABC]\b/i,
  /\bon-ramp to Path\b/i,
  /^\s*(?:They(?:'re| are)?|The visitor(?:'s)?)\s+(?:want|ask|are asking)/i,
  /\bI should (?:answer|include|keep|give)\b/i,
  /\bfrom portfolio knowledge\b/i,
  /\bGeneral Information\)?\b/i,
];

export function stripInternalNarration(reply) {
  if (!reply || typeof reply !== "string") return reply;

  const paragraphs = reply.split(/\n\n+/);
  const cleaned = paragraphs.filter((paragraph) => {
    const text = paragraph.trim();
    if (!text) return false;
    return !NARRATION_PARAGRAPH_PATTERNS.some((pattern) => pattern.test(text));
  });

  const result = cleaned.length ? cleaned.join("\n\n").trim() : reply.trim();
  return result
    .replace(/stephan@radical-thinking\.net/gi, "hello@radical-thinking.net")
    .replace(/\s*—\s*/g, ", ");
}
