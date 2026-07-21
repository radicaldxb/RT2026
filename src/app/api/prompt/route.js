import { readFile } from "fs/promises";
import path from "path";
import { timingSafeEqual } from "crypto";

const PROMPT_HEADER = "x-prompt-secret";
const PROMPT_FILE = "RT-BOT-FINAL-system-prompt.md";

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req) {
  const secret = process.env.RT_PROMPT_SECRET;
  if (!secret) {
    console.error("Missing RT_PROMPT_SECRET environment variable");
    return Response.json({ error: "Server configuration error" }, { status: 500 });
  }

  const provided = req.headers.get(PROMPT_HEADER);
  if (!provided || !safeEqual(provided, secret)) {
    return unauthorized();
  }

  try {
    const filePath = path.join(process.cwd(), PROMPT_FILE);
    const content = await readFile(filePath, "utf8");
    return Response.json({ content });
  } catch (error) {
    console.error("Failed to read prompt file:", error);
    return Response.json({ error: "Prompt file unavailable" }, { status: 500 });
  }
}
