import Script from "next/script";
import PortfolioProjectLayout, { PortfolioProjectCTA } from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "1001-inventions-games";
const project = portfolio.find((p) => p.slug === slug);

export const metadata = {
  title: `What is the ${project.title} Platform? | Radical Thinking`,
  description: project.description,
  openGraph: {
    title: `What is the ${project.title} Platform?`,
    description: "Gamified educational experiences for physical installations and iPad interaction.",
    url: "https://radical-thinking.net/portfolio/1001-inventions-games",
    images: [{ url: "https://radical-thinking.net/Images/Portfolio/1001-games.webp", width: 1200, height: 630, alt: `${project.title} Interface` }],
  },
};

export default function InventionsGamesPage() {
  const title = `What is the ${project.title} Platform?`;
  return (
    <>
      <PortfolioProjectLayout title={title} description={project.description} image={project.image} imageAlt={`${project.title} Interface`} slug={slug} tags={project.tags} chatRef={slug}>
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">AI-Native Methodology</h2>
        <p className="mb-6">
          This platform was architected using Radical Thinking&apos;s proprietary AI-Native methodologies.
          By integrating Interactive Gamification principles with EdTech Installations, we&apos;ve created a system that
          learns from player interaction to optimize educational outcomes in real-time.
        </p>
        <PortfolioProjectCTA projectName={project.title} chatRef={slug} />
      </PortfolioProjectLayout>
      <Script id="ld-json-project" type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": project.title, "description": project.description, "applicationCategory": "EnterpriseApplication", "operatingSystem": "Cloud", "author": { "@type": "Organization", "name": "Radical Thinking", "url": "https://radical-thinking.net" }, "image": project.image, "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } })}
      </Script>
    </>
  );
}
