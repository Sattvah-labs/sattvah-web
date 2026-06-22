"use client";

import { useState } from "react";

import { signInWithApple, signInWithGoogle } from "@/lib/cognito";
import { isAppleEnabled } from "@/lib/sattvah-auth";

/**
 * Apple + Google sign-in buttons. Both redirect the browser to the
 * Cognito Hosted UI; the result comes back through /auth/callback. We
 * keep them as full-width pill buttons stacked vertically so they read
 * with equal weight, with Apple first because the dark fill draws the
 * eye and Apple's HIG asks for it to be prominent.
 *
 * `next` is the post-sign-in destination — typically /community, but the
 * sign-in and sign-up pages forward whatever was in their own ?next= so
 * a user landing here from a gated page returns there afterwards.
 */
export function FederatedButtons({ next }: { next: string }) {
  const [busy, setBusy] = useState<"apple" | "google" | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Audit B14: hide the Apple button when the IdP is not registered in
  // the Cognito pool. Toggle via NEXT_PUBLIC_APPLE_ENABLED=true.
  const appleEnabled = isAppleEnabled();

  async function go(provider: "apple" | "google") {
    setError(null);
    setBusy(provider);
    try {
      if (provider === "apple") await signInWithApple(next);
      else await signInWithGoogle(next);
      // Page navigates away (window.location.assign); no need to clear
      // busy here because the component unmounts in the redirect.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start sign-in.");
      setBusy(null);
    }
  }

  return (
    <div className="space-y-3">
      {/* Apple, solid black pill with the Apple logo. Matches HIG
          requirements: 8pt+ corner radius (we use the form's 9999px),
          left-aligned logo + centered label, black fill on light mode.
          Hidden when the Apple IdP is not registered in the Cognito
          pool (audit B14). */}
      {appleEnabled ? (
        <button
          type="button"
          onClick={() => go("apple")}
          disabled={busy !== null}
          aria-label="Continue with Apple"
          className="w-full rounded-full bg-black text-white h-11 text-sm font-medium flex items-center justify-center gap-2 hover:bg-black/85 transition-colors disabled:opacity-60"
        >
          <AppleLogo className="h-4 w-4" />
          {busy === "apple" ? "Opening Apple..." : "Continue with Apple"}
        </button>
      ) : null}
      {/* Google — white pill with a subtle border. Matches Google's
          identity guidelines for the "neutral" button variant. */}
      <button
        type="button"
        onClick={() => go("google")}
        disabled={busy !== null}
        aria-label="Continue with Google"
        className="w-full rounded-full bg-white text-zinc-900 border border-zinc-200 h-11 text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors disabled:opacity-60"
      >
        <GoogleLogo className="h-4 w-4" />
        {busy === "google" ? "Opening Google..." : "Continue with Google"}
      </button>
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}

function AppleLogo({ className }: { className?: string }) {
  // Apple's logo is allowed to be reproduced on the official "Sign in
  // with Apple" button verbatim. This is a faithful single-color trace.
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.365 1.43c0 1.14-.46 2.23-1.21 3.03-.81.86-2.12 1.52-3.22 1.43-.14-1.11.42-2.27 1.16-3.06.83-.87 2.25-1.52 3.27-1.4ZM21.31 17.4c-.55 1.27-.82 1.85-1.53 2.97-1 1.55-2.4 3.48-4.14 3.49-1.55.02-1.95-1.01-4.05-1-2.1.02-2.54 1.02-4.09 1-1.74-.02-3.06-1.76-4.06-3.31C.34 16.96-.13 12.3 2.55 8.97c1.93-2.4 4.97-3.81 7.83-3.81 2.91 0 4.74 1.6 7.14 1.6 2.33 0 3.75-1.6 7.11-1.6 2.54 0 5.22 1.38 7.13 3.76-6.27 3.43-5.25 12.39-.45 14.48Z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  // Google's official "G" mark. We render the full color version because
  // Google's identity guidelines require it on the neutral button.
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.094 5.565.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
