import { PortfolioFeedClient } from "@/components/portfolio/portfolio-feed-client";
import { PortfolioToolbar } from "@/components/portfolio/portfolio-toolbar";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  getProjectChunk,
  PROJECT_CHUNK_SIZE,
} from "@/lib/portfolio";
import type { ProjectCategory } from "@/types/portfolio";

export function PortfolioFeed({
  category,
}: {
  category?: ProjectCategory;
}) {
  const categoryParam = category ?? "all";
  const initialChunk = getProjectChunk({
    category: categoryParam,
    limit: PROJECT_CHUNK_SIZE,
  });

  return (
    <main className="mx-auto max-w-[1600px] px-4 pb-12 sm:px-6 lg:px-8">
      <PortfolioToolbar activeCategory={category} />

      {initialChunk.projects.length > 0 ? (
        <div className="portfolio-grid grid gap-4">
          {initialChunk.projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              priority={index === 0}
              project={project}
            />
          ))}
          {initialChunk.hasMore ? (
            <PortfolioFeedClient
              category={categoryParam}
              initialHasMore={initialChunk.hasMore}
              initialOffset={initialChunk.projects.length}
            />
          ) : (
            <div
              aria-hidden="true"
              className="col-span-full mt-4 h-px bg-border"
            />
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-base font-semibold">No projects here yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select another category to continue browsing.
          </p>
        </div>
      )}
    </main>
  );
}
