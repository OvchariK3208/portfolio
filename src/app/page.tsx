import type { Metadata } from "next";

import { PortfolioFeed } from "@/components/portfolio/portfolio-feed";

export const metadata: Metadata = {
  title: "All Projects",
};

export default function HomePage() {
  return <PortfolioFeed />;
}
