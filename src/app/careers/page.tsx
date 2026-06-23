import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Sattvah Labs is a one-person company today. When we hire, it will be slowly, deliberately, and in India. Write to the founder if you want to be on the shortlist.",
  alternates: { canonical: `${siteConfig.url}/careers` },
  openGraph: {
    title: "Careers at Sattvah Labs",
    description:
      "We are not hiring yet. Write to the founder to land on the shortlist when we do.",
    url: `${siteConfig.url}/careers`,
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Careers"
        headline="Not hiring yet. Listening already."
        highlight="listening"
        sub="Sattvah Labs is a one-person company today. When we hire, it will be slow, deliberate, and in India. If you want to be on the shortlist when we do, write to the founder."
        ctas={[
          { label: "Email mano@sattvah.ai", href: "mailto:mano@sattvah.ai" },
          { label: "About the company", href: "/labs" },
        ]}
      />

      <Section />
    </>
  );
}

function Section() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl">
      <Reveal>
        <Badge variant="outline" className="mb-6">
          What we look for
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          People who can build, and <GradientWord>care</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            Sattvah Labs is bootstrapped and India-first. We will hire when
            the product is steady and the revenue is real. Probably late
            2026 or early 2027.
          </p>
          <p>
            When we do, we will look for engineers who can both write Go
            and write copy. For designers who can both ship a Figma file
            and ship a launch tweet. For one or two early operators who
            care about wellness creators and want to build with us.
          </p>
          <p>
            If that is you, write to{" "}
            <a
              href="mailto:mano@sattvah.ai"
              className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
            >
              mano@sattvah.ai
            </a>
            . Tell us what you have built and what you would build with us.
            Every email gets a reply.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="mailto:mano@sattvah.ai"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12",
            )}
          >
            <Mail className="h-4 w-4" /> mano@sattvah.ai
          </Link>
          <Link
            href="/labs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 h-12",
            )}
          >
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
