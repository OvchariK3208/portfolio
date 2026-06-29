import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border border-border bg-muted/60 px-2.5 text-[11px] font-medium leading-none text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
