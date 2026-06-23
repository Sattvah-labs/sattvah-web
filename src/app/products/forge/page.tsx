import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coins, Layers, Sparkles, Users, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Forge, the creator monetization platform",
  description:
    "Forge is the India-first creator monetization platform from Sattvah Labs. Communities, courses, workshops, payments. One app, no plugins.",
  alternates: { canonical: `${siteConfig.url}/products/forge` },
  openGraph: {
    title: "Forge, by Sattvah Labs",
    description:
      "The India-first creator monetization platform. Communities, courses, workshops, payments. One app, no plugins.",
    url: `${siteConfig.url}/products/forge`,
    type: "website",
  },
};

export default function ForgeProductPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Product, Forge"
        headline="The creator platform India deserved."
        highlight="creator platform"
        sub="Communities, courses, workshops, payments. One app. No plugins. Built India-first by Sattvah Labs."
        ctas={[
          { label: "Visit forge.sattvah.ai", href: siteConfig.forgeUrl },
          { label: "Talk to us", href: "/contact" },
        ]}
        fine="Bootstrapped, in private beta. Onboarding new creators weekly."
      />

      <WhatItIs />
      <FeatureGrid />
      <Cta />
    </>
  );
}

function WhatItIs() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl">
      <Reveal>
        <Badge variant="outline" className="mb-6">
          What it is
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          A <GradientWord>TagMango-grade</GradientWord> tool that does not charge a TagMango bill.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            Indian creators were the last to be served by the global
            creator economy and the first to be priced out of the tools.
            Forge brings the operating layer back to ground level.
          </p>
          <p>
            Run your paid community, sell a course, host a workshop, and
            take payments in rupees, all from one dashboard. Your
            audience does not bounce between apps. Your money does not
            sit in escrow for two weeks.
          </p>
          <p>
            Forge sits on top of the same Sattvah Labs primitives
            (community, memory, payments, AI co-pilot) that power our
            consumer wellness app. The plumbing is the same. The door is
            different.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      icon: Users,
      title: "Paid communities",
      body: "Members, tiers, broadcasts, comments. Native. Not Discord with a paywall.",
    },
    {
      icon: Layers,
      title: "Courses + workshops",
      body: "Drip-release modules, recorded or live. Mux video included. No CDN bill.",
    },
    {
      icon: Coins,
      title: "Payments in rupees",
      body: "Razorpay native. UPI, cards, subscriptions, coupons. Settle in 24 hours.",
    },
    {
      icon: Video,
      title: "Live + recorded workshops",
      body: "Sell a Saturday morning workshop, deliver it, and ship the replay, in the same app.",
    },
    {
      icon: Sparkles,
      title: "AI co-pilot",
      body: "Draft a broadcast, summarize a thread, suggest a course outline. Optional, never noisy.",
    },
    {
      icon: ArrowRight,
      title: "Storefront on your handle",
      body: "Your buyers land at forge.sattvah.ai/c/<your-handle>, an SEO-clean public storefront.",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              What is in the box
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Six things, one <GradientWord>app</GradientWord>.
            </h2>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15">
                <f.icon className="h-5 w-5 text-accent mb-4" />
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{f.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          Forge is <GradientWord>live</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-7 text-foreground/65 leading-relaxed">
          Visit forge.sattvah.ai to set up your storefront, or write to the
          founder and we will onboard you ourselves.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={siteConfig.forgeUrl}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12",
            )}
          >
            Open Forge
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 h-12",
            )}
          >
            Talk to the founder
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
