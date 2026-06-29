import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The page you requested does not exist or is no longer available.
      </p>
      <Link
        className={`${buttonVariants()} mt-7`}
        href="/"
        prefetch={false}
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to portfolio
      </Link>
    </main>
  );
}
