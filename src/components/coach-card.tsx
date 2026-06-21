/**
 * Coach card, used on the /coaches B2B page as a "join these folks"
 * social-proof row and (later) on a directory index.
 */
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  type CoachProfile,
  languageLabels,
  specialtyLabel,
} from "@/lib/coaches";

export function CoachCard({ coach }: { coach: CoachProfile }) {
  const langs = languageLabels(coach.language);
  return (
    <Link
      href={`/c/${coach.handle}`}
      className="group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] hover:border-foreground/15 flex flex-col"
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#A88AFB] via-[#C97CD9] to-[#F47AA0] flex items-center justify-center text-white font-semibold text-lg shrink-0">
          {coach.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold tracking-tight text-foreground truncate">
            {coach.name}
          </h3>
          <p className="text-xs text-foreground/60 flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" />
            {coach.city}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground/75 line-clamp-3">
        {coach.bio}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="accent" className="text-[10px]">
          {specialtyLabel(coach.specialty)}
        </Badge>
        {langs.slice(0, 3).map((l) => (
          <Badge key={l} variant="outline" className="text-[10px]">
            {l}
          </Badge>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
        <span className="text-foreground/55">
          {coach.clients} active clients
        </span>
        <span className="inline-flex items-center gap-1 text-accent group-hover:gap-2 transition-all">
          View page <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
