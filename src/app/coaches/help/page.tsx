import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coach Help",
  description:
    "Operational help for Sattvah coaches: payouts, scheduling, broadcasts, Studio (course creation), plan changes, and support.",
};

// Coach-facing FAQ. Lives at /coaches/help so we can run a separate
// audience on the same domain. Onboarding emails + the Sattvah Coaches
// WA community both link here for "everything you need" answers.

type FAQ = { id: string; q: string; a: string };

const FAQS: FAQ[] = [
  {
    id: "tiers",
    q: "What is the difference between Free, Pro, and Growth?",
    a: "Free is INR 0/month + 12% commission, ideal for getting started. Pro is INR 4,000 + GST/month + 5% commission. Growth is INR 12,000 + GST/month + 2% commission and includes priority support.",
  },
  {
    id: "payouts",
    q: "When do I get paid?",
    a: "Coach payouts run every Tuesday via Razorpay Route. Your dashboard shows the next payout date and the running balance.",
  },
  {
    id: "scheduling",
    q: "How do I set up my calendar?",
    a: "Open Scheduling in the app, then Availability. Add windows per day; the booking system respects timezone and overlap rules.",
  },
  {
    id: "broadcasts",
    q: "How do I send a broadcast to my clients?",
    a: "Open the Community tab, tap the pen icon, choose Broadcast. The post goes to your community feed and triggers WA notifications for opted-in clients.",
  },
  {
    id: "studio",
    q: "Where do I create and publish courses?",
    a: "Studio is your creator workspace. Courses, chapters, and lessons all live there. Open the Studio tile from the coach dashboard, or jump straight to learn.sattvah.ai/instructor. Open Studio to manage what you teach.",
  },
  {
    id: "plan-change",
    q: "How do I switch plans?",
    a: "Open Settings, tap Subscription, then choose a new tier. Changes take effect at the start of your next billing cycle.",
  },
  {
    id: "leaving",
    q: "What happens if I leave Sattvah?",
    a: "Your future bookings are auto-cancelled with a 100% refund stamp. Past sessions and notes stay readable for you for 60 days. Email mano@sattvah.ai if you need an export.",
  },
  {
    id: "wa-community",
    q: "How do I join the Sattvah Coaches WA group?",
    a: "Email mano@sattvah.ai with your registered phone number. Mano adds you to the coach-only WhatsApp community within a day.",
  },
  {
    id: "support",
    q: "Where do I get support?",
    a: "Coaches: write to mano@sattvah.ai or ping the Sattvah Coaches WA group. Pro and Growth tiers get a one-business-day SLA.",
  },
];

export default function CoachHelpPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24 prose prose-slate">
      <h1>Coach Help</h1>
      <p className="text-muted-foreground">
        Operational help for Sattvah coaches. Need a person? Email{" "}
        <a href="mailto:mano@sattvah.ai">mano@sattvah.ai</a> or post in
        the Sattvah Coaches WhatsApp community.
      </p>

      {FAQS.map((f) => (
        <section key={f.id} id={f.id} className="not-prose mt-8">
          <h2 className="text-lg font-semibold">{f.q}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
        </section>
      ))}

      <hr className="my-10" />
      <p className="text-sm text-muted-foreground">
        Looking for client help? Visit <a href="/help">sattvah.ai/help</a>.
      </p>
    </div>
  );
}
