/**
 * White-label coach landing at sattvah.ai/c/[handle].
 *
 * Pre-rendered at build time for every coach in MOCK_COACHES (and any
 * coach the live API returns when the build runs). Each coach gets a
 * dedicated HTML file in the static export.
 *
 * The "Powered by Sattvah Labs" footer is conditional on the
 * `parentLabsAttribution` flag from the API. Sattvah's own tenant
 * defaults that to false; every coach tenant defaults true.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Calendar, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { HeroOrbs } from "@/components/hero-orbs";
import { PoweredBy } from "@/components/powered-by";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import {
  MOCK_COACHES,
  fetchCoach,
  languageLabels,
  planLabel,
  specialtyLabel,
} from "@/lib/coaches";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { params: { handle: string } };

export async function generateStaticParams(): Promise<{ handle: string }[]> {
  return MOCK_COACHES.map((c) => ({ handle: c.handle }));
}

// We only ship the static handles bundled at build. Anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const coach = await fetchCoach(params.handle);
  if (!coach) return { title: "Coach" };
  const title = `${coach.name}, ${specialtyLabel(coach.specialty)} coach`;
  const description = coach.bio;
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/c/${coach.handle}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/c/${coach.handle}`,
      type: "profile",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function CoachLandingPage({ params }: Props) {
  const coach = await fetchCoach(params.handle);
  if (!coach) notFound();

  const langs = languageLabels(coach.language);
  const inrFormat = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  });

  return (
    <>
      <CoachHero coach={coach} langs={langs} />
      <AboutSection coach={coach} />
      <PlansSection coach={coach} inrFormat={inrFormat} />
      <BookSection coach={coach} />
      <PoweredBy show={coach.parentLabsAttribution} />
    </>
  );
}

function CoachHero({
  coach,
  langs,
}: {
  coach: Awaited<ReturnType<typeof fetchCoach>> & object;
  langs: string[];
}) {
  const initials = coach.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="relative overflow-hidden">
      <HeroOrbs />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <Reveal>
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-[#A88AFB] via-[#C97CD9] to-[#F47AA0] flex items-center justify-center text-white font-semibold text-5xl md:text-6xl shadow-[0_24px_60px_-20px_hsl(258_80%_50%/0.4)] mx-auto md:mx-0">
              {initials}
            </div>
          </Reveal>

          <div className="text-center md:text-left">
            <Reveal delay={0.1}>
              <Badge
                variant="accent"
                className="mb-4 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
              >
                {specialtyLabel(coach.specialty)} coach
              </Badge>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
                {coach.name}
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 text-base md:text-lg text-foreground/65 leading-relaxed max-w-xl mx-auto md:mx-0">
                {coach.bio}
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline" className="gap-1.5">
                  <MapPin className="h-3 w-3" /> {coach.city}
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Users className="h-3 w-3" /> {coach.clients} active clients
                </Badge>
                <Badge variant="verified" className="gap-1.5">
                  <BadgeCheck className="h-3 w-3" /> Verified by Sattvah
                </Badge>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center md:justify-start">
                {langs.map((l) => (
                  <Badge key={l} variant="secondary" className="text-[11px]">
                    {l}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  href="#plans"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)]",
                  )}
                >
                  See plans
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`mailto:hello@sattvah.ai?subject=Intro%20to%20${encodeURIComponent(coach.name)}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "px-8 h-12 text-base",
                  )}
                >
                  Send a note first
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({
  coach,
}: {
  coach: Awaited<ReturnType<typeof fetchCoach>> & object;
}) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-3xl">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            How {coach.name.split(" ")[0]} works
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Slow, <GradientWord>steady</GradientWord>, and built around you.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6">
              <Calendar className="h-5 w-5 text-accent mb-3" />
              <h3 className="font-semibold mb-1.5">Weekly check-ins</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                A short video call every week. Between calls, a diary
                you fill in two minutes a day.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6">
              <Users className="h-5 w-5 text-accent mb-3" />
              <h3 className="font-semibold mb-1.5">A small community</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {coach.clients} people on the same path. Anonymous, kind,
                quiet by design.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6">
              <BadgeCheck className="h-5 w-5 text-accent mb-3" />
              <h3 className="font-semibold mb-1.5">Cancel anytime</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                Month-to-month. No lock-in. Pause when life happens.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlansSection({
  coach,
  inrFormat,
}: {
  coach: Awaited<ReturnType<typeof fetchCoach>> & object;
  inrFormat: Intl.NumberFormat;
}) {
  const baseMonthly = coach.pricePerMonthInr;
  const quarterly = Math.round(baseMonthly * 3 * 0.9);
  const yearly = Math.round(baseMonthly * 12 * 0.8);

  const plans = [
    {
      label: "Monthly",
      price: `Rs ${inrFormat.format(baseMonthly)}`,
      cadence: "billed monthly",
      sub: "Easiest way to try.",
      cta: `https://admin.sattvah.ai/checkout?coach=${coach.handle}&plan=monthly`,
    },
    {
      label: "Quarterly",
      price: `Rs ${inrFormat.format(quarterly)}`,
      cadence: "every 3 months",
      sub: "Save 10%. Most clients pick this.",
      featured: true,
      cta: `https://admin.sattvah.ai/checkout?coach=${coach.handle}&plan=quarterly`,
    },
    {
      label: "Yearly",
      price: `Rs ${inrFormat.format(yearly)}`,
      cadence: "once a year",
      sub: "Save 20%. Best for habit work.",
      cta: `https://admin.sattvah.ai/checkout?coach=${coach.handle}&plan=yearly`,
    },
  ];

  return (
    <section id="plans" className="container py-20 md:py-28">
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            Plans
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Three ways to <GradientWord>begin</GradientWord>.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-foreground/65 leading-relaxed text-balance">
            All plans include weekly sessions, daily diary, community
            access, and WhatsApp reminders.
          </p>
        </Reveal>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {plans.map((p) => (
          <StaggerItem key={p.label}>
            <div
              className={cn(
                "relative rounded-2xl border p-8 bg-card/80 backdrop-blur flex flex-col h-full",
                p.featured
                  ? "border-accent/60 shadow-[0_24px_60px_-20px_hsl(36_92%_58%/0.35)]"
                  : "border-border/60",
              )}
            >
              {p.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-accent-foreground">
                  Most picked
                </span>
              ) : null}
              <h3 className="text-lg font-semibold tracking-tight">
                {p.label}
              </h3>
              <p className="mt-1.5 text-sm text-foreground/65">{p.sub}</p>
              <p className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
                {p.price}
              </p>
              <p className="text-xs text-foreground/55 mt-1">{p.cadence}</p>
              <Link
                href={p.cta}
                className={cn(
                  buttonVariants({
                    variant: p.featured ? "default" : "outline",
                    size: "lg",
                  }),
                  "mt-7 w-full justify-center",
                )}
              >
                Start with {p.label.toLowerCase()}
              </Link>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 text-center text-xs text-foreground/55">
        Payments handled by Razorpay. GST included. Refunds within 7 days,
        no questions asked.
      </p>
    </section>
  );
}

function BookSection({
  coach,
}: {
  coach: Awaited<ReturnType<typeof fetchCoach>> & object;
}) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Not <GradientWord>sure</GradientWord> yet?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-foreground/65 leading-relaxed text-balance">
            Book a 15-minute discovery call with {coach.name.split(" ")[0]}.
            Free. No commitment. Pick a time that works for you.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            href={`https://admin.sattvah.ai/book?coach=${coach.handle}`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "mt-8 px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)]",
            )}
          >
            Book a discovery call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 text-xs text-foreground/55">
            {planLabel(coach.plan)} member. Your data is handled per our{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacy policy
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
