import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Globe,
  GraduationCap,
  ShieldCheck,
  Star,
} from "lucide-react";

import { DeepLinkButton } from "@/components/deep-link-button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getExpert } from "@/lib/api";

// Static export — same as community/posts/[id]: seed one placeholder ID
// to satisfy Next 14's `output: 'export'` requirement. Swap for a real
// fetch once the experts catalog is seeded.
export const dynamic = "force-static";
export const dynamicParams = false;
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const expert = await getExpert(params.id);
  if (!expert) return { title: "Expert not found" };
  const description =
    expert.headline ||
    (expert.bio ? expert.bio.slice(0, 160) : `Book a session with ${expert.name} on Sattvah.`);
  return {
    title: expert.name,
    description,
    openGraph: {
      type: "profile",
      title: `${expert.name} — Sattvah expert`,
      description,
    },
  };
}

export default async function ExpertProfilePage({ params }: Params) {
  const expert = await getExpert(params.id);
  if (!expert) notFound();

  const priceLabel =
    expert.pricePerSession != null
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: expert.currency || "INR",
          maximumFractionDigits: 0,
        }).format(expert.pricePerSession)
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: expert.name,
    description: expert.bio || expert.headline,
    image: expert.avatarUrl || undefined,
    jobTitle: expert.headline,
    knowsLanguage: expert.languages,
    knowsAbout: expert.categories,
  };

  return (
    <article className="container max-w-4xl py-12 md:py-16">
      <Link
        href="/experts"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        All experts
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <header className="flex items-start gap-5">
            <Avatar src={expert.avatarUrl} name={expert.name} size={88} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {expert.name}
                </h1>
                {expert.verified ? (
                  <Badge variant="verified" className="gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                ) : null}
              </div>
              {expert.headline ? (
                <p className="mt-1 text-lg text-muted-foreground">{expert.headline}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                {expert.ratingAverage ? (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-warm text-amber-warm" />
                    {expert.ratingAverage.toFixed(1)}{" "}
                    <span className="text-muted-foreground/70">
                      ({expert.ratingCount ?? 0} ratings)
                    </span>
                  </span>
                ) : null}
                {expert.yearsExperience ? (
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4" />
                    {expert.yearsExperience}+ years
                  </span>
                ) : null}
                {expert.languages && expert.languages.length ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    {expert.languages.join(", ")}
                  </span>
                ) : null}
              </div>
            </div>
          </header>

          {expert.categories && expert.categories.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {expert.categories.map((c) => (
                <Badge key={c} variant="accent">{c}</Badge>
              ))}
            </div>
          ) : null}

          {expert.bio ? (
            <section className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">About</h2>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-foreground/90">
                {expert.bio}
              </p>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Session
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {priceLabel ? `${priceLabel}` : "Pricing in the app"}
                </p>
                {priceLabel ? (
                  <p className="text-xs text-muted-foreground mt-0.5">per session</p>
                ) : null}
              </div>
              <DeepLinkButton
                path={`experts/${expert.id}/book`}
                label="Book on the app"
                className="w-full"
                size="lg"
              />
              <p className="text-xs text-muted-foreground text-center">
                Booking + chat happen in Sattvah for iOS &amp; Android.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
