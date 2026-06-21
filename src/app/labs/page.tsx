import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileText,
  Globe2,
  Mail,
  Mic,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sattvah Labs",
  description:
    "The company behind Sattvah. We build the operating layer for wellness coaches and the people they serve. Headquartered in Bangalore, India.",
  alternates: { canonical: `${siteConfig.url}/labs` },
  openGraph: {
    title: "Sattvah Labs, the operating layer for wellness.",
    description:
      "We build software that helps wellness coaches run their practice and helps everyone else feel a little less alone.",
    url: `${siteConfig.url}/labs`,
    type: "website",
  },
};

export default function LabsPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Sattvah Labs Pvt Ltd"
        headline="We build the operating layer wellness needed."
        highlight="operating layer"
        sub="A small team in India, building software that helps coaches run their practice and helps everyone else feel a little less alone."
        ctas={[
          { label: "Press kit", href: "/press" },
          { label: "Talk to us", href: "mailto:mano@sattvah.ai" },
        ]}
      />

      <MissionSection />
      <ProductsSection />
      <FounderSection />
      <ContactSection />
    </>
  );
}

function MissionSection() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl">
      <Reveal>
        <Badge variant="outline" className="mb-6">
          What we are building toward
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          The places people go for <GradientWord>support</GradientWord> deserve better software.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            India has one psychiatrist per 100,000 people and a wellness
            economy that runs on WhatsApp screenshots. The people doing
            the most important work, yoga teachers, sleep coaches, sober
            companions, breathwork guides, are held together by tools
            built for selling courses.
          </p>
          <p>
            Sattvah Labs builds the layer that should have existed all
            along. Community plus memory plus payments plus a thoughtful
            AI co-pilot, in one app. Coaches keep their practice; we
            handle the plumbing.
          </p>
          <p>
            Sattvah, our first product, is also our showcase. It is the
            consumer side of the same platform. A friend in your phone for
            the moments you need someone, built on top of the very same
            community, memory, and payments primitives we sell to coaches.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function ProductsSection() {
  const products = [
    {
      icon: Mic,
      name: "Sattvah",
      url: "https://sattvah.ai",
      tagline: "A friend in your phone, for the late hours.",
      body: "Our consumer wellness app. Talk, journal, find an expert. Anonymous by default.",
    },
    {
      icon: Building2,
      name: "Sattvah for coaches",
      url: "/coaches",
      tagline: "The operating layer for wellness practices.",
      body: "What coaches use to run their practice on top of our platform. From Rs 0 / month.",
    },
    {
      icon: Globe2,
      name: "Sattvah white-label",
      url: "/coaches#pricing",
      tagline: "Your own brand, our infrastructure.",
      body: "Run your coaching brand at your.com on our backend. Growth tier and up.",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              Products
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              One platform, three <GradientWord>doors</GradientWord>.
            </h2>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p) => (
            <StaggerItem key={p.name}>
              <Link
                href={p.url}
                className="block rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15"
              >
                <p.icon className="h-6 w-6 text-foreground/70 mb-5" />
                <h3 className="font-semibold tracking-tight text-foreground mb-1">
                  {p.name}
                </h3>
                <p className="text-sm font-medium text-foreground/75 mb-3">
                  {p.tagline}
                </p>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {p.body}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="container py-20 md:py-28 max-w-3xl">
      <Reveal>
        <Badge variant="outline" className="mb-6">
          The founder
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
          Built by <GradientWord>one person</GradientWord>. By design.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            Mano is the founder and CEO of Sattvah Labs. Engineer by trade,
            former senior engineering lead. Built and shipped consumer
            apps used by millions before starting Sattvah in 2026.
          </p>
          <p>
            One person, no funding, writing the code and the words. The
            wager: a product about being heard is best built by someone
            who has the time to listen.
          </p>
          <p>
            Reach the founder at{" "}
            <a
              href="mailto:mano@sattvah.ai"
              className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
            >
              mano@sattvah.ai
            </a>
            . Every email gets a reply.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.24}>
        <Link
          href="/founder"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-8",
          )}
        >
          Read the founder letter
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function ContactSection() {
  const cards = [
    {
      icon: Mail,
      label: "General",
      value: "mano@sattvah.ai",
      href: "mailto:mano@sattvah.ai",
    },
    {
      icon: FileText,
      label: "Press",
      value: "press@sattvah.ai",
      href: "mailto:press@sattvah.ai",
    },
    {
      icon: ShieldCheck,
      label: "Trust + security",
      value: "Read the Trust Center",
      href: "/trust",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <Badge variant="outline" className="mb-6">
              Contact
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
              Reach the <GradientWord>right person</GradientWord>.
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)]"
            >
              <c.icon className="h-5 w-5 text-accent mb-4" />
              <h3 className="font-semibold mb-1">{c.label}</h3>
              <p className="text-sm text-foreground/65">{c.value}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7">
          <h3 className="font-semibold tracking-tight mb-3">
            Corporate details
          </h3>
          <dl className="grid gap-3 md:grid-cols-2 text-sm text-foreground/75">
            <div>
              <dt className="text-foreground/55">Legal name</dt>
              <dd>Sattvah Labs Private Limited</dd>
            </div>
            <div>
              <dt className="text-foreground/55">Registered office</dt>
              <dd>Bangalore, Karnataka, India</dd>
            </div>
            <div>
              <dt className="text-foreground/55">Authorized signatory</dt>
              <dd>Mano (Founder + CEO)</dd>
            </div>
            <div>
              <dt className="text-foreground/55">Year founded</dt>
              <dd>2026</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
