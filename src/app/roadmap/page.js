import RoadmapClient from "./roadmap";

export const metadata = {
  title: "Free AI Roadmap | Radical Thinking",
  description:
    "Every week without a plan, your competitors are building one. Get a free personalised AI roadmap in five minutes through a conversation with the Radical Thinking agent.",
  alternates: {
    canonical: "https://radical-thinking.net/roadmap",
  },
  openGraph: {
    title: "Free AI Roadmap | Radical Thinking",
    description:
      "Get a free personalised AI roadmap in five minutes. Know where AI creates value in your business before your competitors do.",
    url: "https://radical-thinking.net/roadmap",
    siteName: "Radical Thinking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Roadmap | Radical Thinking",
    description:
      "Get a free personalised AI roadmap in five minutes. Know where AI creates value in your business before your competitors do.",
  },
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
