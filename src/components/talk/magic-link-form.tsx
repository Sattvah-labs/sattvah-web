"use client";

import { useState } from "react";

import { normalisePhone, startSms, verifySms, hydrateSessionFromVerify } from "@/lib/talk-api";

type Step = "phone" | "code" | "done";

/**
 * Two-step SMS magic-link UI. No password, no email. Tap a tile, type a
 * phone, type the six digit code MSG91 sends back, you are in.
 *
 * Stays inline on /talk so the user never bounces to a sign-in page.
 */
export function MagicLinkForm({
  onAuthed,
}: {
  onAuthed?: (displayName: string) => void;
}) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [normalised, setNormalised] = useState("");

  async function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const n = normalisePhone(phone);
      const r = await startSms(n);
      setNormalised(n);
      setSessionId(r.sessionId);
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the code.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await verifySms(sessionId, normalised, code.trim());
      hydrateSessionFromVerify(r, normalised);
      setStep("done");
      onAuthed?.(r.displayName || normalised);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wrong code, try again.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "done") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-border bg-card p-6 text-center"
      >
        <p className="text-lg font-medium">You are in.</p>
        <p className="text-sm text-foreground/70 mt-1">Tap the mic to start.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8" data-testid="magic-link-form">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">
        {step === "phone" ? "Sign in with your phone." : "Enter the code."}
      </h2>
      <p className="text-center text-foreground/65 mt-2 text-base">
        {step === "phone"
          ? "We will text you a 6 digit code. No password."
          : `Sent to ${normalised}. It should arrive in a few seconds.`}
      </p>

      {step === "phone" && (
        <form onSubmit={submitPhone} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Phone</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-label="Phone number"
              data-testid="phone-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-14 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-accent/60"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            data-testid="send-code"
            className="w-full rounded-full bg-accent text-accent-foreground h-14 text-lg font-medium disabled:opacity-60"
          >
            {busy ? "Sending..." : "Send code"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={submitCode} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">6 digit code</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              aria-label="One time code"
              data-testid="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-14 px-4 text-2xl tracking-[0.4em] text-center focus:outline-none focus:ring-2 focus:ring-accent/60"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            data-testid="verify-code"
            className="w-full rounded-full bg-accent text-accent-foreground h-14 text-lg font-medium disabled:opacity-60"
          >
            {busy ? "Verifying..." : "Verify"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setCode("");
              setError(null);
            }}
            className="w-full text-sm text-foreground/65 underline underline-offset-4"
          >
            Use a different number
          </button>
        </form>
      )}
    </div>
  );
}
