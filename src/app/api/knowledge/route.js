import { readFile } from "fs/promises";
import path from "path";
import { timingSafeEqual } from "crypto";

const KNOWLEDGE_HEADER = "x-knowledge-secret";
const KNOWLEDGE_FILE = "rt-knowledge.md";

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
  const secret = process.env.RT_KNOWLEDGE_SECRET;
  if (!secret) {
    console.error("Missing RT_KNOWLEDGE_SECRET environment variable");
    return Response.json({ error: "Server configuration error" }, { status: 500 });
  }

  const provided = req.headers.get(KNOWLEDGE_HEADER);
  if (!provided || !safeEqual(provided, secret)) {
    return unauthorized();
  }

  try {
    const filePath = path.join(process.cwd(), KNOWLEDGE_FILE);
    const content = await readFile(filePath, "utf8");
    return Response.json({ content });
  } catch (error) {
    console.error("Failed to read knowledge file:", error);
    return Response.json({ error: "Knowledge file unavailable" }, { status: 500 });
  }
}
