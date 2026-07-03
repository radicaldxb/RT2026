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

async function handleUnsubscribe(token) {
  if (!UUID_RE.test(token)) {
    return jsonResponse({ success: false }, 404);
  }

  const conversation = await findConversationByUnsubscribeToken(token);
  if (!conversation) {
    return jsonResponse({ success: false }, 404);
  }

  if (conversation.meta?.no_contact === true) {
    return jsonResponse({ success: false }, 404);
  }

  await recordUnsubscribe({
    token,
    sessionId: conversation.session_id,
    meta: conversation.meta || {},
  });

  return jsonResponse({ success: true });
}

export async function GET(req) {
  try {
    const token = new URL(req.url).searchParams.get("token")?.trim() || "";
    return await handleUnsubscribe(token);
  } catch (err) {
    console.error("Unsubscribe failed:", err);
    return jsonResponse({ success: false }, 500);
  }
}
