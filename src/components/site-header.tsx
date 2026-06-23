"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

// `external: true` means render as a plain <a> instead of <Link>. Use it
// for routes that live outside the parent-brand Next.js tree (Forge SPA
// at forge.sattvah.ai, the consumer wellness site at wells.sattvah.ai,
// hand-authored HTML under /public/manifesto).
type NavItem = { label: string; href: string; external?: boolean };

const nav: NavItem[] = [
  { label: "Products", href: "/#products" },
  { label: "Forge", href: siteConfig.forgeUrl, external: true },
  { label: "Sattvah", href: siteConfig.wellsUrl, external: true },
  { label: "Labs", href: "/labs" },
  { label: "Press", href: "/press" },
  { label: "Trust", href: "/trust" },
];

const VISITOR_KEY = "sattvah-visited";

export function SiteHeader() {
  const { user, signOut, loading } = useAuth();
  const [isReturning, setIsReturning] = useState(false);

  // Returning-visitor nudge. Cheap localStorage write, no PII.
  useEffect(() => {
    try {
      const marked = localStorage.getItem(VISITOR_KEY);
      if (marked === "1") setIsReturning(true);
      else localStorage.setItem(VISITOR_KEY, "1");
    } catch {
      /* private mode, silently skip */
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <BrandMark size={34} />
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
              href="/contact"
              className={cn(buttonVariants({ variant: "accent", size: "sm" }))}
            >
              Talk to us
            </Link>
          ) : (
            <>
              <Link
                href="/labs"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "accent", size: "sm" }))}
              >
                Talk to us
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
