"use client";

/**
 * FAQ accordion. Uses native <details> so it works without JS and degrades
 * gracefully on print. The "use client" directive is here only to allow
 * the per-section animation on toggle.
 */
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/80 backdrop-blur">
      {items.map((it) => (
        <details
          key={it.q}
          className="group px-6 md:px-8 py-5 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
            <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
              {it.q}
            </h3>
            <ChevronDown className="h-5 w-5 mt-0.5 text-foreground/60 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-foreground/75 max-w-prose">
            {it.a}
          </p>
        </details>
      ))}
    </div>
  );
}
