import { notFound } from "next/navigation";
import Script from "next/script";
import PortfolioProjectLayout from "../PortfolioProjectLayout";
import {
  buildWorkProjectJsonLd,
  buildWorkProjectMetadata,
  getWorkProject,
  getWorkProjectFacts,
  getWorkProjectOverview,
} from "../projectUtils";
import { portfolio } from "../projects";

export function generateStaticParams() {
  return portfolio.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return { title: "Project Not Found" };
  return buildWorkProjectMetadata(project);
}

export default async function WorkProjectPage({ params }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();

  const enrichedProject = {
    ...project,
    overview: getWorkProjectOverview(project),
    facts: getWorkProjectFacts(project),
  };

  return (
    <>
      <PortfolioProjectLayout
        title={project.title}
        description={project.description}
        image={project.image}
        imageAlt={`${project.title} interface`}
        slug={slug}
        tags={project.tags}
        category={project.category}
        chatRef={slug}
        project={enrichedProject}
      />
      <Script id={`ld-json-work-${slug}`} type="application/ld+json">
        {JSON.stringify(buildWorkProjectJsonLd(project))}
      </Script>
    </>
  );
}
