"use client";

import Link from "next/link";

type Tile = {
  href: string;
  label: string;
  hint: string;
  testId: string;
};

const TILES: Tile[] = [
  {
    href: "/talk/chat",
    label: "Talk to Sattvah",
    hint: "Type if you'd rather not speak.",
    testId: "tile-talk",
  },
  {
    href: "/talk/check-in",
    label: "How am I",
    hint: "A 30 second pulse check.",
    testId: "tile-check-in",
  },
  {
    href: "/talk/family",
    label: "Family",
    hint: "What loved ones shared with you.",
    testId: "tile-family",
  },
];

/**
 * Three big tiles below the mic for users who don't want to (or can't)
 * use voice. Each tile is at least 56px font, high contrast, no decorative
 * icons that fight with the text. Tap target is the entire card.
 */
export function FallbackTiles() {
  return (
    <ul
      role="list"
      data-testid="fallback-tiles"
      className="grid gap-4 md:gap-5 max-w-2xl mx-auto"
    >
      {TILES.map((t) => (
        <li key={t.href}>
          <Link
            href={t.href}
            data-testid={t.testId}
            className={[
              "block w-full rounded-2xl border-2 border-foreground/15 bg-card",
              "px-6 py-6 md:py-7 text-left",
              "hover:border-accent/60 focus-visible:border-accent focus:outline-none",
              "transition-colors",
            ].join(" ")}
          >
            <span
              className="block font-semibold leading-tight"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
            >
              {t.label}
            </span>
            <span className="block text-base md:text-lg text-foreground/65 mt-1">
              {t.hint}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
