---
modified: 28.06.26 12:26
created: 28.06.26 12:25
---
# PRD: Ultra-Lightweight Developer Portfolio Website

## 1. Project Overview

Build an ultra-lightweight developer portfolio website focused on showing selected projects in a clean, fast, minimal interface.

The portfolio is not a personal blog, not a full personal website, and not a contact page. It is a curated project showcase that can be safely shared with clients, including Upwork clients, without exposing direct personal contact details.

The main entry point is:

```txt
/
```

This page represents **All Projects**.

Category-specific views use routes like:

```txt
/animation
/landing-page
/saas
/dashboard
```

Project detail pages must stay inside the portfolio route structure:

```txt
/[primaryCategory]/[projectSlug]
```

Do **not** create separate project routes like:

```txt
/projects/[slug]
```

Do **not** create pagination routes like:

```txt
/page/2
/animation/page/2
```

The portfolio must load fast, render the first content immediately, and progressively append additional projects in the same feed when the user clicks **Load more**.

---

## 2. Main Goals

### 2.1 Primary Goal

Create a fast, minimal, English-only project portfolio that highlights selected developer projects with:

- project previews;
- title;
- short description;
- stack badges;
- category/domain badges;
- live demo link;
- optional repository link;
- project detail page;
- category filtering through URL routes;
- progressive loading in chunks of 10 projects.

### 2.2 Secondary Goal

Prepare the architecture so that projects can later be partially enriched from GitHub and/or Vercel, while keeping the final portfolio list manually controlled.

GitHub must not automatically publish every repository to the portfolio.

---

## 3. Non-Goals

Do not implement the following in the first version:

- no hero block;
- no personal contact section;
- no email, phone, Telegram, WhatsApp, or direct contact links;
- no heavy animation library for the portfolio itself;
- no Framer Motion;
- no Motion library;
- no GSAP for the portfolio UI itself;
- no iframe-based live previews in project cards;
- no classic pagination routes;
- no separate `/projects/[slug]` route;
- no automatic publishing of all GitHub repositories;
- no admin dashboard;
- no backend database;
- no authentication;
- no contact form;
- no CMS in the first version.

---

## 4. Target Audience

The website is mainly for potential clients who need to quickly inspect selected work examples.

Typical user scenarios:

1. A client opens `/` and sees the strongest projects first.
2. A client opens `/animation` to see only animation-related projects.
3. A client opens `/landing-page` to see landing page projects.
4. A client clicks one card and opens the detailed project page.
5. A client uses the live demo link to inspect the deployed project.
6. A client optionally opens the GitHub repository only if the project is allowed to expose source code.

---

## 5. Language Requirement

The public website must be **English-only**.

All user-facing UI labels, category names, project descriptions, buttons, metadata, empty states, and error states must be written in English.

Examples:

```txt
All
Animation
Landing Page
SaaS
Dashboard
Live Demo
Source Code
Load more
No more projects
```

---

## 6. Tech Stack

Use the following stack:

```txt
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui
Lucide React
Vercel
```

### 6.1 Required Technical Decisions

- Use **Next.js App Router**.
- Use **TypeScript**.
- Use **Server Components by default**.
- Use Client Components only where needed.
- Use **Tailwind CSS** for styling.
- Use **shadcn/ui** for UI primitives where useful.
- Use **Lucide React** for icons.
- Use latest stable versions of dependencies at implementation time.
- Use a simple local typed project config as the source of truth.
- Use GitHub API only as optional enrichment/sync tooling, not as the production source of truth.

### 6.2 Animation Policy

For the portfolio website itself:

```txt
Use Tailwind/CSS transitions only.
Do not install Framer Motion.
Do not install Motion.
Do not install GSAP for portfolio UI animations.
```

Important nuance:

Projects shown inside the portfolio may use GSAP, Framer Motion, Motion Design, etc. Those technologies can appear as stack badges. But the portfolio website itself should stay lightweight and avoid heavy animation dependencies.

