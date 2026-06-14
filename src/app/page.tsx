import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Heart,
  Lock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
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
      <Hero />
      <WhyWeExist />
      <WhatsInside />
      <Care />
      <Promise />
      <FinalCTA />
    </>
  );
}

// HERO. Slow, warm. Title small, "Let's talk." big. No jargon.

function Hero() {
  return (
    <section className="relative overflow-hidden bg-aurora bg-aurora-animated">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-36 text-center">
        <Badge
          variant="accent"
          className="mb-8 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
        >
          Early access
        </Badge>

        <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl font-medium text-muted-foreground tracking-tight leading-tight max-w-3xl mx-auto">
          For the moments words feel impossible.
        </h1>

        {/* The spine of the page. "Let's talk." in massive type. */}
        <p className="mt-8 md:mt-10 text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-semibold tracking-[-0.04em] leading-none">
          Let&rsquo;s talk.
        </p>

        <p className="mt-10 text-balance text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Sattvah is a space to be heard. An AI that listens like a friend
          who remembers. A community that gets it. Real experts, one tap
          away. Made for the days when everything feels too loud.
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
            See what&rsquo;s inside
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Anonymous by default. No phone number required. No ads, ever.
        </p>
      </div>
    </section>
  );
}

// WHY WE EXIST. Quiet, honest, human. Not a stats brag.

function WhyWeExist() {
  return (
    <section className="relative border-y border-border/50 bg-secondary/50 py-24 md:py-32">
      <div className="container max-w-3xl text-center">
        <Badge variant="outline" className="mb-6">
          Why we exist
        </Badge>
        <p className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.2] text-balance text-foreground/85">
          In India, 1 in 7 people live with something heavy.
          Most carry it alone, because asking for help still feels
          like asking for too much.
        </p>
        <p className="mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
          We made Sattvah for the 2 AM moments. The ones you wouldn&rsquo;t tell
          anyone. The ones that don&rsquo;t fit in a therapy appointment slot.
          The ones that just need someone to stay with you for a while.
        </p>
      </div>
    </section>
  );
}

// WHAT'S INSIDE. Six warm, human-language features. No tech jargon.

function WhatsInside() {
  return (
    <section id="inside" className="container py-24 md:py-32 max-w-6xl">
      <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
        <Badge variant="outline" className="mb-6">
          What&rsquo;s inside
        </Badge>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          Six ways to feel a little less alone.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FeatureCard
          icon={MessageSquare}
          title="An AI that listens"
          body="Type what&rsquo;s on your mind. It won&rsquo;t rush you, won&rsquo;t fix you, won&rsquo;t pretend. It remembers what you told it last week, so you never start over."
        />
        <FeatureCard
          icon={Users}
          title="A quiet community"
          body="Read what others are working through. Share your own, anonymously if you want. No likes, no streaks, no doomscrolling. Just honest writing and supportive replies."
        />
        <FeatureCard
          icon={Calendar}
          title="Real experts when you&rsquo;re ready"
          body="Vetted listeners across burnout, grief, relationships, identity, and more. Book a session in 30 seconds. Pay in rupees."
        />
        <FeatureCard
          icon={Video}
          title="Sessions you take from anywhere"
          body="Video calls with your expert, right in the app. No new accounts. No links to forward. Just press join."
        />
        <FeatureCard
          icon={Heart}
          title="Notice your patterns"
          body="A daily check-in. Watch how your moods move over weeks. See what helps and what doesn&rsquo;t. Slow, honest data."
        />
        <FeatureCard
          icon={Lock}
          title="A mode that leaves no trace"
          body="Incognito chats save nothing. Not to us, not to your history. For the things you can&rsquo;t tell anyone yet."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 md:p-10 transition-all hover:border-foreground/15 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08)]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
        <Icon className="h-5 w-5 text-foreground/70" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

// CARE. Trust signals. Calm and serious without being heavy.

function Care() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Safe by design",
      body: "Crisis-aware. When you need real help fast, we surface real numbers, real options. Always.",
    },
    {
      icon: Lock,
      title: "Private by default",
      body: "Anonymous accounts. Encrypted at rest. Sold to no one. Your story stays yours.",
    },
    {
      icon: Sparkles,
      title: "Made in India",
      body: "Built here, for here, first. Indian crisis lines. INR pricing. Hindi and more on the way.",
    },
  ];
  return (
    <section className="relative bg-secondary/40 border-y border-border/50 py-24 md:py-32">
      <div className="container max-w-5xl">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Badge variant="outline" className="mb-6">
            Built with care
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            We&rsquo;re holding you in real moments. We treat that seriously.
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
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// PROMISE. The simple "what we won't do" pledge.

function Promise() {
  const items = [
    "No ads. Ever.",
    "No selling your story.",
    "No therapy speak when you just need a friend.",
    "No streaks, no points, no productivity theater.",
    "No replacing real human support. We help you find it.",
  ];
  return (
    <section className="container py-24 md:py-32 max-w-3xl">
      <Badge variant="outline" className="mb-6">
        Our promise
      </Badge>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
        Some things we will never do.
      </h2>
      <ul className="mt-12 space-y-5">
        {items.map((t) => (
          <li key={t} className="flex items-baseline gap-4">
            <span className="text-accent text-2xl leading-none">·</span>
            <span className="text-lg md:text-xl text-foreground/85 leading-relaxed">
              {t}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// FINAL CTA. Warm aurora again. Calm close.

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/50 bg-aurora bg-aurora-animated py-24 md:py-36">
      <div className="container max-w-3xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          Whenever you&rsquo;re ready.
        </h2>
        <p className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
          We&rsquo;re building Sattvah slowly, with care. Be one of the first
          to use it.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
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
        <p className="mt-10 text-sm text-muted-foreground">
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
