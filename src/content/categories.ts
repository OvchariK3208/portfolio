import type { ProjectCategory } from "@/types/portfolio";

export type CategoryDefinition = {
  slug: ProjectCategory;
  label: string;
  visible: boolean;
};

export const categories: readonly CategoryDefinition[] = [
  { slug: "animation", label: "Animation", visible: true },
  { slug: "landing-page", label: "Landing Page", visible: true },
  { slug: "saas", label: "SaaS", visible: true },
  { slug: "dashboard", label: "Dashboard", visible: true },

  // Inactive categories kept for later restoration:
  // { slug: "admin-panel", label: "Admin Panel", visible: true },
  // { slug: "commercial", label: "Commercial Website", visible: true },
  // { slug: "lead-generation", label: "Lead Generation", visible: true },
  // { slug: "real-estate", label: "Real Estate", visible: true },
  // { slug: "marketing", label: "Marketing", visible: true },
  // { slug: "branding", label: "Branding", visible: true },
  // { slug: "crud-app", label: "CRUD App", visible: false },
] as const;

export const visibleCategories = categories.filter(
  (category) => category.visible,
);

const categorySlugs = new Set<string>(
  categories.map((category) => category.slug),
);

export function isProjectCategory(value: string): value is ProjectCategory {
  return categorySlugs.has(value);
}

export function getCategoryLabel(category: ProjectCategory) {
  return (
    categories.find((item) => item.slug === category)?.label ?? category
  );
}
