import { readFileSync, statSync } from "fs";
import { join } from "path";

let cached = null;
let cachedMtimeMs = null;

export function getSystemPrompt() {
  const path = join(process.cwd(), "RT-BOT-FINAL-system-prompt.md");
  try {
    const { mtimeMs } = statSync(path);
    if (!cached || cachedMtimeMs !== mtimeMs) {
      cached = readFileSync(path, "utf8");
      cachedMtimeMs = mtimeMs;
    }
  } catch {
    if (!cached) {
      cached = readFileSync(path, "utf8");
    }
  }
  return cached;
}
