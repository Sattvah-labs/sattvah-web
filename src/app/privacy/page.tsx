import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sattvah Labs Pvt Ltd collects, uses, and protects your data, written in plain English. DPDPA-aligned.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24 prose prose-slate dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: June 2026</p>

      <p>
        This policy explains how{" "}
        <strong>Sattvah Labs Private Limited</strong> (Sattvah Labs, we,
        our), the data fiduciary behind sattvah.ai and every coach
        tenant on sattvah.ai/c/&lt;handle&gt;, handles your personal
        data. It is aligned with India&rsquo;s Digital Personal Data
        Protection Act, 2023 (DPDPA).
      </p>

      <h2>1. Who is the data fiduciary?</h2>
      <p>
        Sattvah Labs Private Limited is the data fiduciary for all
        personal data collected through sattvah.ai, the Sattvah consumer
        app, the admin console at admin.sattvah.ai, and every coach
        landing page at sattvah.ai/c/&lt;handle&gt;. When you use a coach
        tenant&rsquo;s surface, your coach is a joint controller of the
        data you share inside their practice; Sattvah Labs hosts it on
        their behalf.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>Account basics:</strong> phone number or email (used
          for sign-in only), display name, optional date of birth.
        </li>
        <li>
          <strong>What you write:</strong> chats, diary entries, posts,
          replies. Encrypted at rest. Inside a coach tenant, shared with
          your coach by design; everywhere else, kept private.
        </li>
        <li>
          <strong>Voice notes:</strong> only when you tap record.
          Transcribed on our servers, then the audio is deleted within
          30 days.
        </li>
        <li>
          <strong>Payments:</strong> handled by Razorpay. We see the
          status and amount, never your card number.
        </li>
        <li>
          <strong>Product analytics:</strong> screen views and crash
          reports, no advertising IDs, no third-party trackers.
        </li>
      </ul>

      <h2>3. What we do not do</h2>
      <ul>
        <li>We do not sell your data. Ever.</li>
        <li>
          We do not train third-party AI on your private chats. Anthropic
          and OpenAI process your messages under data-processing
          agreements that bar them from training.
        </li>
        <li>
          We do not share anonymous posts with names attached, internally
          or externally.
        </li>
        <li>
          We do not run advertising on Sattvah surfaces. There are no
          third-party ad pixels on this site.
        </li>
      </ul>

      <h2>4. Your DPDPA rights</h2>
      <p>
        Under DPDPA you have the right to access, correct, complete, and
        erase the personal data we hold about you. You also have a right
        to grievance redressal and to nominate someone to act on your
        behalf. To exercise any of these, email{" "}
        <a href="mailto:privacy@sattvah.ai">privacy@sattvah.ai</a>. We
        respond within seven working days.
      </p>

      <h2>5. Data deletion</h2>
      <p>
        You can delete your account at any time from Settings inside the
        app, or by emailing{" "}
        <a href="mailto:privacy@sattvah.ai">privacy@sattvah.ai</a>.
        Deletion removes your data from our active systems within 30
        days, except for content we are legally required to retain (very
        rare, typically only when ordered by a court). Backup tapes are
        rotated out within 90 days.
      </p>

      <h2>6. Children</h2>
      <p>
        Sattvah is for users 18 and over (16 with verifiable parental
        consent in certain regions). We do not knowingly collect data
        from children below the local age of consent.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Your data is stored in AWS Mumbai (ap-south-1) by default.
        Limited processing happens in Singapore (ap-southeast-1) for
        failover. We do not transfer to countries where DPDPA would not
        permit it.
      </p>

      <h2>8. WhatsApp messaging policy</h2>
      <p>
        We send WhatsApp messages only when (a) you opted in through a
        coach tenant, (b) a Meta-approved utility template covers the
        message, or (c) you started a conversation with us in the last
        24 hours. See{" "}
        <Link href="/trust">our Trust Center</Link> for the full list of
        templates we use.
      </p>

      <h2>9. Contact</h2>
      <p>
        Sattvah Labs Private Limited
        <br />
        Registered office: Bangalore, Karnataka, India
        <br />
        Data protection officer:{" "}
        <a href="mailto:privacy@sattvah.ai">privacy@sattvah.ai</a>
        <br />
        Grievance officer:{" "}
        <a href="mailto:grievance@sattvah.ai">grievance@sattvah.ai</a>
      </p>
    </div>
  );
}
