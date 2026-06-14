import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sattvah collects, uses, and protects your data — written in plain English.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24 prose prose-slate">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: June 2026</p>

      <p>
        This is a summary of how Sattvah handles your data. The legally-binding version
        lives at our backend endpoint <code>/legal/privacy</code> and the app exposes it
        in Settings. If anything here ever conflicts with that document, the backend
        document wins.
      </p>

      <h2>Data we collect</h2>
      <ul>
        <li>Account basics: email or phone (used for sign-in only), display name, optional date of birth.</li>
        <li>Anything you post or message — stored encrypted at rest.</li>
        <li>Standard product analytics (screen views, crash reports), with no advertising IDs.</li>
      </ul>

      <h2>What we don&rsquo;t do</h2>
      <ul>
        <li>We don&rsquo;t sell your data. Ever.</li>
        <li>We don&rsquo;t train third-party AI on your private chats.</li>
        <li>We don&rsquo;t share anonymous posts with names attached, internally or externally.</li>
      </ul>

      <h2>Your controls</h2>
      <p>
        You can export or delete your account at any time from the app. Deleting wipes
        your messages from our systems within 30 days, except for content we&rsquo;re
        legally required to retain (very rare — typically only when ordered by a court).
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions: <a href="mailto:mano@sattvah.ai">mano@sattvah.ai</a>.
      </p>
    </div>
  );
}
