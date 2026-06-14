import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container max-w-lg py-24 text-center">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        This page wandered off.
      </h1>
      <p className="mt-3 text-muted-foreground">
        Try heading home, or browse the community.
      </p>
      <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default", size: "default" }))}
        >
          Back home
        </Link>
        <Link
          href="/community"
          className={cn(buttonVariants({ variant: "outline", size: "default" }))}
        >
          Read the community
        </Link>
      </div>
    </div>
  );
}
