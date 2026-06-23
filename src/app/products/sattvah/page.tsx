import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Heart, Lock, MessageSquare, Users, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sattvah, the consumer wellness app",
  description:
    "Sattvah is the consumer wellness app from Sattvah Labs. A friend in your phone for the moments you need someone. Anonymous by default. Live at wells.sattvah.ai.",
  alternates: { canonical: `${siteConfig.url}/products/sattvah` },
  openGraph: {
    title: "Sattvah, by Sattvah Labs",
    description:
      "A friend in your phone for the moments you need someone. Anonymous by default.",
    url: `${siteConfig.url}/products/sattvah`,
    type: "website",
  },
};

export default function SattvahProductPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Product, Sattvah"
        headline="A friend in your phone, for the late hours."
        highlight="friend"
        sub="Sattvah is the consumer wellness app made by Sattvah Labs. Talk it out, journal, find an expert. Anonymous by default. Live at wells.sattvah.ai."
        ctas={[
          { label: "Visit wells.sattvah.ai", href: siteConfig.wellsUrl },
          { label: "For coaches", href: `${siteConfig.wellsUrl}/coaches` },
        ]}
        fine="Sattvah is the first tenant on the Sattvah Labs platform."
      />

      <Why />
      <Moments />
      <Cta />
    </>
  );
}

function Why() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl">
      <Reveal>
        <Badge variant="outline" className="mb-6">
          What it is
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          Some things are too small for a friend. Too big for <GradientWord>nothing</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            The 11 PM thought that will not leave. The bad day you do not
            want to call your mom about. The good news you have no one to
            share with. Sattvah is a place to put those things down for a
            little while.
          </p>
          <p>
            Anonymous by default. Encrypted at rest. Made in India first,
            for the life you actually live.
          </p>
          <p>
            When you want more than a chat, a vetted human expert is one
            tap away. From feeling stuck at work to grief to relationships.
            Book in 30 seconds. Pay in rupees.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Moments() {
  const moments = [
    { icon: MessageSquare, title: "Talk it out", body: "Type whatever is on your mind. Sattvah holds it with you." },
    { icon: Users, title: "Find your people", body: "Read what others are working through. Share, anonymously, if you want." },
    { icon: Calendar, title: "Book an expert", body: "Vetted humans across every kind of moment. 30-second booking." },
    { icon: Video, title: "Talk by video", body: "Sessions inside the app. No new accounts. No links to forward." },
    { icon: Heart, title: "Notice yourself", body: "A small daily check-in. Watch your weeks move." },
    { icon: Lock, title: "Quiet mode", body: "For the things you are not ready to say out loud yet." },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              How it shows up
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Six ways to feel a little <GradientWord>less alone</GradientWord>.
            </h2>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {moments.map((m) => (
            <StaggerItem key={m.title}>
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15">
                <m.icon className="h-5 w-5 text-accent mb-4" />
                <h3 className="font-semibold mb-1.5">{m.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{m.body}</p>
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
          Sattvah is at <GradientWord>wells.sattvah.ai</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-7 text-foreground/65 leading-relaxed">
          The full consumer experience, get the app, read the community,
          book an expert, lives on a dedicated subdomain.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={siteConfig.wellsUrl}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12",
            )}
          >
            Open Sattvah
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/labs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 h-12",
            )}
          >
            About Sattvah Labs
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
