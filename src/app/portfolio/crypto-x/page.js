import Script from "next/script";
import PortfolioProjectLayout, { PortfolioProjectCTA } from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "crypto-x";
const project = portfolio.find((p) => p.slug === slug);

export const metadata = {
  title: `What is the ${project.title} Platform? | Radical Thinking`,
  description: project.description,
  alternates: {
    canonical: "https://radical-thinking.net/portfolio/crypto-x",
  },
  openGraph: {
    title: `What is the ${project.title} Platform?`,
    description: project.description,
    url: "https://radical-thinking.net/portfolio/crypto-x",
    images: [{ url: "https://radical-thinking.net/Images/Portfolio/crypto-x.webp", width: 1200, height: 630, alt: `${project.title} Interface` }],
  },
};

export default function CryptoXPage() {
  const title = `What is the ${project.title} Platform?`;
  return (
    <>
      <PortfolioProjectLayout title={title} description={project.description} image={project.image} imageAlt={`${project.title} Interface`} slug={slug} tags={project.tags} chatRef={slug} project={project}>
        <PortfolioProjectCTA projectName={project.title} chatRef={slug} />
      </PortfolioProjectLayout>
      <Script id="ld-json-project" type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": project.title, "description": project.description, "applicationCategory": "EnterpriseApplication", "operatingSystem": "Cloud", "author": { "@type": "Organization", "name": "Radical Thinking", "url": "https://radical-thinking.net" }, "image": project.image, "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } })}
      </Script>
    </>
  );
}
