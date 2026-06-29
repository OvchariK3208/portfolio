import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";

import { ProjectPreview } from "@/components/portfolio/project-preview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getProjectUrl } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import type { ProjectCardData } from "@/types/portfolio";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: ProjectCardData;
  priority?: boolean;
}) {
  const projectUrl = getProjectUrl(project);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-sm">
      <Link
        aria-label={`View ${project.title}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        href={projectUrl}
        prefetch={false}
      >
        <ProjectPreview preview={project.preview} priority={priority} />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((technology) => (
            <Badge key={technology}>{technology}</Badge>
          ))}
          {project.stack.length > 4 ? (
            <Badge aria-label={`${project.stack.length - 4} more technologies`}>
              +{project.stack.length - 4}
            </Badge>
          ) : null}
        </div>

        <h2 className="text-base font-semibold leading-snug tracking-tight">
          <Link
            className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={projectUrl}
            prefetch={false}
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.domainTags.slice(0, 3).map((tag) => (
            <span
              className="text-[11px] font-medium text-muted-foreground"
              key={tag}
            >
              #{tag.replaceAll(" ", "")}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <Link
            className={cn(buttonVariants({ size: "sm" }), "grow")}
            href={projectUrl}
            prefetch={false}
          >
            View Project
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
          {project.demoUrl ? (
            <a
              aria-label={`Open ${project.title} live demo`}
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
              href={project.demoUrl}
              rel="noopener noreferrer"
              target="_blank"
              title="Live Demo"
            >
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          ) : null}
          {project.showRepo && project.repoUrl ? (
            <a
              aria-label={`Open ${project.title} source code`}
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
              href={project.repoUrl}
              rel="noopener noreferrer"
              target="_blank"
              title="Source Code"
            >
              <Code2 aria-hidden="true" className="size-3.5" />
            </a>
          ) : null}
          {project.upworkUrl ? (
            <a
              aria-label={`Open ${project.title} Upwork portfolio entry`}
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
              href={project.upworkUrl}
              rel="noopener noreferrer"
              target="_blank"
              title="Upwork Portfolio"
            >
              <SquareArrowOutUpRight
                aria-hidden="true"
                className="size-3.5"
              />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
