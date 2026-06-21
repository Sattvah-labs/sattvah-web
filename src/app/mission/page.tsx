import type { Metadata } from "next";
import Link from "next/link";

import { GradientWord } from "@/components/gradient-word";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "What Sattvah is building toward: emotional support that fits inside the moments people actually have.",
};

export default function MissionPage() {
  return (
    <article className="container max-w-2xl py-16 md:py-24 overflow-x-clip animate-fade-in">
      <Badge variant="outline" className="mb-5">Mission</Badge>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
        A place to put it down, for <GradientWord>everyone</GradientWord>.
      </h1>

      <div className="mt-12 text-[17px] md:text-lg leading-[1.85] text-foreground/85 [&>h2]:scroll-mt-24">
        <h2 className="mt-0 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          Our mission
        </h2>
        <p className="text-pretty mb-7">
          We meet people in the moments they need to be heard. The phone in
          their hand, the late hour, the small heavy thing they don&rsquo;t
          want to call a friend about. We help them feel less alone for one
          quiet minute, and we point them at real human care when a minute
          isn&rsquo;t enough.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          Our vision
        </h2>
        <p className="text-pretty mb-7">
          A generation that talks about heavy days the way they talk about
          tired feet. Without shame, without ceremony, without waiting until
          something has a clinical name. Sattvah, the quiet thing you reach
          for at 2am, the way you reach for water.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          Why India first
        </h2>
        <p className="text-pretty mb-6">
          India is where the gap is widest and the stigma is heaviest. One
          psychiatrist per 100,000 people. A culture that values keeping
          things inside. Phones in every pocket, even where therapists are
          an eight-hour bus ride away.
        </p>
        <p className="text-pretty mb-6">
          The same tools that brought the rest of the internet here can
          bring this, if it&rsquo;s built right and built here.
        </p>
        <p className="text-pretty mb-7">
          Indian languages are not an afterthought. They&rsquo;re on
          our shipping roadmap, not our backlog. We price in rupees. We
          study the small everyday rituals that make Indian life feel
          held, chai with mom, a long walk, a call you didn&rsquo;t plan,
          and design Sattvah to sit beside them, not replace them.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          How we operate
        </h2>
        <p className="text-pretty mb-7">
          We&rsquo;d rather take one extra day to ship something a 17-year-old
          at 2am won&rsquo;t regret using than win a launch week.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          What we will not do
        </h2>
        <ul className="space-y-3 pl-0 list-none mb-7">
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>Your conversations are yours. We don&rsquo;t sell ads, and we don&rsquo;t train our AI on your private chats.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>We won&rsquo;t replace human support. Where a person is what you need, we&rsquo;ll show you how to find one.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>We won&rsquo;t gamify being okay. No streaks, no badges, no productivity theatre.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>We won&rsquo;t pretend Sattvah is a clinical service. It isn&rsquo;t. We point you at real care when you need it.</span></li>
        </ul>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          How we measure success
        </h2>
        <p className="text-pretty mb-2">
          Not session count. Not time-in-app. Not retention curves. Just one
          question: did someone feel less alone today than they did before
          they opened it?
        </p>
      </div>

      <div className="mt-14 flex flex-col sm:flex-row gap-3">
        <Link
          href="/founder"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Meet the founder
        </Link>
        <Link
          href="/community"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Browse the community
        </Link>
      </div>
    </article>
  );
}
