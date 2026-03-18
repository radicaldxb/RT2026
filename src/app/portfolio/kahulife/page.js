import Script from "next/script";
import PortfolioProjectLayout, { PortfolioProjectCTA } from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "kahulife";
const project = portfolio.find((p) => p.slug === slug);

export const metadata = {
  title: `What is the ${project.title} Platform? | Radical Thinking`,
  description: project.description,
  alternates: {
    canonical: "https://radical-thinking.net/portfolio/kahulife",
  },
  openGraph: {
    title: `What is the ${project.title} Platform?`,
    description: "A comprehensive digital ecosystem for pet management and AI-driven SOS network.",
    url: "https://radical-thinking.net/portfolio/kahulife",
    images: [{ url: "https://radical-thinking.net/Images/Portfolio/kahulife.webp", width: 1200, height: 630, alt: `${project.title} Platform Interface` }],
  },
};

export default function KahulifePage() {
  const title = `What is the ${project.title} Platform?`;
  return (
    <>
      <PortfolioProjectLayout
        title={title}
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
          "name": project.title,
          "description": project.description,
          "applicationCategory": "EnterpriseApplication",
          "operatingSystem": "Cloud",
          "author": { "@type": "Organization", "name": "Radical Thinking", "url": "https://radical-thinking.net" },
          "image": project.image,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}
      </Script>
    </>
  );
}