Example badge:

```txt
GSAP
```

is allowed as a project stack badge.

Installing GSAP into the portfolio app just for UI animations is not allowed.

---

## 7. UI Concept

The site should be minimal, fast, and focused.

### 7.1 Header

Use a very small header.

The header may contain:

- portfolio title or small logo text;
- minimal navigation;
- optional icon placeholders for future use.

For the first version:

```txt
Do not add the GitHub profile icon to the global header.
```

Reason:

The portfolio must stay Upwork-safe and avoid exposing unnecessary personal profile data. GitHub can still be used on individual project cards if `showRepo` is explicitly enabled for a project.

### 7.2 Main Portfolio Area

The main content starts immediately with the portfolio/filter area.

There must be no large hero block.

The `/` page should immediately show:

1. compact filter/category bar;
2. project grid/list;
3. first 10 strongest projects;
4. load more area.

### 7.3 Filters

The top filter bar must include category links.

Initial category set:

```txt
All
Animation
Landing Page
SaaS
Dashboard
Admin Panel
Commercial Website
Lead Generation
Real Estate
Marketing
Branding
```

The exact list should be controlled through a typed config.

Example routes:

```txt
/
/animation
/landing-page
/saas
/dashboard
```

The filter panel should remain visible near the top of all portfolio category pages.

Styling should be minimal:

- small badges;
- small gaps;
- subtle separators;
- optional Lucide icons only where useful;
- no heavy UI decorations.

---

## 8. Routing Requirements

### 8.1 Portfolio Routes

Required routes:

```txt
/
/[category]
```

Where:

- `/` means All Projects;
- `/animation` shows projects that include the `animation` category;
- `/landing-page` shows projects that include the `landing-page` category;
- `/saas` shows projects that include the `saas` category;
- `/dashboard` shows projects that include the `dashboard` category.

### 8.2 Project Detail Routes

Project detail pages must be nested under portfolio:

```txt
/[primaryCategory]/[projectSlug]
```

Examples:

```txt
/landing-page/urbanouse
/dashboard/product-market
/saas/kozuroy
```

Do not use:

```txt
/projects/urbanouse
/projects/product-market
```

### 8.3 Multi-Category Project Logic

A project can belong to multiple categories.

Example:

```ts
categories: ["landing-page", "animation", "lead-generation"]
primaryCategory: "landing-page"
```

This project must appear in:

```txt
/
/landing-page
/animation
/lead-generation
```

But the project detail page must have one canonical URL based on `primaryCategory`:

```txt
/landing-page/project-slug
```

### 8.4 Why `primaryCategory` Is Required

Without `primaryCategory`, the same project could have multiple detail URLs:

```txt
/animation/project-slug
/landing-page/project-slug
/lead-generation/project-slug
```

This is not desired.

Every project must therefore define:

```ts
primaryCategory: "landing-page"
categories: ["landing-page", "animation", "lead-generation"]
```

The card can appear in many feeds, but the detail page should use only the primary category route.

---

## 9. Loading and Progressive Feed Behavior

### 9.1 No Classic Pagination

Do not implement URL pagination.

Do not create:

```txt
/page/2
/animation/page/2
```

### 9.2 Required Feed Behavior

The portfolio must behave as one continuous feed.

Initial render:

```txt
Render the first 10 projects on the server.
```

After that:

1. User scrolls down.
2. When the user gets close to the end of the currently rendered list, the app prefetches the next 10 projects in the background.
3. User clicks **Load more**.
4. The prefetched projects are appended into the same list.
5. The URL does not change.
6. Repeat until there are no more projects.

### 9.3 Load More Button

Add a button below the current project list:

```txt
Load more
```

When there are no more projects:

```txt
No more projects
```

or simply hide the button.

### 9.4 Prefetching Behavior

Use a small Client Component for feed continuation.

Recommended approach:

```txt
IntersectionObserver + fetch next chunk
```

