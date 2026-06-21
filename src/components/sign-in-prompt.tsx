"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

type Props = {
  open: boolean;
  reason?: string;
  onClose: () => void;
};

export function SignInPrompt({ open, reason = "to react", onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30"
      style={{ backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl border border-border max-w-sm w-full p-7 text-center shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 h-8 w-8 rounded-full text-muted-foreground hover:bg-foreground/5 inline-flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center mb-4">
          <MessageCircle className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">Sign in {reason}</h3>
        <p className="mt-2 text-sm text-foreground/65">
          Reading is open to everyone. Reacting, replying, and saving need an account so we can keep the space kind.
        </p>
        <div className="mt-6 space-y-2">
          <Link
            href={`/signin?next=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname + window.location.search : "/community")}`}
            className="block w-full rounded-full bg-accent text-accent-foreground h-11 inline-flex items-center justify-center text-sm font-medium shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow"
          >
            Sign in
          </Link>
          <Link
            href={`/signup?next=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname + window.location.search : "/community")}`}
            className="block w-full rounded-full border border-border bg-card h-11 inline-flex items-center justify-center text-sm hover:bg-foreground/5 transition-colors"
          >
            Sign up
          </Link>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Anonymous by default once you sign in. We never show your real name unless you tell us to.
        </p>
      </div>
    </div>
  );
}
