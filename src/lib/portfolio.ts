import { projects } from "@/content/projects";
import type {
  PortfolioProject,
  ProjectCardData,
  ProjectCategory,
  ProjectChunk,
} from "@/types/portfolio";

export const PROJECT_CHUNK_SIZE = 10;

export function getPublishedProjects(): PortfolioProject[] {
  return projects
    .filter((project) => project.status === "published")
    .toSorted((a, b) => b.priority - a.priority);
}

export function getProjectsByCategory(
  category?: ProjectCategory | "all",
): PortfolioProject[] {
  const published = getPublishedProjects();

  if (!category || category === "all") {
    return published;
  }

  return published.filter((project) =>
    project.categories.includes(category),
  );
}

export function paginateProjects(
  filteredProjects: PortfolioProject[],
  offset = 0,
  limit = PROJECT_CHUNK_SIZE,
): ProjectChunk {
  const chunk = filteredProjects
    .slice(offset, offset + limit)
    .map(toProjectCardData);
  const consumed = offset + chunk.length;
  const hasMore = consumed < filteredProjects.length;

  return {
    projects: chunk,
    nextOffset: hasMore ? consumed : null,
    hasMore,
  };
}

export function toProjectCardData(
  project: PortfolioProject,
): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    priority: project.priority,
    primaryCategory: project.primaryCategory,
    categories: project.categories,
    stack: project.stack,
    domainTags: project.domainTags,
    demoUrl: project.demoUrl,
    repoUrl: project.repoUrl,
    upworkUrl: project.upworkUrl,
    showRepo: project.showRepo,
    preview: project.preview,
  };
}

export function getProjectChunk({
  category,
  offset = 0,
  limit = PROJECT_CHUNK_SIZE,
}: {
  category?: ProjectCategory | "all";
  offset?: number;
  limit?: number;
}): ProjectChunk {
  return paginateProjects(getProjectsByCategory(category), offset, limit);
}

export function getProjectBySlug(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getProjectUrl(
  project: Pick<PortfolioProject, "primaryCategory" | "slug">,
) {
  return `/${project.primaryCategory}/${project.slug}`;
}
