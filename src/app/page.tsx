import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe2,
  Heart,
  Mic,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HeroOrbs, BreathingDot } from "@/components/hero-orbs";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { GradientWord } from "@/components/gradient-word";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

// sattvah.ai homepage: the Sattvah Labs corporate brand. The consumer
// wellness app marketing has moved to wells.sattvah.ai (a tenant on the
// Sattvah Labs platform). Forge, the creator platform, lives at
// forge.sattvah.ai. This page introduces the parent company and routes
// visitors to the right door.

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Products />
      <Pillars />
      <Trust />
      <Invitation />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroOrbs />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-36 text-center">
        <Reveal>
          <Badge
            variant="accent"
            className="mb-10 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
          >
            Sattvah Labs Pvt Ltd
          </Badge>
        </Reveal>

        <WordReveal
          as="h1"
          baseDelayMs={150}
          perWordMs={70}
          className="text-balance text-3xl sm:text-4xl md:text-5xl font-medium text-foreground/75 tracking-tight leading-tight max-w-3xl mx-auto block"
        >
          We build calm software for <GradientWord>India</GradientWord>.
        </WordReveal>

        <Reveal delay={0.45}>
          <p className="mt-10 md:mt-14 text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-semibold tracking-[-0.04em] leading-none">
            Sattvah <GradientWord>Labs</GradientWord>.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <BreathingDot />
        </Reveal>

        <Reveal delay={0.65}>
          <p className="mt-6 text-balance text-lg md:text-xl text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            We build the operating layer for wellness and creators, and the
            apps that sit on top. One platform. Many doors. Made slowly, in
            India.
          </p>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products/sattvah"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow"
              )}
            >
              See our products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/labs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8 h-12 text-base"
              )}
            >
              Read our story
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.52}>
          <p className="mt-8 text-xs text-muted-foreground">
            Bootstrapped, India-based, building in public.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <Badge variant="outline" className="mb-7">
            Why we are here
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.25] text-balance text-foreground/85">
            The places people go for support deserve better software.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-10 text-lg md:text-xl text-foreground/65 leading-relaxed text-balance">
            India has one psychiatrist per 100,000 people and a wellness
            economy that runs on WhatsApp screenshots. Yoga teachers,
            sleep coaches, breathwork guides, sober companions: the people
            doing the most important work, held together by tools built
            for selling courses. We build the layer that should have
            existed all along. Community, memory, payments, and a
            thoughtful AI co-pilot, in one platform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    {
      icon: Sparkles,
      name: "Forge",
      tagline: "The creator monetization platform.",
      body: "Communities, courses, workshops, payments. Built for India-first creators who want a TagMango-grade tool that does not charge a TagMango bill.",
      href: "/products/forge",
      ext: siteConfig.forgeUrl,
    },
    {
      icon: Heart,
      name: "Sattvah",
      tagline: "A friend in your phone, for the late hours.",
      body: "Our consumer wellness app. Talk it out, journal, find an expert. Anonymous by default. The first tenant on the Sattvah Labs platform.",
      href: "/products/sattvah",
      ext: siteConfig.wellsUrl,
    },
    {
      icon: Building2,
      name: "Sattvah for coaches",
      tagline: "The operating layer for wellness practices.",
      body: "What coaches use to run their practice on top of our platform. Community, bookings, billing, AI co-pilot. From Rs 0 / month.",
      href: "/products/sattvah",
      ext: `${siteConfig.wellsUrl}/coaches`,
    },
  ];
  return (
    <section className="container py-24 md:py-32 max-w-6xl" id="products">
      <div className="mb-12 max-w-2xl">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            Products
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            One platform, many <GradientWord>doors</GradientWord>.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-foreground/65 leading-relaxed">
            Everything we ship sits on top of the same primitives: community,
            memory, payments, and AI. Pick the door that fits.
          </p>
        </Reveal>
      </div>
      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <StaggerItem key={p.name}>
            <Link
              href={p.href}
              className="group block rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15"
            >
              <p.icon className="h-6 w-6 text-accent mb-5" />
              <h3 className="font-semibold tracking-tight text-foreground mb-1">
                {p.name}
              </h3>
              <p className="text-sm font-medium text-foreground/75 mb-3">
                {p.tagline}
              </p>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {p.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs text-foreground/55 group-hover:text-foreground transition-colors">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      icon: Globe2,
      title: "India-first, always",
      body: "Made for the life you actually live. Indian languages, rupee pricing, UPI, slow-internet friendly.",
    },
    {
      icon: Users,
      title: "Built by one person",
      body: "One engineer. No funding round to please. Every line of code, every line of copy, the same person.",
    },
    {
      icon: ShieldCheck,
      title: "Calm by default",
      body: "No streaks. No badges. No productivity theater. The software should leave you lighter than it found you.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-5xl">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <Badge variant="outline" className="mb-7">
              How we build
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Three things we will <GradientWord>not</GradientWord> compromise.
            </h2>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group rounded-2xl border border-border/60 p-8 bg-card/80 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 transition-transform duration-500 group-hover:scale-110">
                  <p.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-foreground/65 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="container py-24 md:py-32 max-w-3xl text-center">
      <Reveal>
        <Badge variant="outline" className="mb-7">
          For partners + press
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          A company you can <GradientWord>verify</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-7 text-lg text-foreground/65 leading-relaxed">
          Sattvah Labs Private Limited is registered in Bangalore,
          Karnataka. We publish a Trust Center, a press kit, and the
          founder&rsquo;s email. Everything we ship is auditable.
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/trust"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12 text-base"
            )}
          >
            Trust Center
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/press"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 h-12 text-base"
            )}
          >
            Press kit
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function Invitation() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <HeroOrbs />
      <div className="container max-w-3xl text-center relative z-10">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
            <GradientWord>Whenever</GradientWord> you are ready.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
            Pick a door. Or write to the founder directly. Every email gets
            a reply.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={siteConfig.wellsUrl}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow"
              )}
            >
              <Mic className="h-4 w-4" /> Try Sattvah
            </a>
            <a
              href={siteConfig.forgeUrl}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8 h-12 text-base"
              )}
            >
              <Sparkles className="h-4 w-4" /> See Forge
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-10 text-sm text-foreground/60">
            Or reach the founder:{" "}
            <Link
              href="mailto:mano@sattvah.ai"
              className="underline underline-offset-4 hover:text-foreground"
            >
              mano@sattvah.ai
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
