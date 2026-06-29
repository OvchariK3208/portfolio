"use client";

import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/portfolio/project-card";
import { Button } from "@/components/ui/button";
import type {
  ProjectCardData,
  ProjectCategory,
  ProjectChunk,
} from "@/types/portfolio";

export function PortfolioFeedClient({
  category = "all",
  initialOffset,
  initialHasMore,
}: {
  category?: ProjectCategory | "all";
  initialOffset: number;
  initialHasMore: boolean;
}) {
  const [appendedProjects, setAppendedProjects] = useState<ProjectCardData[]>(
    [],
  );
  const [nextOffset, setNextOffset] = useState<number | null>(
    initialHasMore ? initialOffset : null,
  );
  const [prefetchedChunk, setPrefetchedChunk] =
    useState<ProjectChunk | null>(null);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [isAppending, setIsAppending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pendingRequestRef = useRef<Promise<ProjectChunk> | null>(null);

  const requestNextChunk = useCallback(() => {
    if (nextOffset === null) {
      return Promise.resolve<ProjectChunk>({
        projects: [],
        nextOffset: null,
        hasMore: false,
      });
    }

    if (!pendingRequestRef.current) {
      const searchParams = new URLSearchParams({
        category,
        offset: String(nextOffset),
        limit: "10",
      });

      pendingRequestRef.current = fetch(`/api/projects?${searchParams}`, {
        headers: { Accept: "application/json" },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Unable to load more projects.");
          }

          return (await response.json()) as ProjectChunk;
        })
        .finally(() => {
          pendingRequestRef.current = null;
        });
    }

    return pendingRequestRef.current;
  }, [category, nextOffset]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || nextOffset === null || prefetchedChunk) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        setIsPrefetching(true);
        setError(null);
        void requestNextChunk()
          .then(setPrefetchedChunk)
          .catch(() => setError("Unable to prepare more projects."))
          .finally(() => setIsPrefetching(false));
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [nextOffset, prefetchedChunk, requestNextChunk]);

  function appendChunk(chunk: ProjectChunk) {
    setAppendedProjects((current) => [...current, ...chunk.projects]);
    setNextOffset(chunk.nextOffset);
    setPrefetchedChunk(null);
  }

  async function handleLoadMore() {
    if (prefetchedChunk) {
      appendChunk(prefetchedChunk);
      return;
    }

    setIsAppending(true);
    setError(null);

    try {
      appendChunk(await requestNextChunk());
    } catch {
      setError("Unable to load more projects. Please try again.");
    } finally {
      setIsAppending(false);
    }
  }

  const hasMore = nextOffset !== null;

  return (
    <>
      <div className="contents">
        {appendedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="col-span-full flex min-h-24 flex-col items-center justify-center gap-3 pt-4">
        <div aria-hidden="true" className="h-px w-full bg-border" />
        <div ref={sentinelRef} />
        {hasMore ? (
          <Button
            aria-describedby={error ? "load-more-error" : undefined}
            disabled={isAppending}
            onClick={handleLoadMore}
            variant="outline"
          >
            {isAppending ? (
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin"
              />
            ) : null}
            {isAppending
              ? "Loading projects"
              : isPrefetching
                ? "Preparing projects"
                : "Load more"}
          </Button>
        ) : appendedProjects.length > 0 ? (
          <p className="text-xs text-muted-foreground">No more projects</p>
        ) : null}
        {error ? (
          <p
            className="text-center text-xs text-destructive"
            id="load-more-error"
            role="status"
          >
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
