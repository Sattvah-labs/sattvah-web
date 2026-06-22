"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth-context";
import { getIdToken } from "@/lib/cognito";
import { siteConfig } from "@/lib/site";

// /start-tenant is the Path B landing page from the onboarding v2 design.
// A signed-in Cognito user fills five fields and we POST them to
// /tenants/self-signup. On 201 we redirect to admin.sattvah.ai/setup
// where the rest of the profile (logo, pricing, bookings) lives.
// Logged-out callers bounce back to /signup?intent=coach so the same
// flow naturally funnels them through email confirmation first.

type SelfSignupResponse = {
  tenantId: string;
  lifecycle: string;
  nextStep: string;
};

type SelfSignupError = {
  error: string;
  suggested?: string[];
};

// LANGUAGES mirrors the allowedSelfSignupLanguages map on the backend.
// Keep the two in lockstep: an entry here that the API does not know
// will round-trip as a 400 from the validator.
const LANGUAGES: { value: string; label: string }[] = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "bengali", label: "Bengali" },
  { value: "marathi", label: "Marathi" },
  { value: "gujarati", label: "Gujarati" },
  { value: "kannada", label: "Kannada" },
  { value: "malayalam", label: "Malayalam" },
  { value: "punjabi", label: "Punjabi" },
  { value: "urdu", label: "Urdu" },
];

const HANDLE_PATTERN = /^[a-z][a-z0-9-]{2,31}$/;

// slugify produces a kebab-case, allow-listed handle from a freeform
// display name so first-time coaches can leave the handle field empty
// and we will derive one for them. The result still has to clear the
// HANDLE_PATTERN check before we send it.
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

export default function StartTenantPage() {
  const router = useRouter();
  const auth = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [vanityHandle, setVanityHandle] = useState("");
  const [handleTouched, setHandleTouched] = useState(false);
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Bounce unauthed callers to /signup?intent=coach so they confirm
  // their email first, then land back here. We wait for auth.loading
  // to settle so the initial render does not flash the redirect.
  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.replace("/signup?intent=coach");
    }
  }, [auth.loading, auth.user, router]);

  // Auto-derive the handle from the display name until the user types
  // into the handle field themselves. Once they edit it, we leave it
  // alone, the form is theirs to control.
  useEffect(() => {
    if (handleTouched) return;
    setVanityHandle(slugify(displayName));
  }, [displayName, handleTouched]);

  const handleValid = useMemo(() => HANDLE_PATTERN.test(vanityHandle), [vanityHandle]);
  const bioCount = bio.length;
  const canSubmit =
    !loading &&
    displayName.trim().length >= 2 &&
    displayName.trim().length <= 80 &&
    handleValid &&
    bioCount <= 240;

  function toggleLanguage(value: string) {
    setLanguages((prev) => {
      if (prev.includes(value)) return prev.filter((l) => l !== value);
      if (prev.length >= 6) return prev;
      return [...prev, value];
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuggested([]);
    setLoading(true);
    try {
      const token = await getIdToken();
      if (!token) {
        router.replace("/signup?intent=coach");
        return;
      }
      const res = await fetch(`${siteConfig.apiBaseUrl}/tenants/self-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: displayName.trim(),
          vanityHandle: vanityHandle.trim(),
          specialty: specialty.trim() || undefined,
          bio: bio.trim() || undefined,
          languages: languages.length > 0 ? languages : undefined,
        }),
      });
      if (res.status === 201) {
        const data = (await res.json()) as SelfSignupResponse;
        window.location.href = data.nextStep;
        return;
      }
      if (res.status === 409) {
        const data = (await res.json()) as SelfSignupError;
        setSuggested(data.suggested || []);
        setError("That handle is taken. Pick another.");
        return;
      }
      if (res.status === 401) {
        router.replace("/signup?intent=coach");
        return;
      }
      const text = await res.text();
      setError(text || `Request failed (${res.status}).`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function pickSuggestion(s: string) {
    setVanityHandle(s);
    setHandleTouched(true);
    setSuggested([]);
    setError(null);
  }

  if (auth.loading) {
    return <div className="container max-w-xl py-16">Loading...</div>;
  }
  if (!auth.user) {
    return null;
  }

  return (
    <div className="container max-w-xl py-16 md:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Set up your wellness space
        </h1>
        <p className="mt-3 text-foreground/65">
          A few details and we&rsquo;ll get your space ready to share.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-5 bg-card border border-border rounded-2xl p-6 md:p-8"
      >
        <div>
          <label className="text-sm font-medium" htmlFor="displayName">
            Space name
          </label>
          <input
            id="displayName"
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Asha Wellness"
            maxLength={80}
            className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            What your clients will see at the top of every page.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="vanityHandle">
            Handle
          </label>
          <div className="mt-1.5 flex items-stretch rounded-xl border border-border bg-background overflow-hidden">
            <span className="px-3 inline-flex items-center text-sm text-muted-foreground bg-muted/30">
              sattvah.ai/c/
            </span>
            <input
              id="vanityHandle"
              type="text"
              required
              value={vanityHandle}
              onChange={(e) => {
                setVanityHandle(e.target.value.toLowerCase());
                setHandleTouched(true);
              }}
              placeholder="asha-wellness"
              maxLength={32}
              className="flex-1 h-11 px-3 text-sm bg-transparent focus:outline-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Lowercase letters, digits, and hyphens. Starts with a letter.
          </p>
          {!handleValid && vanityHandle.length > 0 && (
            <p className="mt-1.5 text-xs text-destructive">
              Handle must be 3 to 32 characters, lowercase letters, digits, or hyphens.
            </p>
          )}
          {suggested.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {suggested.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => pickSuggestion(s)}
                  className="rounded-full border border-border bg-background h-8 px-3 text-xs hover:border-accent/60"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="specialty">
            What do you help with?{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="specialty"
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Yoga, breathwork, women&rsquo;s wellbeing"
            maxLength={80}
            className="mt-1.5 w-full rounded-xl border border-border bg-background h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="bio">
            One-line bio{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 240))}
            rows={3}
            placeholder="Helping women find balance through slow-flow yoga and breath."
            className="mt-1.5 w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
          />
          <p
            className={`mt-1.5 text-xs ${
              bioCount > 220 ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {bioCount} / 240
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">
            Languages you work in{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LANGUAGES.map((l) => {
              const selected = languages.includes(l.value);
              return (
                <button
                  type="button"
                  key={l.value}
                  onClick={() => toggleLanguage(l.value)}
                  className={`rounded-full h-9 px-3 text-xs border transition-colors ${
                    selected
                      ? "border-accent bg-accent/15 text-foreground"
                      : "border-border bg-background hover:border-accent/40"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Pick up to six. You can change this later.
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-full bg-accent text-accent-foreground h-11 text-sm font-medium shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow disabled:opacity-60"
        >
          {loading ? "Setting up..." : "Continue"}
        </button>

        <p className="text-center text-xs text-muted-foreground pt-2">
          You&rsquo;ll finish your profile on the next screen.
        </p>
      </form>

      <div className="mt-6 flex justify-center text-sm">
        <button
          type="button"
          onClick={() => {
            auth.signOut();
            router.replace("/");
          }}
          className="text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          Sign out and return home
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Need a hand?{" "}
        <Link href="/coaches/help" className="underline underline-offset-4 hover:text-foreground">
          See the coach FAQ
        </Link>
        .
      </p>
    </div>
  );
}
