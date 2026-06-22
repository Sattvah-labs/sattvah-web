import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Layers,
  MessageCircle,
  Repeat,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CoachCard } from "@/components/coach-card";
import { ComparisonTable } from "@/components/comparison-table";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { PricingTable } from "@/components/pricing-table";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { MOCK_COACHES } from "@/lib/coaches";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "For wellness coaches",
  description:
    "Run your coaching practice on the operating layer wellness needed. Community, memory, payments, AI co-pilot, WhatsApp. From Rs 0 a month.",
  alternates: { canonical: `${siteConfig.url}/coaches` },
  openGraph: {
    title: "Sattvah Labs for wellness coaches",
    description:
      "Run your coaching practice on the operating layer wellness needed. From Rs 0 a month.",
    url: `${siteConfig.url}/coaches`,
    type: "website",
  },
};

const FAQ: FaqItem[] = [
  {
    q: "Do I need any tech setup to start?",
    a: "No. Sign up at admin.sattvah.ai, add your bio and a price, and we generate your landing page at sattvah.ai/c/your-handle in under five minutes. We host the app, the community, the payment gateway, the WhatsApp templates, all of it.",
  },
  {
    q: "What does Sattvah AI actually do for me?",
    a: "Three things. It greets your clients in your voice when you are asleep. It writes you a Coach Brief every Monday summarising each client's week (mood, diary, what they want to talk about). And it answers the small questions, schedule, payment, where the recording is, so you do not have to.",
  },
  {
    q: "Is this only for coaches in India?",
    a: "We are built India-first. Rupee pricing, GST invoices, Razorpay payouts, 10 Indian languages on the client side. International coaches can use us today; we will add Stripe and USD pricing once we have a steady pipeline outside India.",
  },
  {
    q: "What happens to my client data if I leave Sattvah?",
    a: "Your clients' data is your clients' data, and yours. Export every chat, every diary entry, every payment record as CSV or JSON the day you ask. We delete our copies within 30 days unless DPDPA requires us to retain a record.",
  },
  {
    q: "How does the commission work?",
    a: "Free tier takes 12% of gross client revenue. Pro takes 5%. Growth takes 2%. Razorpay fees (~2%) sit inside the take on Free and Pro, additive on Growth. No setup fee on any tier.",
  },
  {
    q: "Will my brand show up, or yours?",
    a: "Your brand on the surfaces your clients see. A small 'Powered by Sattvah Labs' line in the footer of your landing page, the same way Shopify does. Custom domain (your.com) is available on Growth.",
  },
  {
    q: "Can I move my existing community over?",
    a: "Yes. We import WhatsApp group exports, Discord channels, and TagMango / Exly client lists in one go. Your clients get a single text with a magic link, they tap it, they are in.",
  },
  {
    q: "What support do I get?",
    a: "Free and Pro tiers get email support within one working day. Growth tier gets a Slack channel with the founder. Every coach gets a 20-minute onboarding call in their first week.",
  },
];

export default function CoachesPage() {
  return (
    <>
      <MarketingHero
        eyebrow="For wellness coaches"
        headline="Run your practice on the operating layer wellness needed."
        highlight="wellness"
        sub="Community, memory, payments, AI co-pilot, WhatsApp. One app for you and your clients. From Rs 0 a month."
        ctas={[
          { label: "Start free", href: "/signup?intent=coach" },
          { label: "See pricing", href: "#pricing" },
        ]}
        fine="No credit card. No setup fee. Twelve percent commission until you outgrow it."
      />

      <PainSection />
      <LoopSection />
      <PricingSection />
      <CoachWall />
      <ComparisonSection />
      <FaqSection items={FAQ} />
      <ClosingCta />
    </>
  );
}

// ---------- 1. PAIN ----------

