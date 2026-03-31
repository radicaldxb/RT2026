import Script from "next/script";
import PortfolioProjectLayout, { PortfolioProjectCTA } from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "bella-conversational-ai";
const project = portfolio.find((p) => p.slug === slug);

export const metadata = {
  title: `${project.title} | Radical Thinking Portfolio`,
  description: project.description,
  alternates: {
    canonical: "https://radical-thinking.net/portfolio/bella-conversational-ai",
  },
  openGraph: {
    title: `${project.title} | Radical Thinking Portfolio`,
    description: project.description,
    url: "https://radical-thinking.net/portfolio/bella-conversational-ai",
    images: [
      {
        url: `https://radical-thinking.net${project.image}`,
        width: 1200,
        height: 630,
        alt: `${project.title} Interface`,
      },
    ],
  },
};

export default function BellaConversationalAIPage() {
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
        <PortfolioProjectCTA projectName={project.title} chatRef={slug} />
      </PortfolioProjectLayout>
      <Script id="ld-json-project" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          applicationCategory: "EnterpriseApplication",
          operatingSystem: "Cloud",
          author: {
            "@type": "Organization",
            name: "Radical Thinking",
            url: "https://radical-thinking.net",
          },
          image: project.image,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        })}
      </Script>
    </>
  );
}