Behavior:

- render first 10 projects server-side;
- create a sentinel element near the end of the list;
- when the sentinel enters the viewport, prefetch the next chunk;
- store prefetched projects in component state;
- append them only when the user clicks **Load more**;
- after append, prepare the next prefetch.

### 9.5 API Route for Chunks

Create a lightweight route handler for additional chunks.

Example:

```txt
/api/projects?category=animation&offset=10&limit=10
/api/projects?category=all&offset=20&limit=10
```

Expected response:

```ts
{
  projects: ProjectCardData[]
  nextOffset: number | null
  hasMore: boolean
}
```

The first 10 projects should not depend on this API call. They should be rendered by the server page.

---

## 10. Data Source Strategy

### 10.1 Source of Truth

The source of truth must be a manually curated typed config file.

Recommended file:

```txt
src/content/projects.ts
```

GitHub must not automatically control what appears on the website.

### 10.2 Why Manual Curation Is Required

The GitHub account can contain:

- old experiments;
- incomplete server-side tests;
- small HTML snippets;
- draft projects;
- private repositories;
- projects that are not strong enough for client-facing portfolio use.

These repositories should not be deleted from GitHub, but they also must not automatically appear in the portfolio.

Only explicitly selected projects should appear on the site.

### 10.3 Optional GitHub Sync

Create an optional script to collect raw repository data:

```txt
scripts/sync-github-repos.ts
```

This script can generate:

```txt
src/generated/github-repos.json
```

This file is only raw material.

It may include:

- repository name;
- full name;
- URL;
- description;
- homepage/demo URL;
- topics;
- language;
- visibility;
- last pushed date;
- archived status.

But it must not directly publish projects to the portfolio.

Correct flow:

```txt
GitHub API
  ↓
src/generated/github-repos.json
  ↓
manual selection and editing
  ↓
src/content/projects.ts
  ↓
portfolio website
```

### 10.4 Priority-Based Sorting

Each project must have a numeric priority.

Use 3-digit values:

```ts
priority: 950
priority: 900
priority: 850
priority: 700
```

Sort by priority descending:

```ts
projects.sort((a, b) => b.priority - a.priority)
```

Why not use `order: 1, 2, 3`?

Because priority numbers make it easier to insert a new project between existing projects.

Example:

```ts
priority: 900
priority: 875
priority: 850
```

### 10.5 Publication Status

Each project must have a status.

Recommended statuses:

```ts
"published"
"draft"
"hidden"
"archived"
```

Only projects with:

```ts
status: "published"
```

should appear in public portfolio feeds.

---

## 11. Project Data Model

Create a strongly typed data model.

Recommended type:

```ts
export type ProjectCategory =
  | "animation"
  | "landing-page"
  | "saas"
  | "dashboard"
  | "admin-panel"
  | "commercial"
  | "lead-generation"
  | "real-estate"
  | "marketing"
  | "branding"
  | "crud-app"

export type ProjectStatus =
  | "published"
  | "draft"
  | "hidden"
  | "archived"

export type ProjectPreview =
  | {
      type: "screenshot"
      src: string
      alt: string
    }
  | {
      type: "placeholder"
      label: string
    }

export type PortfolioProject = {
  slug: string
  title: string
  shortDescription: string
  fullDescription?: string

  status: ProjectStatus
  priority: number

  primaryCategory: ProjectCategory
  categories: ProjectCategory[]

  stack: string[]
  domainTags: string[]

  demoUrl?: string
  repoUrl?: string
  showRepo: boolean

  githubRepo?: string
  vercelProject?: string

  preview: ProjectPreview

  featured?: boolean
  createdAt?: string
  updatedAt?: string
}
```

### 11.1 Example Project Config