function PainSection() {
  const pains = [
    {
      icon: Layers,
      title: "Your stack is eight tools held together by tape",
      body: "WhatsApp for chats. Google Forms for intake. Razorpay for invoices. Notion for clients. Calendly for sessions. Zoom for calls. Spreadsheet for retention. ChatGPT for prep. None of them talk to each other.",
    },
    {
      icon: AlertCircle,
      title: "You forget what your client said last week",
      body: "By session four you have 40 humans in your head and you are guessing. You ask the same question twice. The client notices.",
    },
    {
      icon: Repeat,
      title: "You spend Sundays chasing payments",
      body: "UPI screenshots in WhatsApp, half the renewals lapse, the other half need a personal nudge. You did not become a coach to be a collections agent.",
    },
    {
      icon: MessageCircle,
      title: "Your community lives somewhere you do not control",
      body: "When WhatsApp removes someone for a policy violation, your community goes with them. When Instagram tweaks the algorithm, your reach halves overnight.",
    },
  ];
  return (
    <section className="container py-24 md:py-32">
      <div className="max-w-3xl mb-14 text-center mx-auto">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            What you are dealing with
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            You are great at coaching. You are <GradientWord>tired</GradientWord> of the rest of it.
          </h2>
        </Reveal>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {pains.map((p) => (
          <StaggerItem key={p.title}>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-8 h-full">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 mb-5">
                <p.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
                {p.title}
              </h3>
              <p className="text-foreground/65 leading-relaxed">{p.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

// ---------- 2. THE LOOP ----------

function LoopSection() {
  const pillars = [
    {
      icon: MessageCircle,
      title: "Community",
      body: "A WhatsApp-quiet space where your clients hold each other up between your sessions. Threads stay on-topic because Sattvah moderates the noise.",
    },
    {
      icon: Brain,
      title: "Memory",
      body: "Every diary entry, every check-in, every chat is remembered. When you open a session, the last seven days are already loaded.",
    },
    {
      icon: Wallet,
      title: "Payments",
      body: "Razorpay Route in, UPI Autopay, weekly automatic payouts to your bank. GST invoices done. Renewals chased by us.",
    },
    {
      icon: Sparkles,
      title: "AI co-pilot",
      body: "Sattvah AI greets in your voice, answers small questions, and writes you a Coach Brief every Monday. You stay irreplaceable; we handle the leftovers.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              The loop
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Four things, one <GradientWord>loop</GradientWord>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg text-foreground/65 max-w-2xl mx-auto leading-relaxed text-balance">
              Each one feeds the next. Community surfaces what your clients
              are working through. Memory holds it. Payments keep the
              practice alive. AI gives you back your evenings.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 mb-5">
                  <p.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed text-sm">
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

// ---------- 3. PRICING ----------

function PricingSection() {
  return (
    <section id="pricing" className="container py-24 md:py-32">
      <div className="max-w-3xl mb-14 text-center mx-auto">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            Pricing
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Pay nothing until your <GradientWord>clients</GradientWord> do.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-lg text-foreground/65 max-w-2xl mx-auto leading-relaxed text-balance">
            Three tiers. No setup fee on any of them. Commission applies to
            gross client revenue and shrinks as you grow.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <PricingTable />
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-10 text-center text-xs text-foreground/55 max-w-xl mx-auto">
          Razorpay gateway fees (about 2 percent) are inside the commission
          take on Free and Pro. Additive on Growth. Weekly payouts every
          Tuesday via Razorpay Route.
        </p>
      </Reveal>
    </section>
  );
}

// ---------- 4. COACH WALL ----------

function CoachWall() {
  const coaches = MOCK_COACHES.slice(0, 6);
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              Coaches already on Sattvah
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              You are in <GradientWord>good company</GradientWord>.
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coaches.map((c) => (
            <StaggerItem key={c.id}>
              <CoachCard coach={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// ---------- 5. COMPARISON ----------

function ComparisonSection() {
  return (
    <section className="container py-24 md:py-32 max-w-5xl">
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            How we compare
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Sattvah vs the <GradientWord>course platforms</GradientWord>.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-foreground/65 leading-relaxed text-balance">
            Most of them sell you a course player. We sell you the place
            your clients actually live.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <ComparisonTable />
      </Reveal>
    </section>
  );
}

// ---------- 6. FAQ ----------

function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-3xl">
        <div className="mb-12 text-center">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              Questions
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Everything else, <GradientWord>asked and answered</GradientWord>.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}

// ---------- 7. CLOSING CTA ----------

function ClosingCta() {
  return (
    <section className="container py-24 md:py-32 max-w-3xl text-center">
      <Reveal>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          Move your <GradientWord>practice</GradientWord> in this week.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-7 text-lg text-foreground/65 leading-relaxed text-balance">
          Twenty minutes to set up. We will help you import your existing
          clients on the same call.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup?intent=coach"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12 text-base shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)]",
            )}
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="mailto:mano@sattvah.ai?subject=Sattvah%20Labs%20for%20coaches"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 h-12 text-base",
            )}
          >
            Talk to the founder
          </Link>
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <ul className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-7 justify-center text-sm text-foreground/65">
          <li className="flex items-center gap-2 justify-center">
            <CheckCircle2 className="h-4 w-4 text-accent" /> No setup fee
          </li>
          <li className="flex items-center gap-2 justify-center">
            <CheckCircle2 className="h-4 w-4 text-accent" /> Cancel anytime
          </li>
          <li className="flex items-center gap-2 justify-center">
            <CheckCircle2 className="h-4 w-4 text-accent" /> Your data is yours
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
