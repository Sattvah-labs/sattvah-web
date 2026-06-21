import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Common questions about Sattvah for clients: sign-in, pricing, bookings, refunds, privacy, and account.",
};

// Static FAQ page for clients. Mirrors the in-app HelpScreen so a
// user gets the same answer whether they search Google or open the
// app. Keep the IDs stable: deep links of the form
// sattvah.ai/help#pricing land directly on the relevant section.

type FAQ = { id: string; q: string; a: string };

const FAQS: FAQ[] = [
  {
    id: "sign-in",
    q: "How do I sign in?",
    a: "Use the Sign in button at the top of the app or website with the email you signed up with. If you have forgotten your password, tap Forgot password.",
  },
  {
    id: "pricing",
    q: "How much does Sattvah cost?",
    a: "Sattvah is free for clients. Coaches start free; Sattvah Pro is INR 4,000 + GST per month, Sattvah Growth is INR 12,000 + GST per month. Commission varies by tier.",
  },
  {
    id: "bookings",
    q: "How do I cancel or reschedule a session?",
    a: "Open My Bookings in the app, tap the session, and choose Cancel or Reschedule. Cancellations more than 24 hours before the slot are fully refundable.",
  },
  {
    id: "refunds",
    q: "How do refunds work?",
    a: "Refunds are processed inside 7 business days back to the original payment method. If you do not see it after 7 days, write to support@sattvah.ai with your booking id.",
  },
  {
    id: "privacy",
    q: "Is my data private?",
    a: "Your chats, moods, and diary entries are visible only to you and the coach you choose to share them with. We do not sell or share your data with third parties.",
  },
  {
    id: "account",
    q: "How do I delete my account?",
    a: "In the app, open Settings, tap Account, then Delete account. Your tickets, chats, and bookings are erased inside 30 days.",
  },
  {
    id: "notifications",
    q: "Can I turn off notifications?",
    a: "Yes. In the app, open Settings, tap Notifications, and switch off any category. You can always re-enable later.",
  },
];

export default function HelpPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24 prose prose-slate">
      <h1>Help</h1>
      <p className="text-muted-foreground">
        Quick answers to the most common questions. Need a human? Email{" "}
        <a href="mailto:support@sattvah.ai">support@sattvah.ai</a> or open
        the Contact us screen in the app.
      </p>

      {FAQS.map((f) => (
        <section key={f.id} id={f.id} className="not-prose mt-8">
          <h2 className="text-lg font-semibold">{f.q}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
        </section>
      ))}

      <hr className="my-10" />
      <p className="text-sm text-muted-foreground">
        Are you a Sattvah coach? Read the coach help at{" "}
        <a href="/coaches/help">sattvah.ai/coaches/help</a>.
      </p>
    </div>
  );
}
