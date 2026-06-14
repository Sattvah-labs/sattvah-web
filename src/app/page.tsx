import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Calendar,
  Code2,
  Heart,
  Lock,
  MessageSquare,
  Mic,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Waves,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Crisis />
      <Pillars />
      <Engine />
      <Builtforscale />
      <CarePromise />
      <FinalCTA />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────
// HERO — the entire page lives or dies on the first 600px
// ────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-aurora bg-aurora-animated">
      {/* Soft top fade so the header reads cleanly */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />

      <div className="container relative z-10 pt-20 md:pt-28 lg:pt-36 pb-24 md:pb-32 text-center">
        <Badge
          variant="accent"
          className="mb-7 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
        >
          Early access · Building from India · For the world
        </Badge>

        <h1 className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-semibold leading-[0.95] tracking-[-0.03em]">
          The listening layer
          <br />
          of the <span className="relative whitespace-nowrap">
            internet
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-2 h-3 md:h-4 bg-accent/40 -z-0 rounded-sm"
            />
          </span>.
        </h1>

        {/* "Let's talk." — under the title, big, prominent */}
        <p className="mt-9 md:mt-12 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          Let&rsquo;s talk.
        </p>

        <p className="mt-8 text-balance text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Sattvah is emotional infrastructure for a billion people. An AI that
          listens and remembers. Humans who care. A community that holds you.
          Built for the 2 AM moments when the world feels too loud.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="#engine"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-7 h-12 text-base"
            )}
          >
            See how it works
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={siteConfig.iosAppUrl}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-7 h-12 text-base"
            )}
          >
            Get early access
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          No ads. No selling your story. Anonymous by default.
        </p>
      </div>

      {/* Floating proof chips — three soft cards that hint at depth without
          dominating the hero. */}
      <div className="container relative z-10 pb-20 md:pb-28 hidden md:grid grid-cols-3 gap-4 max-w-5xl">
        <ProofChip
          icon={Waves}
          title="Live in 30 seconds"
          body="Open the app. Type what's on your mind. Sattvah listens — no forms, no questionnaires."
        />
        <ProofChip
          icon={Brain}
          title="Remembers you"
          body="Cross-session memory means you never start over. Picks up where you left off, weeks later."
          className="float-slow"
        />
        <ProofChip
          icon={ShieldCheck}
          title="Crisis-aware"
          body="Deterministic safety floor catches what AI guesses miss. Surfaces real help, real fast."
          className="float-slower"
        />
      </div>
    </section>
  );
}

