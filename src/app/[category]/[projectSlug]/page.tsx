import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { ProjectDetail } from "@/components/portfolio/project-detail";
import { isProjectCategory } from "@/content/categories";
import { getProjectBySlug, getProjectUrl } from "@/lib/portfolio";
import { projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ category: string; projectSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.status === "published")
    .map((project) => ({
      category: project.primaryCategory,
      projectSlug: project.slug,
    }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);

  return {
    title: project?.title ?? "Page not found",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { category, projectSlug } = await params;

  if (!isProjectCategory(category)) {
    notFound();
  }

  const project = getProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  if (category !== project.primaryCategory) {
    permanentRedirect(getProjectUrl(project));
  }

  return <ProjectDetail project={project} />;
}
