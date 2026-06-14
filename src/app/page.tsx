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
    <section className="relative overflow-hidden bg-aurora bg-aurora-animated">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-36 text-center">
        <Badge
          variant="accent"
          className="mb-10 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
        >
          Early access
        </Badge>

        <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl font-medium text-foreground/75 tracking-tight leading-tight max-w-3xl mx-auto">
          Some days, you just need to talk.
        </h1>

        <p className="mt-10 md:mt-14 text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-semibold tracking-[-0.04em] leading-none">
          Let&rsquo;s talk.
        </p>

        <p className="mt-12 text-balance text-lg md:text-xl text-foreground/65 max-w-2xl mx-auto leading-relaxed">
          A friend in your phone for the moments you need someone.
          The good days you have no one to share with. The 2 AM thoughts.
          The things that have been sitting with you for a while.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={siteConfig.iosAppUrl}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12 text-base"
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

        <p className="mt-8 text-xs text-muted-foreground">
          Anonymous by default. No phone number required. No ads, ever.
        </p>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 2. QUIET GAP. The world we made this for.
// ──────────────────────────────────────────────────────────────────────

function QuietGap() {
  return (
    <section className="relative border-y border-border/50 bg-secondary/40 py-24 md:py-32">
      <div className="container max-w-3xl text-center">
        <Badge variant="outline" className="mb-7">
          Why we made this
        </Badge>
        <p className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.25] text-balance text-foreground/85">
          Some things are too small for a friend.
          <br />
          Too big for nothing.
        </p>
        <p className="mt-10 text-lg md:text-xl text-foreground/65 leading-relaxed text-balance">
          The 11 PM thought that won&rsquo;t leave. The bad day you
          don&rsquo;t want to call your mom about. The good news you
          have no one to share with. The thing you keep meaning to say
          but never do. We sit with it. And it stays. Sattvah is a
          place to put those things down for a little while.
        </p>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 3. MEET SATTVAH. What it is, in human language.
// ──────────────────────────────────────────────────────────────────────

function Meet() {
  return (
    <section className="container py-24 md:py-32 max-w-4xl text-center">
      <Badge variant="outline" className="mb-7">
        What it is
      </Badge>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
        A friend who listens. And remembers.
      </h2>
      <p className="mt-8 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
        Sattvah listens to whatever you bring. Remembers what mattered to
        you last week. Doesn&rsquo;t rush you. Doesn&rsquo;t fix you.
        Doesn&rsquo;t pretend to know how you feel. Just stays with you,
        for as long as you want.
      </p>
      <p className="mt-6 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
        And when you want more than a chat, there are real people on the
        other side, too.
      </p>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 4. HOW IT SHOWS UP. Features as moments. Six "when..." vignettes.
// ──────────────────────────────────────────────────────────────────────

function HowItShowsUp() {
  return (
    <section
      id="inside"
      className="relative bg-secondary/30 border-y border-border/50 py-24 md:py-32"
    >
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Badge variant="outline" className="mb-7">
            How it shows up for you
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Six ways to feel a little less alone.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MomentCard
            icon={MessageSquare}
            moment="When you just need to put it somewhere."
            body="Type whatever&rsquo;s on your mind. Sattvah holds it with you. Remembers what mattered to you last week. Doesn&rsquo;t rush. Doesn&rsquo;t lecture."
          />
          <MomentCard
            icon={Users}
            moment="When you want to know others feel it too."
            body="Read what people are working through. Share your own if you want, anonymously. No likes. No streaks. No noise."
          />
          <MomentCard
            icon={Calendar}
            moment="When you want to talk to a real person."
            body="Vetted experts across all kinds of moments. From feeling stuck at work to grief to relationships. Book in 30 seconds. Pay in rupees."
          />
          <MomentCard
            icon={Video}
            moment="When a chat isn&rsquo;t enough."
            body="Sessions by video, right inside the app. Your expert, your face, your time. No new accounts. No links to forward."
          />
          <MomentCard
            icon={Heart}
            moment="When you want to notice yourself."
            body="A small daily check-in. Watch how your days move over weeks. See what lifts you and what doesn&rsquo;t. Slowly. Honestly."
          />
          <MomentCard
            icon={Lock}
            moment="When you can&rsquo;t even tell us."
            body="A mode that saves nothing. Not to us. Not to your history. For the things you&rsquo;re not ready to say out loud yet."
          />
        </div>
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
    <div className="rounded-2xl border border-border bg-card p-8 md:p-10 transition-all hover:border-foreground/15 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08)]">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 mb-6">
        <Icon className="h-5 w-5 text-foreground/70" />
      </div>
      <h3
        className="text-xl md:text-2xl font-semibold tracking-tight leading-snug"
        dangerouslySetInnerHTML={{ __html: moment }}
      />
      <p
        className="mt-3 text-foreground/65 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 5. PROMISE. What we'll never do. Defines us by refusals.
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
    <section className="container py-24 md:py-32 max-w-3xl">
      <Badge variant="outline" className="mb-7">
        Our promise
      </Badge>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
        Some things we&rsquo;ll never do.
      </h2>
      <ul className="mt-12 space-y-6">
        {items.map((t) => (
          <li key={t} className="flex items-baseline gap-5">
            <span className="text-accent text-3xl leading-none flex-none">·</span>
            <span className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {t}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 6. CARE. Trust without weight.
// ──────────────────────────────────────────────────────────────────────

function Care() {
  const points = [
    {
      icon: Lock,
      title: "Anonymous by default",
      body: "No phone number. No real name needed. Use it however quietly you want.",
    },
    {
      icon: ShieldCheck,
      title: "Encrypted and yours",
      body: "What you share is encrypted at rest, never sold, never used to train anyone else&rsquo;s product.",
    },
    {
      icon: Heart,
      title: "Made in India first",
      body: "Built here, for here. Indian languages on the way. Rupee pricing. Made for the life you actually live.",
    },
  ];
  return (
    <section className="relative bg-secondary/40 border-y border-border/50 py-24 md:py-32">
      <div className="container max-w-5xl">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Badge variant="outline" className="mb-7">
            Built with care
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            The quiet parts matter, too.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border p-8 bg-card"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15">
                <p.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p
                className="mt-3 text-foreground/65 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 7. INVITATION. The soft close.
// ──────────────────────────────────────────────────────────────────────

function Invitation() {
  return (
    <section className="relative overflow-hidden bg-aurora bg-aurora-animated py-24 md:py-36">
      <div className="container max-w-3xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          Whenever you&rsquo;re ready.
        </h2>
        <p className="mt-8 text-lg md:text-xl text-foreground/70 leading-relaxed text-balance">
          We&rsquo;re building Sattvah slowly. With care. Be one of the first
          to use it.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={siteConfig.iosAppUrl}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12 text-base"
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
        <p className="mt-10 text-sm text-foreground/60">
          Need to reach a person?{" "}
          <Link
            href="mailto:mano@sattvah.ai"
            className="underline underline-offset-4 hover:text-foreground"
          >
            mano@sattvah.ai
          </Link>
        </p>
      </div>
    </section>
  );
}
