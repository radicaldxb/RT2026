// src/app/api/chatbot/route.js
export async function POST(req) {
  try {
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

    console.log("Received chatInput:", chatInput);

    // --- call n8n webhook ---
   const n8nRes = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput, sessionId, metadata }),
    });

    const rawText = await n8nRes.text();
    console.log("📨 n8n raw response:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
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
