import Link from "next/link";

import { visibleCategories } from "@/content/categories";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/portfolio";

export function CategoryFilter({
  activeCategory,
}: {
  activeCategory?: ProjectCategory;
}) {
  const linkClassName =
    "shrink-0 rounded-full px-3 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <nav
      aria-label="Project categories"
      className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <Link
        aria-current={activeCategory ? undefined : "page"}
        className={cn(
          linkClassName,
          activeCategory
            ? "text-muted-foreground hover:bg-muted hover:text-foreground"
            : "bg-foreground text-background",
        )}
        href="/"
        prefetch={false}
      >
        All
      </Link>
      {visibleCategories.map((category) => {
        const isActive = category.slug === activeCategory;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              linkClassName,
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            href={`/${category.slug}`}
            key={category.slug}
            prefetch={false}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
