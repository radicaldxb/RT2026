import Work from "./work";
import Script from "next/script";
import { portfolio } from "@/app/work/projects";

export const metadata = {
  title: "Our Work | Radical Thinking",
  description: "Explore our AI-native case studies. From autonomous agents to immersive digital ecosystems, see how we apply radical thinking to real-world challenges.",
  alternates: {
    canonical: "https://radical-thinking.net/work",
  },
  openGraph: {
    title: "Radical Thinking — Work",
    description: "Case studies in AI strategy, development, and design.",
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
};

export default function WorkPage() {
  return (
    <>
      <Work />
      <Script id="ld-json-work" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Radical Thinking Work",
          "description": "A collection of our AI-native projects and digital ecosystems.",
          "url": "https://radical-thinking.net/work",
          "publisher": {
            "@type": "Organization",
            "name": "Radical Thinking",
            "url": "https://radical-thinking.net"
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": portfolio.map((item, index) => ({
              "@type": "CreativeWork",
              "position": index + 1,
              "name": item.title,
              "description": item.category
            }))
          }
        })}
      </Script>
    </>
  );
}
