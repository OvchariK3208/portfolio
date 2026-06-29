import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioFeed } from "@/components/portfolio/portfolio-feed";
import {
  categories,
  getCategoryLabel,
  isProjectCategory,
} from "@/content/categories";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isProjectCategory(category)) {
    return { title: "Page not found" };
  }

  return {
    title: `${getCategoryLabel(category)} Projects`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isProjectCategory(category)) {
    notFound();
  }

  return <PortfolioFeed category={category} />;
}
