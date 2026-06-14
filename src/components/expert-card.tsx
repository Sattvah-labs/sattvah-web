import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Expert } from "@/lib/api";
import { truncate } from "@/lib/utils";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link href={`/experts/${expert.id}`} className="block group">
      <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_8px_rgba(15,23,42,0.05),0_24px_48px_-20px_rgba(15,23,42,0.18)]">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start gap-4">
            <Avatar src={expert.avatarUrl} name={expert.name} size={56} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold leading-tight truncate">{expert.name}</h3>
                {expert.verified ? (
                  <ShieldCheck className="h-4 w-4 text-[hsl(150_18%_42%)]" aria-label="Verified" />
                ) : null}
              </div>
              {expert.headline ? (
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {expert.headline}
                </p>
              ) : null}
            </div>
          </div>

          {expert.bio ? (
            <p className="text-sm text-foreground/80 leading-relaxed">
              {truncate(expert.bio, 160)}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-1.5">
            {(expert.categories ?? []).slice(0, 3).map((c) => (
              <Badge key={c} variant="secondary" className="text-xs">
                {c}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            {expert.ratingAverage ? (
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-warm text-amber-warm" />
                {expert.ratingAverage.toFixed(1)}
                <span className="text-muted-foreground/70">
                  ({expert.ratingCount ?? 0})
                </span>
              </span>
            ) : null}
            {expert.yearsExperience ? (
              <span>{expert.yearsExperience}+ yrs experience</span>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
