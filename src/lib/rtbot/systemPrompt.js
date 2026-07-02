import { readFileSync } from "fs";
import { join } from "path";

let cached = null;

export function getSystemPrompt() {
  if (!cached) {
    cached = readFileSync(join(process.cwd(), "RT-BOT-FINAL-system-prompt.md"), "utf8");
  }
  return cached;
}
