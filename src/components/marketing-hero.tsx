/**
 * Reusable marketing hero. Used on /coaches, /labs, /trust, /press to
 * keep a consistent rhythm across the site. Renders a centered
 * eyebrow, headline, sub-copy, and CTA row.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { HeroOrbs } from "@/components/hero-orbs";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type HeroCta = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "accent";
};

export function MarketingHero({
  eyebrow,
  headline,
  highlight,
  sub,
  ctas,
  fine,
}: {
  eyebrow: string;
  headline: string;
  highlight?: string;
  sub: string;
  ctas?: HeroCta[];
  fine?: string;
}) {
  const parts = highlight ? headline.split(highlight) : [headline];
  return (
    <section className="relative overflow-hidden">
      <HeroOrbs />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-24 md:pt-32 lg:pt-36 pb-20 md:pb-28 text-center">
        <Reveal>
          <Badge
            variant="accent"
            className="mb-8 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
          >
            {eyebrow}
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            {highlight ? (
              <>
                {parts[0]}
                <GradientWord>{highlight}</GradientWord>
                {parts[1]}
              </>
            ) : (
              headline
            )}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-7 text-lg md:text-xl text-foreground/65 max-w-2xl mx-auto leading-relaxed text-balance">
            {sub}
          </p>
        </Reveal>

        {ctas && ctas.length > 0 ? (
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              {ctas.map((c, i) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={cn(
                    buttonVariants({ variant: c.variant ?? (i === 0 ? "default" : "outline"), size: "lg" }),
                    "px-8 h-12 text-base",
                    (c.variant ?? (i === 0 ? "default" : "outline")) === "default" &&
                      "shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow",
                  )}
                >
                  {c.label}
                  {i === 0 ? <ArrowRight className="h-4 w-4" /> : null}
                </Link>
              ))}
            </div>
          </Reveal>
        ) : null}

        {fine ? (
          <Reveal delay={0.4}>
            <p className="mt-7 text-xs text-foreground/55">{fine}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
