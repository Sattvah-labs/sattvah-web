import Link from "next/link";

import { siteConfig } from "@/lib/site";

const sections = [
  {
    title: "Product",
    links: [
      { label: "Community", href: "/community" },
      { label: "Experts", href: "/experts" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12 grid gap-10 md:grid-cols-[1.4fr_repeat(2,1fr)]">
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c-3.5 4.5-7 6.5-7 11a7 7 0 0 0 14 0c0-4.5-3.5-6.5-7-11z" />
              </svg>
            </span>
            {siteConfig.name}
          </div>
          <p className="text-sm text-muted-foreground">
            A calmer place to feel heard. Built with care for the moments words are hard to find.
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title} className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
            <ul className="space-y-2">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40">
        <div className="container py-5 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sattvah Labs. All rights reserved.</p>
          <p>Powered by Sattvah Labs.</p>
        </div>
      </div>
    </footer>
  );
}
