import { articles } from "@/app/insights/articles";
import InsightsList from "./InsightsList";

export const metadata = {
  title: "Radical Insights | AI, Technology & Strategy",
  description:
    "Articles and insights on AI, technology, and strategy from the Radical Thinking team.",
  alternates: {
    canonical: "https://radical-thinking.net/insights",
  },
  openGraph: {
    title: "Radical Insights | Radical Thinking",
    description: "Articles and insights on AI, technology, and strategy.",
    url: "https://radical-thinking.net/insights",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/RT-Landing.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Insights",
      },
    ],
  },
};

export default function InsightsIndexPage() {
  const list = Array.isArray(articles) ? articles : [];
  return <InsightsList articles={list} />;
}
