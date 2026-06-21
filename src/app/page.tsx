import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Heart,
  Lock,
  MessageSquare,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HeroOrbs, BreathingDot } from "@/components/hero-orbs";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { GradientWord } from "@/components/gradient-word";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <>
      <Recognition />
      <QuietGap />
      <Meet />
      <HowItShowsUp />
      <Promise />
      <Care />
      <Invitation />
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 1. RECOGNITION. Some days, you just need to talk. + Let's talk.
// ──────────────────────────────────────────────────────────────────────

function Recognition() {
  return (
    <section className="relative overflow-hidden">
      <HeroOrbs />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-24 md:pt-32 lg:pt-40 pb-28 md:pb-40 text-center">
        <Reveal>
          <Badge
            variant="accent"
            className="mb-10 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
          >
            Early access
          </Badge>
        </Reveal>

        <WordReveal
          as="h1"
          baseDelayMs={150}
          perWordMs={70}
          className="text-balance text-3xl sm:text-4xl md:text-5xl font-medium text-foreground/75 tracking-tight leading-tight max-w-3xl mx-auto block"
        >
          Some days, you just need to <GradientWord>talk</GradientWord>.
        </WordReveal>

        <Reveal delay={0.45}>
          <p className="mt-10 md:mt-14 text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-semibold tracking-[-0.04em] leading-none">
            Let&rsquo;s <GradientWord>talk</GradientWord>.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <BreathingDot />
        </Reveal>

        <Reveal delay={0.65}>
          <p className="mt-6 text-balance text-lg md:text-xl text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            A friend in your phone for the moments you need someone.
            The good days you have no one to share with. The thoughts you can&rsquo;t quiet.
            The things that have been sitting with you for a while.
          </p>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={siteConfig.iosAppUrl}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow"
              )}
            >
              Get early access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#inside"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8 h-12 text-base"
              )}
            >
              See what it&rsquo;s like
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.52}>
          <p className="mt-8 text-xs text-muted-foreground">
            Anonymous by default. No phone number required. No ads, ever.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 2. QUIET GAP. The world we made this for.
// ──────────────────────────────────────────────────────────────────────

function QuietGap() {
  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <Badge variant="outline" className="mb-7">
            Why we made this
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.25] text-balance text-foreground/85">
            Some things are too small for a friend.
            <br />
            Too big for nothing.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-10 text-lg md:text-xl text-foreground/65 leading-relaxed text-balance">
            The 11 PM thought that won&rsquo;t leave. The bad day you
            don&rsquo;t want to call your mom about. The good news you
            have no one to share with. The thing you keep meaning to say
            but never do. We sit with it. And it stays. Sattvah is a
            place to put those things down for a little while.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 3. MEET SATTVAH. What it is, in human language.
// ──────────────────────────────────────────────────────────────────────

