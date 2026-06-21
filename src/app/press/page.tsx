import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, Image as ImageIcon, Mail, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Press kit",
  description:
    "Logos, founder photos, fact sheet, and quotable lines for Sattvah Labs Pvt Ltd. Contact press@sattvah.ai.",
  alternates: { canonical: `${siteConfig.url}/press` },
  openGraph: {
    title: "Sattvah Labs press kit",
    description:
      "Logos, founder photos, fact sheet, and quotable lines. Contact press@sattvah.ai.",
    url: `${siteConfig.url}/press`,
    type: "website",
  },
};

export default function PressPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Press"
        headline="The Sattvah Labs press kit."
        highlight="press"
        sub="Logos, founder photos, fact sheet, quotable lines, and a single human to email."
        ctas={[
          { label: "Email press@", href: "mailto:press@sattvah.ai" },
          { label: "Download all", href: "/press/sattvah-press-kit.zip" },
        ]}
      />

      <FastFactsSection />
      <DownloadsSection />
      <QuotablesSection />
      <ContactSection />
    </>
  );
}

function FastFactsSection() {
  const facts = [
    { label: "Company", value: "Sattvah Labs Private Limited" },
    { label: "Founded", value: "2026" },
    { label: "Headquarters", value: "Bangalore, India" },
    { label: "Founder + CEO", value: "Mano" },
    { label: "First product", value: "Sattvah (consumer wellness app)" },
    { label: "Second product", value: "Sattvah for coaches (B2B SaaS)" },
    { label: "Funding", value: "Bootstrapped" },
    { label: "Team size", value: "1 (founder, building in public)" },
    { label: "Platform stack", value: "Go on AWS, Next.js, React Native" },
    { label: "Investor contact", value: "mano@sattvah.ai" },
  ];
  return (
    <section className="container py-20 md:py-28 max-w-4xl">
      <Reveal>
        <Badge variant="outline" className="mb-6">
          Fast facts
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          The <GradientWord>numbers</GradientWord> you need.
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-10 rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 md:p-9">
          <dl className="grid gap-5 md:grid-cols-2 text-sm md:text-base">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-foreground/55 mb-0.5">{f.label}</dt>
                <dd className="font-medium text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

function DownloadsSection() {
  const items = [
    {
      icon: ImageIcon,
      title: "Sattvah logo pack",
      sub: "SVG + PNG, light and dark backgrounds.",
      href: "/press/sattvah-logos.zip",
    },
    {
      icon: ImageIcon,
      title: "Sattvah Labs logo pack",
      sub: "SVG + PNG, light and dark.",
      href: "/press/sattvah-labs-logos.zip",
    },
    {
      icon: User,
      title: "Founder photos",
      sub: "Mano, three poses, web and print resolution.",
      href: "/press/mano-photos.zip",
    },
    {
      icon: FileText,
      title: "Fact sheet (PDF)",
      sub: "Two pages, everything on this page in print form.",
      href: "/press/sattvah-fact-sheet.pdf",
    },
    {
      icon: ImageIcon,
      title: "Product screenshots",
      sub: "Consumer app + coach admin, latest build.",
      href: "/press/sattvah-screenshots.zip",
    },
    {
      icon: Download,
      title: "Everything, one zip",
      sub: "All the above bundled. ~45 MB.",
      href: "/press/sattvah-press-kit.zip",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              Downloads
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Take what you <GradientWord>need</GradientWord>.
            </h2>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <StaggerItem key={it.title}>
              <a
                href={it.href}
                className="block rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15"
              >
                <it.icon className="h-5 w-5 text-accent mb-4" />
                <h3 className="font-semibold mb-1">{it.title}</h3>
                <p className="text-sm text-foreground/65">{it.sub}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-xs text-foreground/55">
          Some assets are placeholders until the press kit ships in
          early July. Email{" "}
          <a
            href="mailto:press@sattvah.ai"
            className="underline underline-offset-4"
          >
            press@sattvah.ai
          </a>{" "}
          if you need a specific file sooner.
        </p>
      </div>
    </section>
  );
}

function QuotablesSection() {
  const quotes = [
    "We are building the operating layer wellness needed: community, memory, payments, and AI co-pilot in one app.",
    "India has one psychiatrist per 100,000 people. Phones are everywhere. The same tools that brought the rest of the internet here can bring this.",
    "Most heavy days are not a crisis. They are a Tuesday. A Tuesday still deserves company.",
    "Coaches are the most underserved professionals in India. We want them to keep their practice and offload the plumbing.",
  ];
  return (
    <section className="container py-20 md:py-28 max-w-4xl">
      <div className="mb-10">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            Quotables
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            Lines from the <GradientWord>founder</GradientWord>.
          </h2>
        </Reveal>
      </div>
      <Stagger className="space-y-4">
        {quotes.map((q) => (
          <StaggerItem key={q}>
            <blockquote className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 md:p-7 text-lg md:text-xl leading-relaxed text-foreground/85">
              {q}
            </blockquote>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            One human, <GradientWord>one inbox</GradientWord>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 text-foreground/65 leading-relaxed">
            Press queries land with Mano. We reply within a working day.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="mailto:press@sattvah.ai"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-8 h-12",
              )}
            >
              <Mail className="h-4 w-4" /> press@sattvah.ai
            </Link>
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
      </div>
    </section>
  );
}
