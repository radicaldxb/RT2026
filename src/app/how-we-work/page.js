import HowWeWork from "./how-we-work";

export const metadata = {
  title: "How We Work | Radical Thinking",
  description:
    "How Radical Thinking works. Three engagement types. The Pulse, The Bridge, and The Navigator. From understanding where you are to keeping your direction true.",
  alternates: {
    canonical: "https://radical-thinking.net/how-we-work",
  },
  openGraph: {
    title: "How We Work | Radical Thinking",
    description:
      "Three engagement types. The Pulse, The Bridge, and The Navigator. From understanding where you are to keeping your direction true.",
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
      "Radical Thinking. How we work with clients: from taking your Pulse to building the Bridge to being your Navigator.",
    images: ["https://radical-thinking.net/Images/OG/OG-Playbook.webp"],
  },
};

export default function HowWeWorkPage() {
  return <HowWeWork />;
}
