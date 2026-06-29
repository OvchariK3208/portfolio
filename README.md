# Selected Work Portfolio

An ultra-lightweight, English-only developer portfolio built with Next.js App
Router, TypeScript, Tailwind CSS, shadcn/ui conventions, and Lucide icons.

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
The root route intentionally has no redirect.

## Checks

```bash
npm run check
```

The repository currently has no unit-test suite; `check` runs the complete
available static and production-build validation.

## Content

Projects are manually curated in `src/content/projects.ts`. Only projects with
`status: "published"` appear publicly. Category labels and routes are controlled
by `src/content/categories.ts`.

Project screenshots are local WebP assets under `public/projects/[slug]`.
External live sites are never embedded or loaded as card previews.

Additional projects are returned in chunks of at most 10 by
`/api/projects`. The first chunk is rendered as static HTML.
