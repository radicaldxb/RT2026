import Work from "./work";
import Script from "next/script";
import { portfolio } from "@/app/work/projects";

export const metadata = {
  title: "Work | Radical Thinking",
  description:
    "Radical Thinking case studies. Client engagements in strategy, experience, and implementation, plus our own experiments in what technology and AI can do next.",
  alternates: {
    canonical: "https://radical-thinking.net/work",
  },
  openGraph: {
    title: "Work | Radical Thinking",
    description:
      "Client engagements and self-initiated experiments across strategy, experience, and implementation.",
    url: "https://radical-thinking.net/work",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Work.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Radical Thinking",
    description:
      "Radical Thinking case studies. Client work and experiments across strategy, experience, and implementation.",
    images: ["https://radical-thinking.net/Images/OG/OG-Work.webp"],
  },
};

export default function WorkPage() {
  return (
    <>
      <Work />
      <Script id="ld-json-work" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Radical Thinking Work",
          description:
            "Radical Thinking case studies. Client engagements in strategy, experience, and implementation, plus our own experiments in what technology and AI can do next.",
          url: "https://radical-thinking.net/work",
          publisher: {
            "@type": "Organization",
            name: "Radical Thinking",
            url: "https://radical-thinking.net",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: portfolio.map((item, index) => ({
              "@type": "CreativeWork",
              position: index + 1,
              name: item.title,
              description: item.category,
            })),
          },
        })}
      </Script>
    </>
  );
}