function Meet() {
  return (
    <section className="container py-28 md:py-36 max-w-4xl text-center">
      <Reveal>
        <Badge variant="outline" className="mb-7">
          What it is
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          A friend who <GradientWord>listens</GradientWord>. And <GradientWord>remembers</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="mt-8 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
          Sattvah listens to whatever you bring. Remembers what mattered to
          you last week. Doesn&rsquo;t rush you. Doesn&rsquo;t fix you.
          Doesn&rsquo;t pretend to know how you feel. Just stays with you,
          for as long as you want.
        </p>
      </Reveal>
      <Reveal delay={0.28}>
        <p className="mt-6 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
          And when you want more than a chat, there are real people on the
          other side, too.
        </p>
      </Reveal>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 4. HOW IT SHOWS UP. Features as moments. Six "when..." vignettes.
// ──────────────────────────────────────────────────────────────────────

function HowItShowsUp() {
  const moments = [
    { icon: MessageSquare, moment: "When you just need to put it somewhere.", body: "Type whatever\u2019s on your mind. Sattvah holds it with you. Remembers what mattered to you last week. Doesn\u2019t rush. Doesn\u2019t lecture." },
    { icon: Users, moment: "When you want to know others feel it too.", body: "Read what people are working through. Share your own if you want, anonymously. No likes. No streaks. No noise." },
    { icon: Calendar, moment: "When you want to talk to a real person.", body: "Vetted experts across all kinds of moments. From feeling stuck at work to grief to relationships. Book in 30 seconds. Pay in rupees." },
    { icon: Video, moment: "When a chat isn\u2019t enough.", body: "Sessions by video, right inside the app. Your expert, your face, your time. No new accounts. No links to forward." },
    { icon: Heart, moment: "When you want to notice yourself.", body: "A small daily check-in. Watch how your days move over weeks. See what lifts you and what doesn\u2019t. Slowly. Honestly." },
    { icon: Lock, moment: "When you can\u2019t even tell us.", body: "A mode that saves nothing. Not to us. Not to your history. For the things you\u2019re not ready to say out loud yet." },
  ];
  return (
    <section
      id="inside"
      className="relative py-28 md:py-36 bg-gradient-to-b from-background via-secondary/40 to-background"
    >
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <Badge variant="outline" className="mb-7">
              How it shows up for you
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Six ways to feel a little <GradientWord>less alone</GradientWord>.
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {moments.map((m) => (
            <StaggerItem key={m.moment}>
              <MomentCard icon={m.icon} moment={m.moment} body={m.body} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function MomentCard({
  icon: Icon,
  moment,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  moment: string;
  body: string;
}) {
  return (
    <div className="moment-card group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-8 md:p-10 transition-all duration-500 hover:border-foreground/15 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 group-hover:opacity-100 group-hover:from-accent/5 group-hover:to-transparent transition-opacity duration-500" />
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/25">
        <Icon className="h-5 w-5 text-foreground/70" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">
        {moment}
      </h3>
      <p className="mt-3 text-foreground/65 leading-relaxed">
        {body}
      </p>
      <span className="accent-line" aria-hidden />
      <ArrowRight
        className="accent-arrow absolute right-8 bottom-6 h-4 w-4 text-foreground/50"
        aria-hidden
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 5. PROMISE. What we'll never do.
// ──────────────────────────────────────────────────────────────────────

function Promise() {
  const items = [
    "No ads. Ever.",
    "No selling your story.",
    "No therapy speak when you just want a friend.",
    "No streaks, no badges, no productivity theater.",
    "No replacing real human support. We help you find it when you need it.",
  ];
  return (
    <section className="container py-28 md:py-36 max-w-3xl">
      <Reveal>
        <Badge variant="outline" className="mb-7">
          Our promise
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          Some things we&rsquo;ll <GradientWord>never</GradientWord> do.
        </h2>
      </Reveal>
      <Stagger className="mt-12 space-y-6" staggerChildren={0.06}>
        {items.map((t) => (
          <StaggerItem key={t}>
            <div className="flex items-baseline gap-5">
              <span className="text-accent text-3xl leading-none flex-none">·</span>
              <span className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                {t}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 6. CARE. Trust without weight.
// ──────────────────────────────────────────────────────────────────────

function Care() {
  const points = [
    { icon: Lock, title: "Anonymous by default", body: "No phone number. No real name needed. Use it however quietly you want." },
    { icon: ShieldCheck, title: "Encrypted and yours", body: "What you share is encrypted at rest, never sold, never used to train anyone else\u2019s product." },
    { icon: Heart, title: "Made in India first", body: "Built here, for here. Indian languages on the way. Rupee pricing. Made for the life you actually live." },
  ];
  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-5xl">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <Badge variant="outline" className="mb-7">
              Built with care
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              The <GradientWord>quiet parts</GradientWord> matter, too.
            </h2>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((p) => (
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

// ──────────────────────────────────────────────────────────────────────
// 7. INVITATION. The soft close.
// ──────────────────────────────────────────────────────────────────────

function Invitation() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <HeroOrbs />
      <div className="container max-w-3xl text-center relative z-10">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
            <GradientWord>Whenever</GradientWord> you&rsquo;re ready.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
            We&rsquo;re building Sattvah slowly. With care. Be one of the first
            to use it.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={siteConfig.iosAppUrl}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow"
              )}
            >
              Get early access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8 h-12 text-base"
              )}
            >
              Read our story
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-10 text-sm text-foreground/60">
            Need to reach a person?{" "}
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
