"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Globe, ChevronDown, ExternalLink } from "lucide-react";

import {
  CRISIS_HELPLINES,
  COUNTRY_OPTIONS,
  GLOBAL_FALLBACK,
  localeToCountry,
} from "@/lib/crisis-helplines";

const LS_KEY = "sattvah-crisis-country";

export default function CrisisPage() {
  const [country, setCountry] = useState<string>("IN");
  const [detectionState, setDetectionState] =
    useState<"detecting" | "locale" | "ip" | "manual" | "default">("default");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // 1. localStorage override wins
    const saved = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    if (saved && CRISIS_HELPLINES[saved]) {
      setCountry(saved);
      setDetectionState("manual");
      return;
    }
    // 2. navigator.language (no network)
    const fromLocale = localeToCountry(navigator.language || "");
    if (fromLocale) {
      setCountry(fromLocale);
      setDetectionState("locale");
      return;
    }
    // 3. IP geolocation (free public API, no key)
    setDetectionState("detecting");
    fetch("https://ipapi.co/country/", { cache: "force-cache" })
      .then((r) => (r.ok ? r.text() : null))
      .then((code) => {
        const c = (code || "").trim().toUpperCase();
        if (CRISIS_HELPLINES[c]) {
          setCountry(c);
          setDetectionState("ip");
        } else {
          setDetectionState("default");
        }
      })
      .catch(() => setDetectionState("default"));
  }, []);

  function pick(code: string) {
    setCountry(code);
    setDetectionState("manual");
    setShowPicker(false);
    try {
      localStorage.setItem(LS_KEY, code);
    } catch {}
  }

  const current = CRISIS_HELPLINES[country] ?? CRISIS_HELPLINES.IN;
  const detectionLabel = {
    detecting: "Detecting your region…",
    locale: "Based on your device language",
    ip: "Based on your location",
    manual: "You chose this region",
    default: "Showing default region",
  }[detectionState];

  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Crisis support</p>
      <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance">
        If you&rsquo;re in immediate danger, please reach a real person right now.
      </h1>
      <p className="mt-5 text-lg text-foreground/70 leading-relaxed text-balance">
        These lines are free, confidential, and staffed by trained listeners.
        You don&rsquo;t have to explain yourself first.
        It&rsquo;s okay to just call and breathe.
      </p>

      {/* Region selector */}
      <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">{detectionLabel}:</span>
        <button
          type="button"
          onClick={() => setShowPicker((s) => !s)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 hover:bg-foreground/5 transition-colors"
        >
          <span className="text-xl leading-none">{current.flag}</span>
          <span className="font-medium">{current.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        {showPicker && (
          <div className="absolute mt-12 z-10 w-64 rounded-2xl border border-border bg-card shadow-lg p-2">
            {COUNTRY_OPTIONS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => pick(c.code)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-foreground/5 ${
                  c.code === country ? "bg-foreground/5" : ""
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Helpline cards */}
      <div className="mt-8 space-y-4">
        {current.helplines.map((h) => (
          <article
            key={h.name}
            className="rounded-2xl border border-border bg-card p-5 md:p-6"
          >
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">
              {h.name}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {h.phone && (
                <a
                  href={`tel:${h.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  <Phone className="h-4 w-4" />
                  Call {h.phone}
                </a>
              )}
              {h.text && (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                  <MessageSquare className="h-4 w-4" />
                  {h.text}
                </span>
              )}
              {h.website && (
                <a
                  href={h.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-foreground/5"
                >
                  <Globe className="h-4 w-4" />
                  Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="mt-3 text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>{h.hours}</span>
              {h.languages && <span>{h.languages.join(", ")}</span>}
            </div>
            {h.note && (
              <p className="mt-2 text-sm text-foreground/70">{h.note}</p>
            )}
          </article>
        ))}
      </div>

      {/* Global fallback */}
      <div className="mt-10 rounded-2xl border border-border bg-card/60 p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
          Outside the regions above?
        </p>
        <h3 className="text-base font-semibold">{GLOBAL_FALLBACK.name}</h3>
        <p className="mt-2 text-sm text-foreground/70">{GLOBAL_FALLBACK.note}</p>
        {GLOBAL_FALLBACK.website && (
          <a
            href={GLOBAL_FALLBACK.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-accent underline underline-offset-4"
          >
            Open directory
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Soft handoff back to Sattvah */}
      <div className="mt-12 pt-8 border-t border-border/60 text-sm text-foreground/70 space-y-3">
        <p>
          When you&rsquo;re ready and the storm passes a little, Sattvah is still here.
          A friend in your phone for the smaller heavy days that don&rsquo;t need a hotline,
          just somewhere to put them down.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors underline underline-offset-4"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
