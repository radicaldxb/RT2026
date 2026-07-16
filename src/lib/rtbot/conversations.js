import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

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
    captured_company: null,
    captured_url: null,
    captured_location: null,
    problem_summary: null,
    situation_read: null,
    role_interest: null,
    gdpr_required: false,
    visitor_country: null,
    gdpr_opt_in: null,
    wrap_up_pending: false,
    wrap_up_confirmed: false,
    no_contact: false,
    flow: null,
    quick_contact_answers: 0,
    calendar_offered: false,
  };
}

export async function loadConversation(sessionId) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("conversations")
    .select("messages, qualification_score, category, meta, unsubscribe_token, email_opt_in")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return {
      messages: [],
      qualification_score: 0,
      category: "unknown",
      meta: defaultMeta(),
      unsubscribe_token: randomUUID(),
      email_opt_in: false,
    };
  }

  return {
    messages: Array.isArray(data.messages) ? data.messages : [],
    qualification_score: data.qualification_score ?? 0,
    category: data.category ?? "unknown",
    meta: { ...defaultMeta(), ...(data.meta || {}) },
    unsubscribe_token: data.unsubscribe_token || randomUUID(),
    email_opt_in: data.email_opt_in ?? false,
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
      unsubscribe_token: payload.unsubscribe_token,
      email_opt_in: payload.email_opt_in ?? false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "session_id" }
  );

  if (error) throw error;
}

export async function findConversationByUnsubscribeToken(token) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("conversations")
    .select("session_id, meta, unsubscribe_token")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function recordUnsubscribe({ token, sessionId, meta }) {
  const supabase = getSupabase();
  const updatedMeta = { ...meta, no_contact: true };

  const { error: updateError } = await supabase
    .from("conversations")
    .update({
      meta: updatedMeta,
      email_opt_in: false,
      updated_at: new Date().toISOString(),
    })
    .eq("unsubscribe_token", token);

  if (updateError) throw updateError;

  const { error: insertError } = await supabase.from("unsubscribes").insert({
    unsubscribe_token: token,
    session_id: sessionId,
  });

  if (insertError) throw insertError;
}
