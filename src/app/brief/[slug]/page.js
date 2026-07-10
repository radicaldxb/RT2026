import { notFound } from "next/navigation";
import { getPublishedBriefBySlug } from "@/lib/rtbot/briefs";
import BriefView from "./BriefView";

export const metadata = {
  title: "Your RT-BOT Brief | Radical Thinking",
  description: "A summary of your conversation with the Radical Thinking AI agent.",
  robots: { index: false, follow: false },
};

function formatBriefDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BriefPage({ params }) {
  const { slug } = await params;
  let brief;

  try {
    brief = await getPublishedBriefBySlug(slug);
  } catch {
    notFound();
  }

  if (!brief?.situation_summary) {
    notFound();
  }

  const formattedDate = formatBriefDate(brief.generated_at || brief.created_at);

  return <BriefView content={brief.situation_summary} formattedDate={formattedDate} />;
}
