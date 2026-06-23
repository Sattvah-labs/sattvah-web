import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

// Parent corporate footer. Sattvah Labs is the platform brand and the
// company. Doors out to the tenant + sub-brand surfaces (Sattvah at
// wells.sattvah.ai, Forge at forge.sattvah.ai) sit in their own column.

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const sections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Labs", href: "/labs" },
      { label: "Press kit", href: "/press" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Forge (creator platform)", href: "/products/forge" },
      { label: "Sattvah (wellness app)", href: "/products/sattvah" },
      { label: "Sattvah for coaches", href: `${siteConfig.wellsUrl}/coaches`, external: true },
    ],
  },
  {
    title: "Trust + Legal",
    links: [
      { label: "Trust Center", href: "/trust" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12 grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2 font-semibold">
            <BrandMark size={28} />
            {siteConfig.name}
          </div>
          <p className="text-sm text-muted-foreground">
            Calm software for India. The operating layer for wellness and
            creators, plus the apps that sit on top.
          </p>
          <p className="text-xs text-muted-foreground/80 pt-2">
            Sattvah Labs Private Limited. Registered in Bangalore, Karnataka.
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title} className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
            <ul className="space-y-2">
              {s.links.map((l) =>
                l.external ? (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40">
        <div className="container py-5 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
          <p>
            (c) {new Date().getFullYear()} Sattvah Labs Private Limited. All
            rights reserved.
          </p>
          <p>Made slowly, in India.</p>
        </div>
      </div>
    </footer>
  );
}
