import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms under which you can use Sattvah. Sattvah Labs Private Limited is the contracting entity.",
};

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24 prose prose-slate dark:prose-invert">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: June 2026</p>

      <p>
        These terms govern your use of sattvah.ai, the Sattvah app, the
        admin console at admin.sattvah.ai, and every coach landing page
        at sattvah.ai/c/&lt;handle&gt;. The contracting entity is{" "}
        <strong>Sattvah Labs Private Limited</strong>, registered in
        Bangalore, India (Sattvah Labs, we, our).
      </p>

      <h2>1. Who can use Sattvah</h2>
      <ul>
        <li>
          You must be 18 or older (16 with verifiable parental consent
          in some regions).
        </li>
        <li>
          You must use Sattvah only for the purpose it was built: peer
          support, journaling, and coaching, never for harassment,
          targeting, or sale.
        </li>
      </ul>

      <h2>2. What Sattvah is, and is not</h2>
      <p>
        Sattvah is a peer-and-coach support platform. It is not a
        medical or psychiatric service. If you are in immediate danger
        or experiencing a medical emergency, contact your local
        emergency line or a service listed on{" "}
        <Link href="/crisis">our crisis page</Link>. We are honest about
        where our help ends and professional care begins.
      </p>

      <h2>3. Coaches on Sattvah</h2>
      <p>
        Coaches who host their practice on Sattvah are independent
        providers. Their advice is theirs. Sattvah Labs provides the
        software they run on, processes payments via Razorpay, and
        moderates the community for safety. We are not party to the
        coaching relationship.
      </p>

      <h2>4. Payments and refunds</h2>
      <p>
        Payments are processed by Razorpay, RBI-licensed. We accept UPI,
        cards, net banking, and wallets. Subscriptions renew
        automatically until you cancel. Refunds for unused subscription
        time are issued at the coach&rsquo;s discretion; we strongly
        encourage a 7-day no-questions-asked refund window and ship
        defaults that way.
      </p>

      <h2>5. Content rules</h2>
      <p>
        Do not share content that is illegal, hateful, sexually
        exploitative of minors, or that doxxes other people. We remove
        such content and may suspend accounts that repeat. Appeals go to{" "}
        <a href="mailto:appeals@sattvah.ai">appeals@sattvah.ai</a>.
      </p>

      <h2>6. Your data</h2>
      <p>
        Your data is governed by our{" "}
        <Link href="/privacy">Privacy Policy</Link>. We do not sell it.
        We do not train third-party AI on your private chats. You can
        export and delete it at any time.
      </p>

      <h2>7. Liability</h2>
      <p>
        To the extent permitted by Indian law, Sattvah Labs&rsquo; total
        liability for any claim arising out of these terms is limited to
        the fees you paid us in the 12 months before the claim. We are
        not liable for advice given by independent coaches.
      </p>

      <h2>8. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will
        first be resolved in good faith over email; failing that, the
        courts of Bangalore have exclusive jurisdiction.
      </p>

      <h2>9. Contact</h2>
      <p>
        Sattvah Labs Private Limited
        <br />
        Registered office: Bangalore, Karnataka, India
        <br />
        Email:{" "}
        <a href="mailto:legal@sattvah.ai">legal@sattvah.ai</a>
      </p>
    </div>
  );
}
