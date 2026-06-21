import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

const sections = [
  {
    title: "Sattvah",
    links: [
      { label: "Community", href: "/community" },
      { label: "For coaches", href: "/coaches" },
      { label: "Mission", href: "/mission" },
      { label: "Founder", href: "/founder" },
    ],
  },
  {
    title: "Sattvah Labs",
    links: [
      { label: "About Labs", href: "/labs" },
      { label: "Press kit", href: "/press" },
      { label: "Trust Center", href: "/trust" },
      { label: "Crisis support", href: "/crisis" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "mailto:mano@sattvah.ai" },
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
            A calmer place to feel heard. Built with care for the moments
            words are hard to find.
          </p>
          <p className="text-xs text-muted-foreground/80 pt-2">
            Sattvah is a product of Sattvah Labs Pvt Ltd, India.
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
