import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import SiteHeader from "@/components/SiteHeader";
import { findNextProject, findProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} ${project.titleAccent ?? ""}`.trim(),
    description: project.summary,
    alternates: { canonical: `/projets/${project.slug}` },
    robots: project.isExample ? { index: false, follow: false } : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <ProjectCaseStudy
          key={project.slug}
          project={project}
          projectNumber={projects.indexOf(project) + 1}
          projectCount={projects.length}
          nextProject={findNextProject(project.slug)}
        />
      </main>
    </>
  );
}