```ts
export const projects: PortfolioProject[] = [
  {
    slug: "urbanouse",
    title: "Urbanouse",
    shortDescription:
      "A real estate rental platform concept with a clean responsive interface.",
    fullDescription:
      "Urbanouse is a real estate rental project focused on short-term property listings, property discovery, and a clean user experience for renters and agents.",

    status: "published",
    priority: 950,

    primaryCategory: "landing-page",
    categories: ["landing-page", "real-estate", "lead-generation"],

    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    domainTags: ["Real Estate", "Rental", "Lead Generation"],

    demoUrl: "https://example.vercel.app",
    repoUrl: "https://github.com/OvchariK3208/urbanouse",
    showRepo: true,

    githubRepo: "OvchariK3208/urbanouse",

    preview: {
      type: "screenshot",
      src: "/projects/urbanouse/preview.webp",
      alt: "Urbanouse website preview",
    },

    featured: true,
  },
  {
    slug: "product-market",
    title: "Product Market",
    shortDescription:
      "A product management app with listing, create, update and delete flows.",

    status: "published",
    priority: 850,

    primaryCategory: "dashboard",
    categories: ["dashboard", "crud-app", "admin-panel"],

    stack: ["React", "TypeScript", "Redux"],
    domainTags: ["Products", "Admin", "CRUD"],

    demoUrl: "https://example.vercel.app/products",
    repoUrl: "https://github.com/OvchariK3208/product-market",
    showRepo: true,

    githubRepo: "OvchariK3208/product-market",

    preview: {
      type: "screenshot",
      src: "/projects/product-market/preview.webp",
      alt: "Product Market app preview",
    },
  },
]
```

---

## 12. Project Card Requirements

Each project card must show:

- preview;
- title;
- short description;
- stack badges;
- domain/category badges;
- live demo button if `demoUrl` exists;
- source code button only if `showRepo === true` and `repoUrl` exists;
- link to project detail page.

### 12.1 Card Actions

Required labels:

```txt
View Project
Live Demo
Source Code
```

Rules:

- `Live Demo` appears only when `demoUrl` exists.
- `Source Code` appears only when `showRepo === true` and `repoUrl` exists.
- The whole card or a clear button should link to the detail page.
- External links should open safely in a new tab.

### 12.2 Card Preview

The preview area should be visually attractive but lightweight.

Recommended approach:

- use optimized static screenshot;
- use `.webp` or `.avif`;
- use `next/image`;
- use lazy loading after the first visible area;
- use skeleton while preview is loading;
- avoid iframe previews.

---

## 13. Project Detail Page Requirements

Route:

```txt
/[primaryCategory]/[projectSlug]
```

The detail page should show:

- project title;
- project preview;
- short summary;
- longer project description if available;
- stack badges;
- domain/category badges;
- live demo link if available;
- source code link if allowed;
- possible screenshots section;
- possible “problem / solution” block;
- possible “what was built” block.

The detail page should remain minimal and fast.

No contact data should be added.

---

## 14. Preview Strategy

### 14.1 Preferred Preview Method

Use optimized static screenshots.

Recommended file format:

```txt
.webp
.avif
```

Recommended path:

```txt
public/projects/[projectSlug]/preview.webp
```

Example:

```txt
public/projects/urbanouse/preview.webp
public/projects/product-market/preview.webp
```

### 14.2 Why Not iframe Preview

Do not use iframe-based previews in cards.

Reasons:

- each iframe loads another website;
- heavy network usage;
- possible security/header issues;
- worse performance;
- bad initial load behavior;
- unnecessary complexity.

### 14.3 Manual Screenshot Flow

First version can use manual screenshots:

1. open the live demo;
2. take a screenshot;
3. crop to a clean preview ratio;
4. convert/compress to `.webp` or `.avif`;
5. save to `public/projects/[slug]/preview.webp`;
6. reference it in `projects.ts`.

### 14.4 Optional Automated Screenshot Script

Later, add:

```txt
scripts/generate-project-screenshots.ts
```

Possible tool:

```txt
Playwright
```

Expected behavior:

