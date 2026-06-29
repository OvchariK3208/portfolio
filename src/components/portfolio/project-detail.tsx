import {
  ArrowLeft,
  Code2,
  ExternalLink,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getCategoryLabel } from "@/content/categories";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types/portfolio";

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-3",
        )}
        href={`/${project.primaryCategory}`}
        prefetch={false}
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Back to {getCategoryLabel(project.primaryCategory)}
      </Link>

      <article className="mt-6">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <Link
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={`/${category}`}
                key={category}
                prefetch={false}
              >
                <Badge>{getCategoryLabel(category)}</Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            {project.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.demoUrl ? (
              <a
                className={buttonVariants()}
                href={project.demoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Live Demo
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            ) : null}
            {project.showRepo && project.repoUrl ? (
              <a
                className={buttonVariants({ variant: "outline" })}
                href={project.repoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Source Code
                <Code2 aria-hidden="true" className="size-4" />
              </a>
            ) : null}
            {project.upworkUrl ? (
              <a
                className={buttonVariants({ variant: "outline" })}
                href={project.upworkUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Upwork Portfolio
                <SquareArrowOutUpRight
                  aria-hidden="true"
                  className="size-4"
                />
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-muted">
          {project.preview.type === "screenshot" ? (
            <Image
              alt={project.preview.alt}
              className="object-cover"
              fetchPriority="high"
              fill
              loading="eager"
              sizes="(min-width: 1152px) 1152px, 100vw"
              src={project.preview.src}
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              {project.preview.label}
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.75fr)]">
          <section>
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              {project.fullDescription ?? project.shortDescription}
            </p>

            {project.whatWasBuilt?.length ? (
              <>
                <h2 className="mt-8 text-lg font-semibold">What was built</h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
                  {project.whatWasBuilt.map((item) => (
                    <li
                      className="rounded-lg border border-border bg-card px-4 py-3"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          <aside>
            <h2 className="text-lg font-semibold">Technology</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
            </div>

            <h2 className="mt-8 text-lg font-semibold">Domain</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.domainTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            {!project.showRepo ? (
              <p className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-xs leading-5 text-muted-foreground">
                Source code is not publicly available due to NDA.
              </p>
            ) : null}
          </aside>
        </div>
      </article>
    </main>
  );
}
