import Script from "next/script";
import PortfolioProjectLayout, { PortfolioProjectCTA } from "../PortfolioProjectLayout";
import { portfolio } from "../projects";

const slug = "simon-snelder";
const project = portfolio.find((p) => p.slug === slug);

export const metadata = {
  title: `${project.title} | Radical Thinking`,
  description: project.description,
  openGraph: {
    title: project.title,
    description: project.description,
    url: "https://radical-thinking.net/portfolio/simon-snelder",
    images: [{ url: "https://radical-thinking.net/Images/Portfolio/simonsnelder.webp", width: 1200, height: 630, alt: project.title }],
  },
};

export default function SimonSnelderPage() {
  return (
    <>
      <PortfolioProjectLayout title={project.title} description={project.description} image={project.image} imageAlt={project.title} slug={slug} tags={project.tags} chatRef={slug}>
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">AI-Native Methodology</h2>
        <p className="mb-6">
          This project was architected using Radical Thinking&apos;s proprietary AI-Native methodologies.
          By integrating Premium Branding principles with Wealth Management UX, we&apos;ve created a system that
          learns from audience data to optimize personal brand impact in real-time.
        </p>
        <PortfolioProjectCTA projectName={project.title} chatRef={slug} />
      </PortfolioProjectLayout>
      <Script id="ld-json-project" type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": project.title, "description": project.description, "applicationCategory": "EnterpriseApplication", "operatingSystem": "Cloud", "author": { "@type": "Organization", "name": "Radical Thinking", "url": "https://radical-thinking.net" }, "image": project.image, "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } })}
      </Script>
    </>
  );
}
