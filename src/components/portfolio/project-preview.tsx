import Image from "next/image";

import type { ProjectPreview as ProjectPreviewData } from "@/types/portfolio";

export function ProjectPreview({
  preview,
  priority = false,
}: {
  preview: ProjectPreviewData;
  priority?: boolean;
}) {
  if (preview.type === "placeholder") {
    return (
      <div className="flex aspect-video items-center justify-center bg-muted px-6 text-center text-sm font-medium text-muted-foreground">
        {preview.label}
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden bg-muted">
      <Image
        alt={preview.alt}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
        fill
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        src={preview.src}
      />
    </div>
  );
}
