"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { completeFederatedSignIn } from "@/lib/cognito";
import { useAuth } from "@/lib/auth-context";

/**
 * OAuth code-grant callback for Cognito Hosted UI federated sign-in
 * (Google + Sign In with Apple). The Hosted UI redirects the browser
 * back here with `?code=...&state=...` after the user finishes the
 * provider's flow. We exchange the code for a Cognito token trio, lay
 * them into localStorage so amazon-cognito-identity-js picks them up,
 * then navigate the user to wherever they were headed (`next`, stashed
 * in sessionStorage before the redirect kicked off).
 *
 * Errors from the provider (user denied consent, invalid_client, etc.)
 * come back as `?error=...&error_description=...`; we surface those
 * verbatim because the language Cognito ships is already user-readable.
 */
function CallbackInner() {
  const router = useRouter();
  const search = useSearchParams();
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = search.get("code");
    const errParam = search.get("error_description") || search.get("error");
    if (errParam) {
      setError(errParam);
      return;
    }
    if (!code) {
      setError("Missing authorization code. Please retry sign-in.");
      return;
    }
    (async () => {
      try {
        const { next } = await completeFederatedSignIn(code);
        await auth.refresh();
        router.replace(next);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Sign-in failed.");
      }
    })();
    // We intentionally run this once on mount. Re-running on each search
    // params change would attempt to re-exchange the same code (which
    // Cognito rejects with invalid_grant on the second hit).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container max-w-md py-24 text-center">
      {error ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            We could not finish sign-in.
          </h1>
          <p className="text-sm text-foreground/70">{error}</p>
          <Link
            href="/signin"
            className="inline-block rounded-full bg-accent text-accent-foreground h-11 px-6 text-sm font-medium leading-[2.75rem]"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            One moment.
          </h1>
          <p className="text-sm text-foreground/70">
            Finishing your sign-in.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={<div className="container max-w-md py-24">Loading.</div>}
    >
      <CallbackInner />
    </Suspense>
  );
}
