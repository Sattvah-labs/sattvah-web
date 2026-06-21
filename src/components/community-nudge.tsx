"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * Nudge #1 — sticky bottom banner that surfaces after the guest has
 * read N community posts. Subtle, dismissable, resets per session
 * (not per visit) so it doesn't nag on every page change.
 *
 * Counter is bumped by callers via `bumpCommunityReadCount()`.
 * Banner shows once a session, only for guests, only if not dismissed.
 */

const COUNT_KEY = "sattvah-community-reads"; // session storage
const DISMISS_KEY = "sattvah-community-nudge-dismissed"; // session storage
const THRESHOLD = 3;

export function bumpCommunityReadCount() {
  if (typeof window === "undefined") return;
  try {
    const cur = parseInt(sessionStorage.getItem(COUNT_KEY) || "0", 10);
    sessionStorage.setItem(COUNT_KEY, String(cur + 1));
    // Notify any listeners so the banner can react without a route change
    window.dispatchEvent(new Event("sattvah:community-read"));
  } catch {
    /* private mode */
  }
}

export function CommunityNudge({ isGuest }: { isGuest: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isGuest) return;

    function check() {
      try {
        if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
        const n = parseInt(sessionStorage.getItem(COUNT_KEY) || "0", 10);
        if (n >= THRESHOLD) setShow(true);
      } catch {
        /* ignore */
      }
    }
    check();
    window.addEventListener("sattvah:community-read", check);
    return () => window.removeEventListener("sattvah:community-read", check);
  }, [isGuest]);

  function dismiss() {
    setShow(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 md:left-auto md:right-6 md:bottom-6 z-40 max-w-md">
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur shadow-2xl p-4 md:p-5">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              Want a quieter feed, tuned to you?
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Sign in to follow people whose posts feel like yours, and save the
              ones you want to come back to.
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="/signin?next=/community"
                className="inline-flex h-9 items-center rounded-full bg-accent text-accent-foreground px-4 text-sm font-medium hover:opacity-90 transition"
              >
                Sign in
              </Link>
              <Link
                href="/signup?next=/community"
                className="inline-flex h-9 items-center rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-foreground/5 transition"
              >
                Sign up
              </Link>
            </div>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismiss}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-foreground/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
