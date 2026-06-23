import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

// /wells exists as a soft-redirect landing for any link or bookmark that
// expected the consumer wellness app marketing to live at
// sattvah.ai/wells. The canonical home is wells.sattvah.ai; we ship a
// client-side redirect via <meta http-equiv="refresh"> so the static
// export works without SSR, plus a visible link for users with JS off
// or aggressive privacy settings.

export const metadata: Metadata = {
  title: "Sattvah moved to wells.sattvah.ai",
  description:
    "The Sattvah consumer wellness app marketing now lives at wells.sattvah.ai. We are redirecting you there.",
  alternates: { canonical: `${siteConfig.wellsUrl}/` },
  robots: { index: false, follow: true },
  other: {
    "refresh": `0; url=${siteConfig.wellsUrl}/`,
  },
};

export default function WellsRedirectPage() {
  return (
    <section className="container py-32 max-w-2xl text-center">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
        Sattvah moved to <a href={siteConfig.wellsUrl} className="underline underline-offset-4">wells.sattvah.ai</a>.
      </h1>
      <p className="text-foreground/65 leading-relaxed mb-8">
        We split the Sattvah Labs corporate site (here) from the Sattvah
        consumer wellness app. You should be redirected automatically.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={siteConfig.wellsUrl}
          className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Go to wells.sattvah.ai
        </a>
        <Link
          href="/"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
        >
          Back to Sattvah Labs
        </Link>
      </div>
    </section>
  );
}
