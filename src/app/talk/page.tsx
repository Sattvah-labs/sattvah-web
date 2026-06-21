import type { Metadata } from "next";

import { TalkShell } from "./talk-shell";

export const metadata: Metadata = {
  title: "Talk",
  description:
    "Tap once. Talk it out. Sattvah listens, replies, and keeps your conversation with you.",
  // /talk is a private app surface; don't surface it in search.
  robots: { index: false, follow: false },
  // Apple touch icon + maskable hint live in the manifest; meta-tags are
  // optional on Chrome but iOS Safari still reads these.
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sattvah",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

/**
 * /talk
 *
 * Server component shell. All interactivity (mic, magic-link form,
 * deep-link banner, service worker registration) is inside the
 * <TalkShell /> client island so the static export can ship a real HTML
 * skeleton that paints before any JS executes. WCAG AA contrast on every
 * text node. prefers-reduced-motion is respected globally via
 * globals.css.
 */
export default function TalkPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="container max-w-2xl py-10 md:py-14">
        <TalkShell />
      </div>
    </div>
  );
}
