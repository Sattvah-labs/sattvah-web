import Link from "next/link";

import { DeepLinkButton } from "@/components/deep-link-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PostNotFound() {
  return (
    <div className="container py-24 text-center max-w-lg">
      <h1 className="text-3xl font-semibold tracking-tight">This post isn&rsquo;t visible here.</h1>
      <p className="mt-3 text-muted-foreground">
        It may have been removed, set to private, or only viewable inside the app.
      </p>
      <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
        <DeepLinkButton label="Open in the app" size="default" />
        <Link
          href="/community"
          className={cn(buttonVariants({ variant: "outline", size: "default" }))}
        >
          Back to community
        </Link>
      </div>
    </div>
  );
}
