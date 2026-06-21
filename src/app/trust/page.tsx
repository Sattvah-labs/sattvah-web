import type { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  FileText,
  KeyRound,
  Lock,
  MessageSquare,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "How Sattvah Labs Pvt Ltd handles your data. DPDPA-aligned. Encryption, retention, deletion, WhatsApp messaging policy.",
  alternates: { canonical: `${siteConfig.url}/trust` },
  openGraph: {
    title: "Sattvah Trust Center",
    description:
      "Our DPDPA-aligned approach to your data: encryption, retention, deletion, WhatsApp policy.",
    url: `${siteConfig.url}/trust`,
    type: "website",
  },
};

export default function TrustPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Trust Center"
        headline="Your data is yours. Everything else is on us."
        highlight="yours"
        sub="Sattvah Labs Pvt Ltd is the data fiduciary for everything on this platform. Here is what that means in practice."
        ctas={[
          { label: "Email DPO", href: "mailto:privacy@sattvah.ai" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <PillarsSection />
      <DpdpaSection />
      <MessagingSection />
      <DeletionSection />
      <ContactSection />
    </>
  );
}

function PillarsSection() {
  const pillars = [
    {
      icon: Lock,
      title: "Encrypted at rest",
      body: "Everything you write is encrypted with AES-256 in AWS Mumbai. Backups encrypted the same way.",
    },
    {
      icon: KeyRound,
      title: "Encrypted in transit",
      body: "TLS 1.3 everywhere. Certificate pinning on the mobile apps. HSTS preloaded on the web.",
    },
    {
      icon: Database,
      title: "Hosted in India",
      body: "Default region is ap-south-1 (Mumbai). Failover sits in ap-southeast-1 (Singapore). Nothing crosses borders DPDPA disallows.",
    },
    {
      icon: ShieldCheck,
      title: "No ads, no third-party trackers",
      body: "We do not run a Pixel, GA4, or any other surveillance script on this site or in the app.",
    },
    {
      icon: Trash2,
      title: "30-day deletion SLA",
      body: "Ask to delete and your data is removed from active systems within 30 days. Backups rotate out within 90.",
    },
    {
      icon: FileText,
      title: "DPDPA-aligned",
      body: "We comply with India's Digital Personal Data Protection Act, 2023, and update this page as the rules evolve.",
    },
  ];
  return (
    <section className="container py-20 md:py-28">
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            How we protect you
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Six things, always <GradientWord>true</GradientWord>.
          </h2>
        </Reveal>
      </div>
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map((p) => (
          <StaggerItem key={p.title}>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 h-full">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 mb-5">
                <p.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="font-semibold tracking-tight mb-2">{p.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {p.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function DpdpaSection() {
  const rights = [
    {
      title: "Right to access",
      body: "Ask us what we hold about you. We send a structured export within 7 working days.",
    },
    {
      title: "Right to correction",
      body: "Spotted a mistake? Edit it in Settings or write to us. We fix and confirm.",
    },
    {
      title: "Right to erasure",
      body: "Ask to be forgotten. We delete from active systems in 30 days, backups in 90.",
    },
    {
      title: "Right to grievance redressal",
      body: "Not happy with how we handled your data? Email our grievance officer at grievance@sattvah.ai.",
    },
    {
      title: "Right to nominate",
      body: "Name someone who can act on your behalf, helpful for elders and caregivers.",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-4xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              DPDPA, your rights
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              What you can ask <GradientWord>for</GradientWord>.
            </h2>
          </Reveal>
        </div>
        <Stagger className="space-y-4">
          {rights.map((r) => (
            <StaggerItem key={r.title}>
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 md:p-7">
                <h3 className="font-semibold tracking-tight mb-2">
                  {r.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{r.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function MessagingSection() {
  return (
    <section className="container py-20 md:py-28 max-w-4xl">
      <div className="mb-10">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            WhatsApp messaging
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            We text you for <GradientWord>good reasons</GradientWord>.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.16}>
        <p className="text-lg leading-relaxed text-foreground/75 mb-8 max-w-3xl">
          Sattvah sends WhatsApp messages only when you have opted in
          through a coach or signed up directly. Every message uses a
          Meta-approved utility template; we do not send promotional
          content via WhatsApp.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 md:p-8">
          <h3 className="font-semibold tracking-tight mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" /> Templates we use
          </h3>
          <ul className="space-y-3 text-sm text-foreground/75 leading-relaxed">
            <li>
              <strong>invite</strong> -- when you join a coach&rsquo;s
              community group.
            </li>
            <li>
              <strong>welcome</strong> -- once, after your first sign-in.
            </li>
            <li>
              <strong>renewal_warn</strong> -- 3 days before your
              subscription renews.
            </li>
            <li>
              <strong>expired</strong> -- when a subscription has ended,
              with a renewal link.
            </li>
            <li>
              <strong>payment_ok</strong> / <strong>payment_fail</strong>
              {" "}-- after a payment event.
            </li>
            <li>
              <strong>otp</strong> -- when you ask for one.
            </li>
            <li>
              <strong>coach_broadcast</strong> -- when your coach shares
              something new.
            </li>
            <li>
              <strong>win_back_7d</strong> / <strong>win_back_30d</strong>
              {" "}-- one and four weeks after you stop using the app, then
              never again.
            </li>
          </ul>
          <p className="mt-6 text-xs text-foreground/55">
            You can stop all messages at any time by replying STOP to any
            WhatsApp thread or by toggling notifications in Settings.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function DeletionSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            Account deletion
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Two ways to <GradientWord>leave</GradientWord>.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 grid gap-5 md:grid-cols-2 text-left">
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6">
              <h3 className="font-semibold mb-2">In the app</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Settings &rarr; Account &rarr; Delete account. We confirm
                via OTP and your data is gone in 30 days.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6">
              <h3 className="font-semibold mb-2">By email</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Write to{" "}
                <a
                  href="mailto:privacy@sattvah.ai"
                  className="underline underline-offset-4"
                >
                  privacy@sattvah.ai
                </a>{" "}
                from the address on your account. We confirm and delete
                within 30 days.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          Talk to a <GradientWord>person</GradientWord>.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-7 text-foreground/65 leading-relaxed text-balance">
          Privacy, security, deletion, anything else, we reply within
          seven working days.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="mailto:privacy@sattvah.ai"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-8 h-12",
            )}
          >
            privacy@sattvah.ai
          </Link>
          <Link
            href="mailto:grievance@sattvah.ai"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 h-12",
            )}
          >
            grievance@sattvah.ai
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
