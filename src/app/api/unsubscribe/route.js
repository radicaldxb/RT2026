import {
  findConversationByUnsubscribeToken,
  recordUnsubscribe,
} from "@/lib/rtbot/conversations";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const token = typeof body?.token === "string" ? body.token.trim() : "";
    if (!UUID_RE.test(token)) {
      return jsonResponse({ ok: false, reason: "invalid" }, 404);
    }

    const conversation = await findConversationByUnsubscribeToken(token);
    if (!conversation) {
      return jsonResponse({ ok: false, reason: "invalid" }, 404);
    }

    if (conversation.meta?.no_contact === true) {
      return jsonResponse({ ok: false, reason: "already_used" }, 404);
    }

    await recordUnsubscribe({
      token,
      sessionId: conversation.session_id,
      meta: conversation.meta || {},
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error("Unsubscribe failed:", err);
    return jsonResponse({ error: "Server error" }, 500);
  }
}
