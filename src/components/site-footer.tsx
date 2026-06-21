import Link from "next/link";

import { HamsaSwan } from "@/components/hamsa-swan";
import { siteConfig } from "@/lib/site";

const sections = [
  {
    title: "Sattvah",
    links: [
      { label: "Community", href: "/community" },
      { label: "Experts", href: "/experts" },
      { label: "Mission", href: "/mission" },
      { label: "Founder", href: "/founder" },
    ],
  },
  {
    title: "Help & Legal",
    links: [
      { label: "Crisis support", href: "/crisis" },
      { label: "About", href: "/about" },
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
            <HamsaSwan size={28} />
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
