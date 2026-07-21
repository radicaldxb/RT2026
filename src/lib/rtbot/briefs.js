import { getSupabase } from "@/lib/rtbot/conversations";

const BRIEF_SLUG_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidBriefSlug(slug) {
  return typeof slug === "string" && BRIEF_SLUG_RE.test(slug);
}

export async function getPublishedBriefBySlug(slug) {
  if (!isValidBriefSlug(slug)) return null;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("briefs")
    .select("situation_summary, generated_at, created_at")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  return data;
}