- read projects with `demoUrl`;
- open each demo URL;
- capture screenshot;
- save optimized preview to `public/projects/[slug]/preview.webp`.

This is optional and should not block the first version.

---

## 15. Performance Requirements

The portfolio must prioritize speed.

### 15.1 Initial Load

The initial `/` page should:

- render the first 10 projects on the server;
- avoid unnecessary client JavaScript;
- avoid heavy animation dependencies;
- avoid iframe previews;
- avoid loading all projects at once;
- avoid loading all images at once.

### 15.2 JavaScript Budget

Client JavaScript should be limited to:

- Load More behavior;
- prefetching next project chunk;
- minor UI interactions;
- small hover/tap transitions.

Do not convert the whole portfolio into a client-side SPA.

### 15.3 Image Optimization

Use:

- `next/image`;
- optimized local assets;
- width/height to prevent layout shift;
- lazy loading where appropriate;
- skeleton placeholders.

### 15.4 Loading States

Use minimal skeleton states:

- project card skeleton;
- preview skeleton;
- load more button loading state.

Avoid large animated loaders.

### 15.5 CSS/Animation

Use:

- Tailwind transitions;
- CSS transforms;
- opacity transitions;
- hover states;
- focus states.

Do not use heavy animation packages for portfolio UI.

---

## 16. Upwork-Safe Requirements

The portfolio should not expose direct personal contact data.

Do not include:

- email address;
- phone number;
- Telegram;
- WhatsApp;
- direct contact form;
- “Contact me directly” CTA;
- personal address;
- external personal links that may violate platform rules.

GitHub repository links may be shown only per project, only if explicitly enabled:

```ts
showRepo: true
```

The global GitHub profile icon should not be added in the first version.

---

## 17. SEO and Metadata

Each page should have basic metadata.

Examples:

```txt
/
Title: Portfolio | Selected Frontend Projects
Description: Selected frontend, landing page, SaaS, dashboard and animation projects.

/animation
Title: Animation Projects | Portfolio
Description: Selected animation and motion-focused frontend projects.

/landing-page/urbanouse
Title: Urbanouse | Portfolio Project
Description: Real estate rental platform concept built with modern frontend tools.
```

Project detail pages should use the canonical URL based on `primaryCategory`.

---

## 18. Accessibility Requirements

The site should follow basic accessibility best practices:

- semantic HTML;
- visible focus states;
- accessible buttons and links;
- meaningful alt text for previews;
- keyboard-accessible controls;
- proper heading hierarchy;
- no clickable divs without button/link semantics;
- sufficient contrast.

---

## 19. Recommended Project Structure

Suggested structure:

```txt
src/
  app/
    portfolio/
      page.tsx
      [category]/
        page.tsx
        [projectSlug]/
          page.tsx
    api/
      portfolio/
        route.ts

  components/
    portfolio/
      portfolio-feed.tsx
      portfolio-feed-client.tsx
      project-card.tsx
      project-card-skeleton.tsx
      category-filter.tsx
      load-more-button.tsx
      project-preview.tsx

    ui/
      # shadcn/ui components

  content/
    projects.ts
    categories.ts

  generated/
    github-repos.json

  lib/
    portfolio/
      get-projects.ts
      filter-projects.ts
      sort-projects.ts
      paginate-projects.ts
      get-project-by-slug.ts
      get-canonical-project-url.ts

  types/
    portfolio.ts

scripts/
  sync-github-repos.ts
  generate-project-screenshots.ts
```

---

## 20. Core Utility Requirements

### 20.1 Get Published Projects

```ts
export function getPublishedProjects() {
  return projects
    .filter((project) => project.status === "published")
    .sort((a, b) => b.priority - a.priority)
}
```

### 20.2 Filter by Category

```ts
export function getProjectsByCategory(category?: string) {
  const published = getPublishedProjects()

  if (!category || category === "all") {
    return published
  }

  return published.filter((project) =>
    project.categories.includes(category as ProjectCategory)
  )
}
```

