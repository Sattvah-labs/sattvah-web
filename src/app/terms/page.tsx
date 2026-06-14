import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms under which you can use Sattvah.",
};

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24 prose prose-slate">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: June 2026</p>

      <p>
        These are the terms for using Sattvah. Plain-English summary here; the full
        legally-binding document is at <code>/legal/terms</code> and inside the app.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>You must be 18+ to use Sattvah (some regions: 16+ with consent).</li>
        <li>
          Sattvah is peer + supportive content; it&rsquo;s not a substitute for medical
          care. If you&rsquo;re in crisis, contact local emergency services.
        </li>
        <li>
          Don&rsquo;t share content that&rsquo;s illegal, hateful, sexually exploitative
          of minors, or that doxxes other people. We&rsquo;ll remove it and may suspend
          accounts.
        </li>
        <li>
          We host expert sessions but we&rsquo;re not party to them. Experts are
          independent providers; their advice is theirs.
        </li>
      </ul>

      <h2>Account suspension</h2>
      <p>
        We may suspend or terminate accounts that repeatedly violate community guidelines
        or these terms, with a refund of any unused expert-session credits.
      </p>

      <h2>Disputes</h2>
      <p>
        Governing law is described in the full document at{" "}
        <code>/legal/terms</code>.
      </p>
    </div>
  );
}
