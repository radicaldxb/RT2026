import Portfolio from "./portfolio";
import Script from "next/script";
import { portfolio } from "@/app/portfolio/projects";

export const metadata = {
  title: "Our Work | Radical Thinking Portfolio",
  description: "Explore our AI-native case studies. From autonomous agents to immersive digital ecosystems, see how we apply radical thinking to real-world challenges.",
  alternates: {
    canonical: "https://radical-thinking.net/portfolio",
  },
  openGraph: {
    title: "Radical Thinking Portfolio",
    description: "Case studies in AI strategy, development, and design.",
    url: "https://radical-thinking.net/portfolio",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/RT-Portfolio.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Work",
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Portfolio />

      {/* AEO: CollectionPage Structured Data */}
      <Script id="ld-json-portfolio" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Radical Thinking Portfolio",
          "description": "A collection of our AI-native projects and digital ecosystems.",
          "url": "https://radical-thinking.net/portfolio",
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
    </main>
  );
}