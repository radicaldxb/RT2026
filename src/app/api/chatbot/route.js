// src/app/api/chatbot/route.js
const rateLimit = new Map();

export async function POST(req) {
  try {
    // Rate Limiting
    let ip = req.headers.get("x-forwarded-for")?.split(',')[0]?.trim();
    if (!ip) ip = req.headers.get("x-real-ip")?.trim();
    if (!ip) ip = "unknown";
    const limit = 40; // requests
    const windowMs = 60 * 1000; // 1 minute

    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimit.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      console.warn(`[API] Rate limit hit for IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    ipData.count += 1;

    const body = await req.json();
    const chatInput = body.chatInput;
    const sessionId = body.sessionId || "test-123"; // default session
    const metadata = body.metadata || {};

    //  Validate chatInput
    if (!chatInput || typeof chatInput !== "string") {
      console.error("Invalid chatInput in request body:", body);
      return new Response(
        JSON.stringify({ error: "chatInput must be a non-empty string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (chatInput.length > 500) {
      return new Response(
        JSON.stringify({ reply: "Message is too long. Please limit it to 500 characters." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Received chatInput:", chatInput);
    console.log("Received sessionId:", sessionId);

    // --- call n8n webhook ---
    const n8nRes = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput, sessionId, metadata }),
    });

    const rawText = await n8nRes.text();
    console.log("📨 n8n raw response:", rawText);

    let data;
    try {
      const parsed = JSON.parse(rawText);
      // Handle n8n returning an array (common behavior) or object
      const item = Array.isArray(parsed) ? (parsed[0] || {}) : (parsed || {});

      // Normalize to a single 'reply' field by checking common keys
      const reply = item.output || item.reply || item.text || item.message || item.content || (typeof item === 'string' ? item : JSON.stringify(item));
      data = { reply };
    } catch {
      console.warn("n8n did not return valid JSON, sending raw text back");
      data = { reply: rawText || " No response from n8n" };
    }

    return new Response(JSON.stringify(data), {
      status: n8nRes.ok ? 200 : 502, // 502 for bad gateway if n8n fails
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API route crashed:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