### 20.3 Chunk Projects

```ts
export function getProjectChunk({
  category,
  offset = 0,
  limit = 10,
}: {
  category?: string
  offset?: number
  limit?: number
}) {
  const filtered = getProjectsByCategory(category)
  const chunk = filtered.slice(offset, offset + limit)

  return {
    projects: chunk,
    nextOffset: offset + chunk.length < filtered.length ? offset + chunk.length : null,
    hasMore: offset + chunk.length < filtered.length,
  }
}
```

### 20.4 Canonical Project URL

```ts
export function getProjectUrl(project: PortfolioProject) {
  return `/${project.primaryCategory}/${project.slug}`
}
```

---

## 21. UI Components

### 21.1 CategoryFilter

Responsibilities:

- render category links;
- highlight active category;
- link to `/` for All;
- link to `/[category]` for category filters.

### 21.2 PortfolioFeed

Server-side component.

Responsibilities:

- receive category param;
- fetch first 10 projects from local config;
- render filter bar;
- render initial project cards;
- render Client Component for load-more behavior.

### 21.3 PortfolioFeedClient

Small Client Component.

Responsibilities:

- manage appended project chunks;
- prefetch next chunk;
- append prefetched chunk on Load more click;
- show loading state;
- stop when no more projects exist.

### 21.4 ProjectCard

Responsibilities:

- render preview;
- render title;
- render short description;
- render stack badges;
- render domain/category badges;
- render action links;
- link to project detail page.

### 21.5 ProjectPreview

Responsibilities:

- render optimized static screenshot;
- render placeholder if screenshot is missing;
- use skeleton/loading state where useful.

---

## 22. shadcn/ui Usage

Use shadcn/ui where it makes sense, for example:

- Button;
- Badge;
- Card;
- Separator;
- Skeleton;
- Tooltip if needed.

Do not overuse UI primitives if simple HTML + Tailwind is enough.

The final UI should remain minimal and lightweight.

---

## 23. Lucide Icons Usage

Use icons only from Lucide React.

Possible icons:

```txt
ExternalLink
Github
Code
Eye
Layers
Sparkles
LayoutDashboard
Rocket
Building2
```

Rules:

- use icons sparingly;
- do not add decorative icon noise;
- do not add global GitHub profile icon in the first version;
- GitHub icon may be used inside a project card only when source code link is allowed.

---

## 24. Example Project Titles and Badges

Example title for an animated landing page service/project:

```txt
Animated Landing Page | React, Next.js, GSAP & Tailwind
```

This title is suitable as a project/service label, but remember:

- GSAP may be listed as a project technology;
- GSAP should not be installed in the portfolio website unless absolutely needed later.

Example stack badges:

```txt
React
Next.js
TypeScript
Tailwind CSS
shadcn/ui
GSAP
Supabase
PostgreSQL
Vercel
```

Example domain badges:

```txt
Landing Page
Animation
Lead Generation
Real Estate
SaaS
Dashboard
Admin Panel
Marketing
Branding
Commercial Website
```

---

## 25. Environment Variables

Initial version should not require environment variables.

Optional future GitHub sync may use:

```txt
GITHUB_TOKEN
GITHUB_USERNAME
```

Rules:

- never expose GitHub token to client;
- keep GitHub sync server-side or script-only;
- do not use `NEXT_PUBLIC_` for private tokens.

Optional future Vercel enrichment may use:

```txt
VERCEL_TOKEN
```

Again:

- never expose Vercel token to client;
- keep it server-side/script-only.

---

## 26. Implementation Plan

### Phase 1: Foundation

- Create Next.js App Router project.
- Add TypeScript.
- Add Tailwind CSS.
- Add shadcn/ui.
- Add Lucide React.
- Create `/` route.
- Create minimal layout.
- Create category config.
- Create typed project model.
- Create initial `projects.ts`.

### Phase 2: Portfolio Feed

