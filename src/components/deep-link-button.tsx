import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface DeepLinkButtonProps {
  /** Path inside the mobile app, e.g. "experts/abc/book" — no leading slash. */
  path?: string;
  label?: string;
  showArrow?: boolean;
  className?: string;
  variant?: "default" | "accent" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * Anchor styled as a button that prefers the `sattvah://` universal link.
 *
 * On modern iOS/Android, an `<a href="sattvah://...">` is intercepted by the OS
 * when the app is installed; otherwise it falls through. We can't browser-sniff
 * in RSC, so app-store fallback is communicated to a tiny client helper via
 * data-* attributes (left here for the user to wire up if needed).
 */
export function DeepLinkButton({
  path = "",
  label = "Open in the app",
  showArrow = true,
  className,
  variant = "accent",
  size = "lg",
}: DeepLinkButtonProps) {
  const scheme = `${siteConfig.scheme}${path}`;
  return (
    <Link
      href={scheme}
      data-fallback-ios={siteConfig.iosAppUrl}
      data-fallback-android={siteConfig.androidAppUrl}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <span>{label}</span>
      {showArrow ? <ArrowUpRight className="h-4 w-4" /> : null}
    </Link>
  );
}