function ProofChip({
  icon: Icon,
  title,
  body,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-5 text-left shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-foreground/70" />
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// CRISIS — the why. Stat-driven, brutal numbers, India-first framing.
// ────────────────────────────────────────────────────────────────────────

function Crisis() {
  return (
    <section className="relative border-y border-border/50 bg-secondary/40 py-20 md:py-28">
      <div className="container max-w-5xl">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-5">
            The crisis
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
            India is hurting in silence.{" "}
            <span className="text-muted-foreground">We&rsquo;re building so it doesn&rsquo;t have to.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          <StatTile value="197M" sub="Indians with mental-health needs" />
          <StatTile value="70-92%" sub="Never get any support at all" />
          <StatTile value="₹2,000" sub="A single therapy session — for most, out of reach" />
          <StatTile value="< 1" sub="Mental health professionals per 100K people" />
        </div>

        <p className="mt-12 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Stigma. Cost. Access. None of these are AI problems. But the answer
          starts with someone — or something — that listens without judgment,
          at 2 AM, in your language, every single time you come back. That
          piece, we can build. We are.
        </p>
      </div>
    </section>
  );
}

function StatTile({ value, sub }: { value: string; sub: string }) {
  return (
    <div className="border-l-2 border-accent pl-5">
      <div className="stat-num text-4xl md:text-5xl font-semibold tracking-tight">
        {value}
      </div>
      <div className="mt-2 text-sm text-muted-foreground leading-snug">{sub}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// PILLARS — what we're building. Bento grid, 6 surfaces.
// ────────────────────────────────────────────────────────────────────────

function Pillars() {
  return (
    <section id="product" className="container py-24 md:py-32">
      <div className="max-w-3xl mb-14 md:mb-16">
        <Badge variant="outline" className="mb-5">
          The product
        </Badge>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
          One place. Six surfaces.{" "}
          <span className="text-muted-foreground">Every way to be heard.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sattvah isn&rsquo;t one feature. It&rsquo;s the listening layer
          underneath everything you need when life is heavy.
        </p>
      </div>

      {/* Bento grid — asymmetric, premium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Big tile — AI listener */}
        <BentoTile
          className="md:col-span-2 md:row-span-2"
          icon={MessageSquare}
          eyebrow="The Listener"
          title="An AI that hears the nuance you'd miss in yourself."
          body="Tell it 'I got the promotion but I'm dreading telling my partner.' It doesn't collapse you to 'mixed.' It catches torn, anxious-proud — and replies like a person who's actually with you."
          tags={["Free-text emotion", "Valence + arousal", "Trajectory arc", "Cross-session memory"]}
          tall
        />

        <BentoTile
          icon={Users}
          eyebrow="The Community"
          title="Peer support that doesn't doomscroll."
          body="Anonymous posts, topic-classified, no like-as-currency, moderated with care."
        />

        <BentoTile
          icon={Heart}
          eyebrow="Mood"
          title="Track your inner weather."
          body="Daily check-ins. See your patterns. Activity correlations. Slow, honest data — not productivity theater."
        />

        <BentoTile
          icon={Calendar}
          eyebrow="The Experts"
          title="Real humans, one tap away."
          body="Vetted listeners across grief, burnout, queer identity, relationships, neurodivergence. Book a session in 30 seconds."
          tags={["Calendar sync", "Reminders", "Bookings in INR"]}
        />

        <BentoTile
          icon={Video}
          eyebrow="Sessions"
          title="Video calls that feel human."
          body="In-app video calls with your expert. End-to-end encrypted. No third-party Zoom links. No awkward downloads."
        />

        <BentoTile
          icon={Lock}
          eyebrow="Incognito"
          title="The hardest things, with zero trace."
          body="Pure-ephemeral mode. No DB writes. No memory. Nothing recoverable. For the conversations you couldn't have anywhere else."
        />
      </div>
    </section>
  );
}

function BentoTile({
  icon: Icon,
  eyebrow,
  title,
  body,
  tags,
  className,
  tall,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  className?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card p-7 md:p-8 transition-all",
        "hover:border-foreground/20 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)]",
        tall && "md:min-h-[440px] flex flex-col",
        className
      )}
    >
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{eyebrow}</span>
      </div>
      <h3
        className={cn(
          "mt-4 font-semibold tracking-tight text-balance",
          tall ? "text-3xl md:text-4xl leading-[1.1]" : "text-xl md:text-2xl leading-snug"
        )}
      >
        {title}
      </h3>
      <p className="mt-4 text-muted-foreground leading-relaxed flex-1">{body}</p>
      {tags && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// ENGINE — technical depth. Three layered pillars.
// ────────────────────────────────────────────────────────────────────────

function Engine() {
  return (
    <section
      id="engine"
      className="relative border-t border-border/50 bg-secondary/30 py-24 md:py-32"
    >
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14 md:mb-16">
          <Badge variant="outline" className="mb-5">
            The engine
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
            Most AI chat is a wrapper.{" "}
            <span className="text-muted-foreground">Sattvah is an engine.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            By the time we call the model, we already know what you feel, what
            we remember about you, and whether you&rsquo;re safe. Three pillars
            that compound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <EnginePillar
            stage="01"
            icon={Mic}
            title="Listens"
            sub="Per-turn affect detection"
            bullets={[
              "Free-text emotion label, not a 6-bucket enum",
              "Valence + intensity + arousal numeric signal",
              "Intent + topic classification on every message",
              "Sub-200ms safety scan before the model speaks",
            ]}
          />
          <EnginePillar
            stage="02"
            icon={Brain}
            title="Remembers"
            sub="Long-term memory that compounds"
            bullets={[
              "Semantic recall via pgvector (1536-dim embeddings)",
              "Rolling summary every N turns — auto-refreshed",
              "Trajectory arc: improving / spiraling / stuck / cycling",
              "Pure-ephemeral Incognito mode for the hardest turns",
            ]}
          />
          <EnginePillar
            stage="03"
            icon={Sparkles}
            title="Evolves"
            sub="Quality that improves with every conversation"
            bullets={[
              "Reply auto-graded across warmth, specificity, reflection",
              "Per-tenant persona, hot-swappable without redeploys",
              "Proprietary training corpus — competitors can't copy",
              "Deterministic safety floor; LLM is the backup, not the source",
            ]}
          />
        </div>

        {/* The tagline footer — the moat sentence */}
        <div className="mt-16 md:mt-20 rounded-3xl border border-border bg-card p-8 md:p-12 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl leading-snug tracking-tight text-center text-balance">
            Memory compounds switching cost. Safety is deterministic, not vibes.
            Persona is config, not fork. Built tenant-aware from day one —{" "}
            <span className="text-muted-foreground">
              the same engine that powers our app today is the SaaS API
              tomorrow, with no rewrite.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function EnginePillar({
  stage,
  icon: Icon,
  title,
  sub,
  bullets,
}: {
  stage: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 md:p-8 transition-all hover:border-foreground/20 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono-tight text-xs text-muted-foreground tracking-wider">
          {stage}
        </span>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
      <ul className="mt-6 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm leading-relaxed">
            <span className="mt-2 h-1 w-1 rounded-full bg-accent flex-none" />
            <span className="text-foreground/80">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// BUILT FOR SCALE — technical credibility. Dark band, code aesthetic.
// ────────────────────────────────────────────────────────────────────────

function Builtforscale() {
  return (
    <section className="relative bg-deep-slate text-white py-24 md:py-32 overflow-hidden">
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14 md:mb-16">
          <Badge
            variant="outline"
            className="mb-5 border-white/20 text-white/80 bg-white/5"
          >
            Built for scale
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
            Engineered to listen{" "}
            <span className="text-white/60">to a million people at once.</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Built on Go, scaled on AWS. Real-time WebSocket streaming.
            Multi-tenant from day one. Monitored, audited, ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ScaleCard
            icon={Code2}
            title="Built on Go"
            body="Static binary. Sub-millisecond cold start on Lambda. Hand-tuned for low-latency emotional inference."
            metrics={[
              ["p99 latency", "< 800ms end-to-end"],
              ["WebSocket fan-out", "Fargate cluster, auto-scaling"],
              ["Engine cost per turn", "< $0.0004"],
            ]}
          />
          <ScaleCard
            icon={Radio}
            title="Token-streamed AI"
            body="WebSocket gateway streams Claude tokens word-by-word. Users see thoughts forming, not waiting for a paragraph."
            metrics={[
              ["Streaming model", "Anthropic Claude (Sonnet, Haiku)"],
              ["Concurrent sessions", "Designed for 100k+"],
              ["TTFB on token", "~ 200ms"],
            ]}
          />
          <ScaleCard
            icon={Zap}
            title="DynamoDB tenant-prefixed"
            body="Single-table design with tenant-isolated partition keys. No cross-tenant reads, by physics. On-demand billing. GSI-driven recency queries."
            metrics={[
              ["Tables", "sattvah · sattvah-community · sattvah-master"],
              ["Hot-key throttling", "Provisioned headroom + back-off"],
              ["Backup", "PITR + RETAIN policy"],
            ]}
          />
          <ScaleCard
            icon={ShieldCheck}
            title="Observability + ops"
            body="Sentry on every Lambda. CloudWatch alarms wired to ops on-call. Audit log on every admin action. Designed to grow up cleanly."
            metrics={[
              ["Alarms armed", "7 critical, 0 silent"],
              ["Crash reporting", "Sentry, env-segmented"],
              ["Ops paging", "SNS → ops@sattvah.ai"],
            ]}
          />
        </div>

        {/* The stack — terminal aesthetic */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8 max-w-4xl mx-auto font-mono-tight">
          <div className="flex items-center gap-2 mb-4 text-white/40 text-xs">
            <span className="h-2 w-2 rounded-full bg-red-400/50" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/50" />
            <span className="h-2 w-2 rounded-full bg-green-400/50" />
            <span className="ml-3">stack.sattvah.ai</span>
          </div>
          <pre className="text-sm md:text-[15px] leading-relaxed text-white/80 whitespace-pre-wrap">
{`backend         → Go 1.26 · cmd/lambda · cmd/wsgateway
runtime         → AWS Lambda (provided.al2023, arm64) · ECS Fargate
data            → DynamoDB single-table (tenant-prefixed) + pgvector
streaming       → API Gateway HTTP API · NLB → wsgateway
auth            → Cognito User Pool + JWT + custom email sender Lambda
ai              → Anthropic Claude (streaming) + OpenAI embeddings
mobile          → Expo / React Native · iOS + Android
infra-as-code   → AWS CDK (TypeScript) · 10 stacks · cross-region cert
observability   → Sentry · CloudWatch · 7 alarms armed`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function ScaleCard({
  icon: Icon,
  title,
  body,
  metrics,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  metrics: [string, string][];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <Icon className="h-5 w-5 text-white/80" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-white/70 leading-relaxed">{body}</p>
      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5">
        {metrics.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 text-sm">
            <span className="text-white/50">{k}</span>
            <span className="font-mono-tight text-white/85 text-right">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// CARE — trust + safety. Quiet, after the technical band.
// ────────────────────────────────────────────────────────────────────────

function CarePromise() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Safety as a product",
      body: "Deterministic crisis-language scan before the model ever sees your message. Localized crisis lines. Never silent.",
    },
    {
      icon: Lock,
      title: "Anonymous by default",
      body: "No phone number required. Incognito mode for the conversations you can't have anywhere else.",
    },
    {
      icon: Heart,
      title: "Built in India, for India first",
      body: "Hindi + Tamil + Bengali safety on the roadmap. Indian crisis hotlines. INR pricing. Made for the culture you live in.",
    },
  ];
  return (
    <section className="container py-24 md:py-32 max-w-6xl">
      <div className="max-w-3xl mb-14 md:mb-16">
        <Badge variant="outline" className="mb-5">
          Built with care
        </Badge>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
          We&rsquo;re holding people in their hardest hours.{" "}
          <span className="text-muted-foreground">We treat that seriously.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {points.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border p-7 md:p-8 bg-card"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
              <p.icon className="h-5 w-5 text-foreground/70" />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────
// FINAL CTA — the ask. Brief, beautiful, decisive.
// ────────────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/50 bg-aurora bg-aurora-animated py-24 md:py-36">
      <div className="container max-w-3xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          We&rsquo;re building something
          <br />
          that didn&rsquo;t exist before.
        </h2>
        <p className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
          The infrastructure for emotional support — at the scale of a billion
          people. India first. Then the world. Be one of the first to use it.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={siteConfig.iosAppUrl}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-7 h-12 text-base"
            )}
          >
            Get early access
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-7 h-12 text-base"
            )}
          >
            Why we&rsquo;re building this
          </Link>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Questions? <Link href="mailto:mano@sattvah.ai" className="underline underline-offset-4 hover:text-foreground">mano@sattvah.ai</Link>
        </p>
      </div>
    </section>
  );
}
