import { readFileSync } from "fs";
import { join } from "path";

let cached = null;

export function getKnowledge() {
  if (!cached) {
    cached = readFileSync(join(process.cwd(), "rt-knowledge.md"), "utf8");
  }
  return cached;
}
