import { createClient } from "@supabase/supabase-js";

let client = null;

export function getSupabase() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase configuration");
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

function defaultMeta() {
  return {
    qualified_fired: false,
    warm_fired: false,
    vendor_fired: false,
    job_seeker_fired: false,
    captured_email: null,
    captured_name: null,
  };
}

export async function loadConversation(sessionId) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("conversations")
    .select("messages, qualification_score, category, meta")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return {
      messages: [],
      qualification_score: 0,
      category: "unknown",
      meta: defaultMeta(),
    };
  }

  return {
    messages: Array.isArray(data.messages) ? data.messages : [],
    qualification_score: data.qualification_score ?? 0,
    category: data.category ?? "unknown",
    meta: { ...defaultMeta(), ...(data.meta || {}) },
  };
}

export async function saveConversation(sessionId, payload) {
  const supabase = getSupabase();
  const { error } = await supabase.from("conversations").upsert(
    {
      session_id: sessionId,
      messages: payload.messages,
      qualification_score: payload.qualification_score,
      category: payload.category,
      meta: payload.meta,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "session_id" }
  );

  if (error) throw error;
}