- Render first 10 projects server-side.
- Add category filter bar.
- Add project cards.
- Add badge rendering.
- Add live demo/source code actions.
- Add project preview component.
- Add skeleton components.

### Phase 3: Progressive Loading

- Add `/api/projects` route handler for additional chunks.
- Add small Client Component for Load more behavior.
- Add IntersectionObserver prefetch.
- Append projects into the same feed.
- Ensure no `/page/2` routes exist.

### Phase 4: Project Detail Pages

- Add `/[category]/[projectSlug]`.
- Validate category and slug.
- Use `primaryCategory` as canonical project category.
- Render project detail content.
- Add metadata.

### Phase 5: GitHub Sync Tooling

- Add optional `scripts/sync-github-repos.ts`.
- Fetch raw GitHub repo list.
- Save to `src/generated/github-repos.json`.
- Keep manual `projects.ts` as source of truth.
- Do not auto-publish raw GitHub repos.

### Phase 6: Preview Optimization

- Add real preview screenshots.
- Use `.webp` or `.avif`.
- Add placeholders for missing previews.
- Optionally add Playwright screenshot script later.

---

## 27. Acceptance Criteria

The implementation is complete when:

- `/` renders successfully.
- `/` shows only the first 10 published projects initially.
- `/[category]` filters projects by category.
- Projects can belong to multiple categories.
- Each project has one `primaryCategory`.
- Project detail pages use `/[primaryCategory]/[projectSlug]`.
- No `/projects/[slug]` route exists.
- No `/page/2` route exists.
- Load more appends the next 10 projects into the same feed.
- The next chunk is prefetched when the user approaches the end of the list.
- The website is English-only.
- No hero block is present.
- No direct personal contact data is present.
- Global GitHub profile icon is not present in the first version.
- Project source link appears only when `showRepo === true`.
- Portfolio UI uses only Tailwind/CSS transitions.
- Framer Motion, Motion, and GSAP are not installed for portfolio UI.
- Project previews use optimized static images or placeholders.
- The site remains lightweight and fast.
- The project list is controlled manually through `src/content/projects.ts`.
- GitHub sync, if implemented, only generates raw data and does not publish automatically.

---

## 28. Agent Instructions

When implementing this project, follow these rules strictly:

1. Do not ask for a hero section. There should be no hero block.
2. Do not create `/projects/[slug]`.
3. Do not create `/page/2` pagination routes.
4. Do not use classic pagination.
5. Use progressive load-more feed behavior.
6. Render the first 10 projects server-side.
7. Append additional projects in chunks of 10.
8. Keep the website English-only.
9. Keep the UI minimal and fast.
10. Use Tailwind/CSS transitions only.
11. Do not install Framer Motion, Motion, or GSAP for portfolio UI.
12. Use shadcn/ui only where it adds value.
13. Use Lucide React icons only.
14. Do not add direct contact information.
15. Do not add the global GitHub profile icon in the first version.
16. Allow per-project source links only through `showRepo`.
17. Use a manual typed project config as the source of truth.
18. Use GitHub sync only as optional raw data generation.
19. Do not automatically expose every GitHub repository.
20. Optimize previews as static screenshots, not iframe cards.

---

## 29. Final Summary

Build an ultra-lightweight, English-only developer portfolio with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Lucide React.

The site starts at `/`, immediately shows a compact filter bar and the first 10 strongest curated projects. There is no hero block. Additional projects are appended into the same feed in chunks of 10 through a **Load more** flow with background prefetching. There are no `/page/2` routes.

Projects can belong to multiple categories and appear in multiple category feeds, but every project has one `primaryCategory` for its canonical detail route:

```txt
/[primaryCategory]/[projectSlug]
```

The project list is controlled manually through `src/content/projects.ts`. GitHub can be used later to generate raw repository data, but it must not automatically publish all repositories to the portfolio.

The portfolio must be fast, minimal, Upwork-safe, and focused only on showing selected project work.
