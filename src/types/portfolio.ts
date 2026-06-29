export type ProjectCategory =
  | "animation"
  | "landing-page"
  | "saas"
  | "dashboard";

// Inactive categories kept for later restoration:
// | "admin-panel"
// | "commercial"
// | "lead-generation"
// | "real-estate"
// | "marketing"
// | "branding"
// | "crud-app";

export type ProjectStatus = "published" | "draft" | "hidden" | "archived";

export type ProjectPreview =
  | {
      type: "screenshot";
      src: string;
      alt: string;
    }
  | {
      type: "placeholder";
      label: string;
    };

export type PortfolioProject = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  status: ProjectStatus;
  priority: number;
  primaryCategory: ProjectCategory;
  categories: ProjectCategory[];
  stack: string[];
  domainTags: string[];
  demoUrl?: string;
  repoUrl?: string;
  upworkUrl?: string;
  showRepo: boolean;
  githubRepo?: string;
  vercelProject?: string;
  preview: ProjectPreview;
  featured?: boolean;
  whatWasBuilt?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectCardData = Pick<
  PortfolioProject,
  | "slug"
  | "title"
  | "shortDescription"
  | "priority"
  | "primaryCategory"
  | "categories"
  | "stack"
  | "domainTags"
  | "demoUrl"
  | "repoUrl"
  | "upworkUrl"
  | "showRepo"
  | "preview"
>;

export type ProjectChunk = {
  projects: ProjectCardData[];
  nextOffset: number | null;
  hasMore: boolean;
};
