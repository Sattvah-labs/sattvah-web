"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { confirmSignUp, resendConfirmationCode, signIn, signUp } from "@/lib/cognito";
import { useAuth } from "@/lib/auth-context";
import { FederatedButtons } from "@/components/federated-buttons";

type Step = "register" | "confirm";

function SignUpForm() {
  const router = useRouter();
  const search = useSearchParams();
  // Coach prospects arrive from /coaches via ?intent=coach and need to
  // land on /start-tenant rather than the consumer /community feed
  // after they confirm. An explicit ?next= still wins so other surfaces
  // (deep links, share cards) can override.
  const intent = search.get("intent");
  const isCoachIntent = intent === "coach";
  const next = search.get("next") || (isCoachIntent ? "/start-tenant" : "/community");
  const auth = useAuth();

  const [step, setStep] = useState<Step>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
      setStep("confirm");
      setInfo("We sent a 6-digit code to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-up failed");
    } finally {
      setLoading(false);
    }
  }

  async function submitConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await confirmSignUp(email.trim(), code.trim());
      await signIn(email.trim(), password);
      await auth.refresh();
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Confirmation failed");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setError(null);
    setInfo(null);
    try {
      await resendConfirmationCode(email.trim());
      setInfo("A fresh code is on its way.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend");
    }
  }

  return (
    <div className="container max-w-md py-16 md:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {step === "register"
            ? isCoachIntent
              ? "Start your space."
              : "Make a quiet space yours."
            : "Check your email."}
        </h1>
        <p className="mt-3 text-foreground/65">
          {step === "register"
            ? isCoachIntent
              ? "Create your account. You can set up your space right after."
              : "Anonymous by default. We never show your real name unless you tell us to."
            : "Enter the 6-digit code we just sent you."}
        </p>
      </div>

      {step === "register" && (
        <>
          <FederatedButtons next={next} />
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </>
      )}

      {step === "register" ? (
        <form onSubmit={submitRegister} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8">
          <div>
            <label className="text-sm font-medium" htmlFor="displayName">What should we call you?</label>
            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="A name or initial, pick anything"
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
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
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              At least 8 characters, one upper, one lower, one number.
            </p>
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
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link href={`/signin?next=${encodeURIComponent(next)}`} className="underline underline-offset-4 hover:text-foreground">
              Sign in
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={submitConfirm} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8">
          <div>
            <label className="text-sm font-medium" htmlFor="code">6-digit code</label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-12 px-4 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>

          {info && (
            <p className="text-sm text-foreground/70 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">{info}</p>
          )}
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full rounded-full bg-accent text-accent-foreground h-11 text-sm font-medium shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow disabled:opacity-60"
          >
            {loading ? "Confirming…" : "Confirm"}
          </button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Didn&rsquo;t get it?{" "}
            <button type="button" onClick={resend} className="underline underline-offset-4 hover:text-foreground">
              Resend
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="container max-w-md py-16">Loading…</div>}>
      <SignUpForm />
    </Suspense>
  );
}
