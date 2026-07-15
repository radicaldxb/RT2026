import HowWeWork from "./how-we-work";

export const metadata = {
  title: "How We Work | Radical Thinking",
  description:
    "How Radical Thinking works. Three engagement types. One inside-out process. From audit to build to ongoing partnership.",
  alternates: {
    canonical: "https://radical-thinking.net/how-we-work",
  },
  openGraph: {
    title: "How We Work | Radical Thinking",
    description:
      "Three engagement types. One inside-out process. From audit to build to ongoing partnership.",
    url: "https://radical-thinking.net/how-we-work",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Playbook.webp",
        width: 1200,
        height: 630,
        alt: "How Radical Thinking Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work | Radical Thinking",
    description:
      "Radical Thinking. How we work with clients: from audit to build to ongoing partnership.",
    images: ["https://radical-thinking.net/Images/OG/OG-Playbook.webp"],
  },
};

export default function HowWeWorkPage() {
  return <HowWeWork />;
}
