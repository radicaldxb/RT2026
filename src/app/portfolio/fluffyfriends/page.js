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
      >
        <a
          href="https://fluffyfriends.online"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold text-lg hover:underline decoration-2 underline-offset-4 transition-all mb-6"
        >
          Visit Live Platform &rarr;
        </a>
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">The Challenge: Eliminating AI Inconsistency</h2>
        <p className="mb-6">
          The market is flooded with competitors generating generic, costumed pet portraits. The problem? AI image generation is inherently unpredictable. Delivering a substandard image with a weirdly merged face or floating paws destroys brand trust and generates immediate refund requests.
        </p>
        <p className="mb-6">
          We needed to build a system that not only personalized the artwork (baking the pet&apos;s actual name into the image) but also guaranteed output quality without requiring human oversight. We needed a digital factory that could QA its own work.
        </p>
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">The Solution: 5-Stage Automation</h2>
        <p className="mb-6">
          FluffyFriends runs entirely on a self-hosted n8n infrastructure. Every stage of the customer lifecycle is handled by interconnected AI agents, communicating via authenticated webhooks. From smart photo validation using Gemini Flash to multi-image prompting and automated quality scoring, the system ensures only high-quality outputs reach the customer.
        </p>
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">The Business Impact</h2>
        <p className="mb-6">
          By treating AI not as a novelty, but as a rigid software component housed within a logical workflow, FluffyFriends achieves massive operational leverage.
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li><strong>Zero-Touch Operations:</strong> The system scales infinitely without adding human headcount.</li>
          <li><strong>High Perceived Value:</strong> Name-personalization baked into the image commands a premium over generic competitors.</li>
          <li><strong>Upsell Architecture:</strong> Single-portrait entry points are engineered to easily convert into bundle packages via Stripe session management.</li>
        </ul>
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 rounded-2xl rounded-br-none text-center space-y-6 my-12 shadow-sm">
          <h3 className="text-xl font-bold text-black">Curious about the technical details?</h3>
          <p className="text-gray-800">
            Why browse static specifications when you can have a conversation?
            Our AI agent has full access to the FluffyFriends case study, technical architecture, and impact metrics.
          </p>
          <div className="pt-2">
            <Link
              href={`/chat?ref=${slug}`}
              className="cta-button inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg no-underline"
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "inherit" }}>Talk to the Agent</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </Link>
          </div>
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
