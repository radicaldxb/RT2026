// src/app/api/chatbot/route.js
const rateLimit = new Map();

<<<<<<< HEAD
// Helper to clean up old rate limit entries to prevent memory leaks
function cleanupRateLimit() {
  const now = Date.now();
  const windowMs = 60 * 1000;
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.lastReset > windowMs) {
      rateLimit.delete(ip);
    }
  }
}

=======
>>>>>>> f1fbcc07c8f81005187e4c1510e5fceaf9ec6950
export async function POST(req) {
  try {
    // Rate Limiting
    let ip = req.headers.get("x-forwarded-for")?.split(',')[0]?.trim();
    if (!ip) ip = req.headers.get("x-real-ip")?.trim();
    if (!ip) ip = "unknown";
    const limit = 40; // requests
    const windowMs = 60 * 1000; // 1 minute

<<<<<<< HEAD
    // Periodic cleanup if map grows too large
    if (rateLimit.size > 5000) {
      cleanupRateLimit();
    }

=======
>>>>>>> f1fbcc07c8f81005187e4c1510e5fceaf9ec6950
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

<<<<<<< HEAD
    if (process.env.NODE_ENV === 'development') {
      console.log("Received chatInput:", chatInput);
      console.log("Received sessionId:", sessionId);
    }

    // --- call n8n webhook ---
    // Prefer server-side env var (N8N_WEBHOOK_URL) for security, fallback to public if not set
    const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("❌ Missing N8N_WEBHOOK_URL environment variable");
      return new Response(
        JSON.stringify({ error: "Server configuration error: Missing Webhook URL" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const n8nRes = await fetch(webhookUrl, {
=======
    console.log("Received chatInput:", chatInput);
    console.log("Received sessionId:", sessionId);

    // --- call n8n webhook ---
    const n8nRes = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
>>>>>>> f1fbcc07c8f81005187e4c1510e5fceaf9ec6950
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput, sessionId, metadata }),
    });

    const rawText = await n8nRes.text();
<<<<<<< HEAD
    if (process.env.NODE_ENV === 'development') {
      console.log("📨 n8n raw response:", rawText);
    }
=======
    console.log("📨 n8n raw response:", rawText);
>>>>>>> f1fbcc07c8f81005187e4c1510e5fceaf9ec6950

    let data;
    try {
      const parsed = JSON.parse(rawText);
      // Handle n8n returning an array (common behavior) or object
      const item = Array.isArray(parsed) ? (parsed[0] || {}) : (parsed || {});

      // Normalize to a single 'reply' field by checking common keys
<<<<<<< HEAD
      let reply = item.output || item.reply || item.text || item.message || item.content;

      // Ensure reply is a string to prevent client rendering errors
      if (typeof reply === 'object' && reply !== null) {
        reply = JSON.stringify(reply);
      } else if (reply === undefined || reply === null) {
        reply = typeof item === 'string' ? item : JSON.stringify(item);
      }
      data = { reply: String(reply) };
=======
      const reply = item.output || item.reply || item.text || item.message || item.content || (typeof item === 'string' ? item : JSON.stringify(item));
      data = { reply };
>>>>>>> f1fbcc07c8f81005187e4c1510e5fceaf9ec6950
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
<<<<<<< HEAD
        error: (error && error.message) || "Internal Server Error",
=======
        error: error.message || "Internal Server Error",
>>>>>>> f1fbcc07c8f81005187e4c1510e5fceaf9ec6950
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
