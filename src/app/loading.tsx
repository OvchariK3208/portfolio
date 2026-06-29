import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-full rounded-full" />
      <div className="my-6 flex items-end justify-between">
        <div>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-2 h-7 w-40" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="portfolio-grid grid gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            className="overflow-hidden rounded-xl border border-border bg-card"
            key={index}
          >
            <Skeleton className="aspect-video rounded-none" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
