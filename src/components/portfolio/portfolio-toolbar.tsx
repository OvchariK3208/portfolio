import { CategoryFilter } from "@/components/portfolio/category-filter";
import { GridDensityToggle } from "@/components/portfolio/grid-density-toggle";
import type { ProjectCategory } from "@/types/portfolio";

export function PortfolioToolbar({
  activeCategory,
}: {
  activeCategory?: ProjectCategory;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-border bg-background/95 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <CategoryFilter activeCategory={activeCategory} />
        <div aria-hidden="true" className="h-6 w-px shrink-0 bg-border" />
        <GridDensityToggle />
      </div>
    </div>
  );
}
