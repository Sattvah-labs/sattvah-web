import type { Metadata } from "next";
import Link from "next/link";

import { DeepLinkButton } from "@/components/deep-link-button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Sattvah exists, who&rsquo;s building it, and how we think about safety, anonymity, and the line between peer support and professional care.",
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <Badge variant="outline" className="mb-4">About</Badge>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
        We&rsquo;re building the quiet corner of the internet we wish we&rsquo;d had.
      </h1>

      <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-foreground/85">
        <p>
          Sattvah started from a simple observation: the moments people most need to be heard
          rarely happen during business hours, and the existing options — a paid therapist
          weeks out, a vague journaling app, the chaos of social media — leave a gap.
        </p>
        <p>
          We wanted a place that&rsquo;s emotionally safer than a public feed, more
          immediate than a clinic, and warmer than an AI checkbox. So we built one.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight">Two ways to use Sattvah</h2>
        <p>
          <strong>Community</strong> — share what&rsquo;s heavy, anonymously or under your name.
          Read what others are working through. Reactions are quiet by design — no like counts
          racing across the screen.
        </p>
        <p>
          <strong>Experts</strong> — when you want more than peer support, book a session with
          a vetted listener or counsellor. Every expert is interviewed; we check
          credentials, not vibes.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight">What we&rsquo;re not</h2>
        <p>
          Sattvah isn&rsquo;t a crisis service. If you&rsquo;re in immediate danger, please
          contact your local emergency line or a crisis service in your country. We&rsquo;ll
          always be honest about where our help ends and professional care begins.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight">Privacy, simply</h2>
        <p>
          Anonymous posts stay anonymous — the experts and other members never see your name.
          We don&rsquo;t sell your data. We don&rsquo;t train AI on private chats. See our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
            privacy policy
          </Link>{" "}
          for specifics.
        </p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <DeepLinkButton label="Get the app" />
        <Link
          href="/community"
          className="inline-flex items-center justify-center rounded-full border border-input bg-background h-12 px-8 text-base hover:bg-secondary transition-colors"
        >
          Browse the community
        </Link>
      </div>
    </div>
  );
}
