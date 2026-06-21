"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { signIn } from "@/lib/cognito";
import { useAuth } from "@/lib/auth-context";
import { FederatedButtons } from "@/components/federated-buttons";

function SignInForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/community";
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      await auth.refresh();
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-md py-16 md:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Welcome back.</h1>
        <p className="mt-3 text-foreground/65">Sign in to keep your conversations going.</p>
      </div>

      <FederatedButtons next={next} />

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8">
        <div>
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent text-accent-foreground h-11 text-sm font-medium shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          New here?{" "}
          <Link href={`/signup?next=${encodeURIComponent(next)}`} className="underline underline-offset-4 hover:text-foreground">
            Create an account
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          <Link href="/forgot-password" className="hover:text-foreground">
            Forgot password?
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="container max-w-md py-16">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
