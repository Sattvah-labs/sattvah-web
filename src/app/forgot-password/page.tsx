"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  confirmPasswordReset,
  startPasswordReset,
  classifyError,
} from "@/lib/sattvah-auth";

// Forgot-password page. Audit B12: /signin pointed at this route but
// the page did not exist. Mirrors the lms-web /forgot-password flow:
// stage 1 collects the email and asks Cognito to send a 6-digit code;
// stage 2 collects the code + new password and lands the reset.

function ForgotPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [stage, setStage] = useState<"request" | "confirm">("request");
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      await startPasswordReset(email.trim());
      setInfo("We sent a 6-digit code. Check your inbox.");
      setStage("confirm");
    } catch (raw) {
      const { code: c, message } = classifyError(raw);
      if (c === "UserNotFoundException") {
        setError(
          "We could not find an account with that email. If you signed up with Google, sign in with Google instead.",
        );
      } else if (c === "LimitExceededException") {
        setError("Too many attempts. Try again in 15 minutes.");
      } else {
        setError(message || "Could not send reset code.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function submitConfirm(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    if (newPassword !== confirm) {
      setError("Both passwords must match.");
      setBusy(false);
      return;
    }
    if (newPassword.length < 8) {
      setError("Use at least 8 characters.");
      setBusy(false);
      return;
    }
    try {
      await confirmPasswordReset(email.trim(), code.trim(), newPassword);
      router.replace(`/signin?email=${encodeURIComponent(email.trim())}`);
    } catch (raw) {
      const { code: c, message } = classifyError(raw);
      if (c === "CodeMismatchException") {
        setError("That code did not match. Check the email again.");
      } else if (c === "ExpiredCodeException") {
        setError("That code expired. Send a new one.");
      } else if (c === "InvalidPasswordException") {
        setError(
          "Use at least 8 characters with upper, lower, and number.",
        );
      } else {
        setError(message || "Could not reset password.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container max-w-md py-16 md:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {stage === "request" ? "Reset your password." : "Check your email."}
        </h1>
        <p className="mt-3 text-foreground/65">
          {stage === "request"
            ? "We will email you a 6-digit code."
            : "Enter the code we sent you and pick a new password."}
        </p>
      </div>

      {stage === "request" ? (
        <form onSubmit={submitRequest} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8">
          <div>
            <label className="text-sm font-medium" htmlFor="fp-email">Email</label>
            <input
              id="fp-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            disabled={busy}
            className="w-full rounded-full bg-accent text-accent-foreground h-11 text-sm font-medium shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow disabled:opacity-60"
          >
            {busy ? "Sending..." : "Send reset code"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            <Link href="/signin" className="hover:text-foreground">
              Back to sign in
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={submitConfirm} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8">
          <div>
            <label className="text-sm font-medium" htmlFor="fp-code">6-digit code</label>
            <input
              id="fp-code"
              type="text"
              inputMode="numeric"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-12 px-4 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="fp-new-password">New password</label>
            <input
              id="fp-new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="fp-confirm">Confirm new password</label>
            <input
              id="fp-confirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          {info && (
            <p className="text-sm text-foreground/70 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">{info}</p>
          )}
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-accent text-accent-foreground h-11 text-sm font-medium shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow disabled:opacity-60"
          >
            {busy ? "Resetting..." : "Reset password"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => {
                setStage("request");
                setError(null);
                setInfo(null);
                setCode("");
                setNewPassword("");
                setConfirm("");
              }}
              className="hover:text-foreground"
            >
              Wrong email?
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="container max-w-md py-16">Loading...</div>}>
      <ForgotPasswordInner />
    </Suspense>
  );
}
