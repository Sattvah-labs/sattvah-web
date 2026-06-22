/**
 * Pricing table for the coach B2B page. Three tiers, locked
 * 2026-06-21. Rendered server-side, no client JS required.
 */
import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PricingTier = {
  name: string;
  setup: string;
  monthly: string;
  commission: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const DEFAULT_TIERS: PricingTier[] = [
  {
    name: "Sattvah Free",
    setup: "Rs 0",
    monthly: "Rs 0",
    commission: "12%",
    tagline: "Start without a credit card. Pay only when your clients do.",
    features: [
      "Community + memory + payments",
      "Unlimited clients",
      "WhatsApp + email reminders",
      "Sattvah AI co-pilot included",
      "Weekly payout via Razorpay Route",
    ],
    cta: { label: "Start free", href: "/signup?intent=coach&plan=free" },
  },
  {
    name: "Sattvah Pro",
    setup: "Rs 0",
    monthly: "Rs 4,000 + GST",
    commission: "5%",
    tagline: "The plan most coaches land on once they cross 25 clients.",
    features: [
      "Everything in Free",
      "Custom landing page at sattvah.ai/c/<your-handle>",
      "Branded WhatsApp templates",
      "Live Zoom sessions inside the app",
      "Coach Brief: weekly client summaries",
      "Priority support",
    ],
    cta: { label: "Choose Pro", href: "/signup?intent=coach&plan=pro" },
    featured: true,
  },
  {
    name: "Sattvah Growth",
    setup: "Rs 0",
    monthly: "Rs 12,000 + GST",
    commission: "2%",
    tagline: "For practices with 100+ active clients across plans.",
    features: [
      "Everything in Pro",
      "Multi-language community in 10 Indian languages",
      "Custom domain (your.com)",
      "Team seats: add up to 5 assistants",
      "Quarterly strategy call with Sattvah Labs",
      "Dedicated success manager",
    ],
    cta: { label: "Choose Growth", href: "/signup?intent=coach&plan=growth" },
  },
];

export function PricingTable({ tiers = DEFAULT_TIERS }: { tiers?: PricingTier[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={cn(
            "relative rounded-2xl border p-8 bg-card/80 backdrop-blur flex flex-col",
            t.featured
              ? "border-accent/60 shadow-[0_24px_60px_-20px_hsl(36_92%_58%/0.35)]"
              : "border-border/60",
          )}
        >
          {t.featured ? (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-accent-foreground">
              Most picked
            </span>
          ) : null}

          <h3 className="text-2xl font-semibold tracking-tight">{t.name}</h3>
          <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
            {t.tagline}
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">
              {t.monthly}
            </span>
            <span className="text-sm text-foreground/55">/ month</span>
          </div>
          <p className="mt-1 text-xs text-foreground/55">
            Setup {t.setup}. Commission {t.commission} on gross client revenue.
          </p>

          <ul className="mt-7 space-y-3 text-sm text-foreground/80 leading-relaxed flex-1">
            {t.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href={t.cta.href}
            className={cn(
              buttonVariants({
                variant: t.featured ? "default" : "outline",
                size: "lg",
              }),
              "mt-8 w-full justify-center",
            )}
          >
            {t.cta.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
