// src/app/playbook/page.js
import PlaybookClient from "./playbook";

export const metadata = {
  title: "The Playbook | Radical Thinking",
  description:
    "One process. Three steps. No shortcuts. Whether you are building an AI agent, a digital platform, or a brand, Radical Thinking follows the same inside-out process to find the real problem and build something that lasts.",
  alternates: {
    canonical: "https://radical-thinking.net/playbook",
  },
  openGraph: {
    title: "The Playbook | Radical Thinking",
    description:
      "One process. Three steps. No shortcuts. The Radical Thinking playbook starts with an audit, builds what matters, and keeps it current as AI evolves.",
    url: "https://radical-thinking.net/playbook",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Playbook.webp",
        width: 1200,
        height: 630,
        alt: "The Radical Thinking Playbook",
      },
    ],
  },
};

export default function PlaybookPage() {
  return <PlaybookClient />;
}
