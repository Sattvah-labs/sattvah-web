"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { HamsaSwan } from "@/components/hamsa-swan";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

// `external: true` means render as a plain <a> instead of <Link>. Use it
// for routes that live as static files outside the Next.js route tree
// (e.g. /manifesto/ is a hand-authored HTML page under /public/manifesto).
// Direct /index.html href works in both `next dev` and the exported S3
// build — next dev doesn't resolve directory-index lookups from /public.
const nav = [
  { label: "Community", href: "/community" },
  { label: "Founder", href: "/founder" },
  { label: "Mission", href: "/mission" },
  { label: "Manifesto", href: "/manifesto/index.html", external: true },
  { label: "About", href: "/about" },
];

const VISITOR_KEY = "sattvah-visited";

export function SiteHeader() {
  const { user, signOut, loading } = useAuth();
  const [isReturning, setIsReturning] = useState(false);

  // Nudge #5 — returning visitor swap. Mark on first paint so the next
  // load shows the warmer CTA. Cheap localStorage write, no PII.
  useEffect(() => {
    try {
      const marked = localStorage.getItem(VISITOR_KEY);
      if (marked === "1") setIsReturning(true);
      else localStorage.setItem(VISITOR_KEY, "1");
    } catch {
      /* private mode — silently skip */
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <HamsaSwan size={34} />
          <span className="text-base">{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          {loading ? null : user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user.displayName || user.email}
              </span>
              <button
                onClick={signOut}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Sign out
              </button>
            </>
          ) : isReturning ? (
            <Link
              href="/signin"
              className={cn(buttonVariants({ variant: "accent", size: "sm" }))}
            >
              Welcome back, sign in
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className={cn(buttonVariants({ variant: "accent", size: "sm" }))}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
