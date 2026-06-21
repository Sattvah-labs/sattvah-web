"use client";

/**
 * Cookie consent banner. Vanilla React + localStorage. No third-party
 * scripts, no telemetry, no fingerprinting. The banner shows once on
 * first paint, then hides forever after the user clicks accept or
 * decline. Both choices are stored under sattvah-cookie-consent so a
 * future analytics opt-in can read it.
 */
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "sattvah-cookie-consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setOpen(true);
    } catch {
      /* private mode, silently skip */
    }
  }, []);

  function record(choice: "accept" | "decline") {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* private mode, silently skip */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-card/95 backdrop-blur p-5 md:p-6 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]">
        <div className="flex items-start gap-4">
          <div className="flex-1 text-sm leading-relaxed text-foreground/80">
            <p className="font-semibold text-foreground mb-1">
              A small note about cookies
            </p>
            <p>
              We use one strictly-necessary cookie to keep you signed in.
              No ad trackers. No third-party analytics. See our{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-foreground"
              >
                privacy policy
              </a>{" "}
              for the boring details.
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={() => record("decline")}
            className="p-1 rounded hover:bg-foreground/5 text-foreground/55"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => record("accept")}
            className="inline-flex h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
          <button
            onClick={() => record("decline")}
            className="inline-flex h-10 px-5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
          >
            Decline non-essential
          </button>
        </div>
      </div>
    </div>
  );
}
