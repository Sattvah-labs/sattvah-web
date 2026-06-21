"use client";

import { useEffect, useState } from "react";

/**
 * Reads `?source=wa&content=<id>` off the URL and renders a contextual
 * welcome message when the user landed here from a forwarded WhatsApp
 * link. Client component so it can read window.location without breaking
 * the static export.
 */
export function DeepLinkBanner() {
  const [source, setSource] = useState<string | null>(null);
  const [contentId, setContentId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const s = p.get("source");
    const c = p.get("content");
    if (s) setSource(s);
    if (c) setContentId(c);
  }, []);

  if (source !== "wa") return null;

  return (
    <div
      role="region"
      aria-label="Shared with you"
      data-testid="deep-link-banner"
      className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-center"
    >
      <p className="text-base md:text-lg font-medium">
        Your loved one shared this with you.
      </p>
      {contentId && (
        <p className="text-sm text-foreground/65 mt-1">
          Opening <span className="font-mono">{contentId}</span>...
        </p>
      )}
    </div>
  );
}
