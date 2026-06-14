import Link from "next/link";

import { DeepLinkButton } from "@/components/deep-link-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ExpertNotFound() {
  return (
    <div className="container py-24 text-center max-w-lg">
      <h1 className="text-3xl font-semibold tracking-tight">We couldn&rsquo;t find this expert.</h1>
      <p className="mt-3 text-muted-foreground">
        They may have paused new bookings or removed their profile. Browse other experts below.
      </p>
      <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/experts"
          className={cn(buttonVariants({ variant: "default", size: "default" }))}
        >
          Browse experts
        </Link>
        <DeepLinkButton label="Open in the app" variant="outline" size="default" />
      </div>
    </div>
  );
}
