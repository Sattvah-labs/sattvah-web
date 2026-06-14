import type { Metadata } from "next";
import Link from "next/link";

import { ExpertCard } from "@/components/expert-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getExperts } from "@/lib/api";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Find an expert",
  description:
    "Browse Sattvah&rsquo;s vetted listeners and counsellors. Filter by area — burnout, grief, relationships, identity, anxiety — and book a session inside the app.",
};

export const revalidate = 120;

const CATEGORIES = [
  "All",
  "Burnout",
  "Grief",
  "Relationships",
  "Anxiety",
  "Identity",
  "Career",
] as const;

interface Props {
  searchParams: { category?: string };
}

export default async function ExpertsPage({ searchParams }: Props) {
  const active = (searchParams.category || "All").trim();
  const experts = await getExperts(active === "All" ? undefined : active);

  return (
    <div className="container py-12 md:py-16">
      <header className="max-w-2xl mb-8">
        <Badge variant="outline" className="mb-3">Experts</Badge>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Vetted listeners, on your terms.
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Every expert is interviewed and reference-checked. Find someone whose
          background fits, then book inside the app.
        </p>
      </header>

      <nav aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const isActive = c === active || (c === "All" && !searchParams.category);
          const href = c === "All" ? "/experts" : `/experts?category=${encodeURIComponent(c)}`;
          return (
            <Link
              key={c}
              href={href}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground",
              )}
            >
              {c}
            </Link>
          );
        })}
      </nav>

      {experts.length === 0 ? (
        <Card className="max-w-xl">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-1">No experts to show yet.</h3>
            <p className="text-sm text-muted-foreground">
              Either no one&rsquo;s listed under this filter, or the directory couldn&rsquo;t load.
              Try another category or open the app for the latest.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experts.map((e) => (
            <li key={e.id}>
              <ExpertCard expert={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
