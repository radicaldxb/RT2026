import Link from "next/link";
import Script from "next/script";
import PortfolioProjectLayout from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "fluffyfriends";
const project = portfolio.find((p) => p.slug === slug) || {
  title: "What is the FluffyFriends Platform?",
  description:
    "FluffyFriends is an autonomous AI pet portrait studio that generates 8K personalized artwork in under 5 minutes using n8n and Google Gemini, requiring zero human intervention.",
  image: "/Images/Portfolio/fluffyfriends.webp",
  tags: ["AI", "Automation"],
};

export const metadata = {
  title: "What is the FluffyFriends Platform? | Radical Thinking",
  description:
    "FluffyFriends is an autonomous AI pet portrait studio that generates 8K personalized artwork in under 5 minutes using n8n and Google Gemini.",
  alternates: {
    canonical: "/portfolio/fluffyfriends",
  },
  openGraph: {
    title: "What is the FluffyFriends Platform?",
    description:
      "An autonomous AI pet portrait studio that generates 8K personalized artwork.",
    url: "https://radical-thinking.net/portfolio/fluffyfriends",
    images: [
      {
        url: "/Images/Portfolio/fluffyfriends.webp",
        width: 1200,
        height: 630,
        alt: "FluffyFriends Platform Interface",
      },
    ],
  },
};

export default function FluffyFriendsPage() {
  return (
    <>
      <PortfolioProjectLayout
        title={project.title}
        description={project.description}
        image={project.image}
        imageAlt={`${project.title} Interface`}
        slug={slug}
        tags={project.tags}
        chatRef={slug}
        project={project}
      >
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 rounded-2xl rounded-br-none text-center space-y-6 my-12 shadow-sm">
          <h3 className="text-xl font-bold text-black">Curious about the technical details?</h3>
          <p className="text-gray-800">
            Why browse static specifications when you can have a conversation?
            Our AI agent has full access to the FluffyFriends case study, technical architecture, and impact metrics.
          </p>
          <Link
            href={`/chat?ref=${slug}`}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Talk to the Agent
          </Link>
        </div>
      </PortfolioProjectLayout>
      <Script id="ld-json-project" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": project.title,
          "description": project.description,
          "applicationCategory": "EnterpriseApplication",
          "operatingSystem": "Cloud",
          "author": {
            "@type": "Organization",
            "name": "Radical Thinking",
            "url": "https://radical-thinking.net"
          },
          "image": project.image,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}
      </Script>
    </>
  );
}
