import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FileText, HeartHandshake, Mail, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientWord } from "@/components/gradient-word";
import { MarketingHero } from "@/components/marketing-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach Sattvah Labs Pvt Ltd. The founder reads every email. Press, partnerships, support, security, all routed here.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact Sattvah Labs",
    description: "How to reach Sattvah Labs Pvt Ltd. The founder reads every email.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Contact"
        headline="Reach the right person."
        highlight="right"
        sub="One human, one inbox per topic. The founder reads everything. Every email gets a reply."
      />

      <Cards />
      <Corporate />
    </>
  );
}

function Cards() {
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
      icon: Briefcase,
      label: "Partnerships",
      value: "mano@sattvah.ai",
      href: "mailto:mano@sattvah.ai",
    },
    {
      icon: HeartHandshake,
      label: "Support (Sattvah app)",
      value: "Live on wells.sattvah.ai",
      href: `${siteConfig.wellsUrl}/help`,
    },
    {
      icon: ShieldCheck,
      label: "Security disclosures",
      value: "security@sattvah.ai",
      href: "mailto:security@sattvah.ai",
    },
    {
      icon: Briefcase,
      label: "Creator inquiries (Forge)",
      value: "forge.sattvah.ai",
      href: siteConfig.forgeUrl,
    },
  ];
  return (
    <section className="container py-20 md:py-28 max-w-5xl">
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            By topic
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            One <GradientWord>inbox</GradientWord> per door.
          </h2>
        </Reveal>
      </div>
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <StaggerItem key={c.label}>
            <Link
              href={c.href}
              className="block rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15"
            >
              <c.icon className="h-5 w-5 text-accent mb-4" />
              <h3 className="font-semibold mb-1">{c.label}</h3>
              <p className="text-sm text-foreground/65">{c.value}</p>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Corporate() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="container max-w-3xl">
        <Reveal>
          <Badge variant="outline" className="mb-6">
            Corporate
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
            For the <GradientWord>paperwork</GradientWord>.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-7 md:p-9">
            <dl className="grid gap-5 md:grid-cols-2 text-sm md:text-base">
              <div>
                <dt className="text-foreground/55 mb-0.5">Legal name</dt>
                <dd className="font-medium text-foreground">Sattvah Labs Private Limited</dd>
              </div>
              <div>
                <dt className="text-foreground/55 mb-0.5">Registered office</dt>
                <dd className="font-medium text-foreground">Bangalore, Karnataka, India</dd>
              </div>
              <div>
                <dt className="text-foreground/55 mb-0.5">Authorized signatory</dt>
                <dd className="font-medium text-foreground">Mano (Founder + CEO)</dd>
              </div>
              <div>
                <dt className="text-foreground/55 mb-0.5">Year founded</dt>
                <dd className="font-medium text-foreground">2026</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/trust"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "px-8 h-12")}
            >
              Trust Center
            </Link>
            <Link
              href="/press"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8 h-12")}
            >
              Press kit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
