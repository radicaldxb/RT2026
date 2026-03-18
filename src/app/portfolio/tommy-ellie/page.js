import Script from "next/script";
import PortfolioProjectLayout, { PortfolioProjectCTA } from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "tommy-ellie";
const project = portfolio.find((p) => p.slug === slug);

export const metadata = {
  title: `What is the Tommy & Ellie Platform? | Radical Thinking`,
  description: project.description,
  alternates: {
    canonical: "https://radical-thinking.net/portfolio/tommy-ellie",
  },
  openGraph: {
    title: "What is the Tommy & Ellie Platform?",
    description: "A pioneering initiative merging generative AI with fine art for bespoke pet portraits.",
    url: "https://radical-thinking.net/portfolio/tommy-ellie",
    images: [{ url: "https://radical-thinking.net/Images/Portfolio/tommy-ellie.webp", width: 1200, height: 630, alt: "Tommy & Ellie Platform Interface" }],
  },
};

export default function TommyElliePage() {
  const title = "What is the Tommy & Ellie Platform?";
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
