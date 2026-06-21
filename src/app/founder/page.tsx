import type { Metadata } from "next";
import Link from "next/link";

import { GradientWord } from "@/components/gradient-word";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "Why Mano is building Sattvah, who it's for, and what he believes about emotional support.",
};

export default function FounderPage() {
  return (
    <article className="container max-w-2xl py-16 md:py-24 overflow-x-clip animate-fade-in">
      <Badge variant="outline" className="mb-5">Founder</Badge>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-balance">
        A friend, in your phone, made by <GradientWord>one person</GradientWord>.
      </h1>
      <p className="mt-4 text-base text-muted-foreground">By Mano, founder of Sattvah Labs</p>

      <div className="mt-12 text-[17px] md:text-lg leading-[1.85] text-foreground/85 [&>h2]:scroll-mt-24">
        <p className="text-pretty mb-7">
          I built Sattvah because I noticed something quiet: the moments you
          most need someone almost never happen between 9 and 5. It&rsquo;s
          11pm on a Sunday. It&rsquo;s the morning you didn&rsquo;t sleep.
          It&rsquo;s the news you can&rsquo;t share with your mom. It&rsquo;s
          the good week you&rsquo;re scared to trust. None of that fits
          inside a calendar invite with a counsellor three weeks out.
        </p>

        <p className="text-pretty mb-7">
          The existing options leave a gap. A paid therapist is great when
          you can afford one and the wait. A meditation app helps with the
          body but not the moment you want to be heard. Social media will
          give you noise and judgment. And the people who love you
          aren&rsquo;t always available at the hour the thought arrives.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          What I believe
        </h2>
        <ul className="space-y-3 pl-0 list-none mb-7">
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>You don&rsquo;t need to be diagnosed with something to deserve being heard.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>Most heavy days are not a crisis. They&rsquo;re a tuesday. A tuesday still deserves company.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>Anonymous, careful, slow. Not gamified. Not addictive. Not productive.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>If a person, not a chat, is what you need, we should help you find that too.</span></li>
          <li className="flex gap-3"><span className="text-accent shrink-0 leading-[1.85]">·</span><span>India deserves this in our languages, our pricing, our cultural context &mdash; not as an afterthought to a US-shaped product.</span></li>
        </ul>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          Who I&rsquo;m building it for
        </h2>
        <p className="text-pretty mb-7">
          People like the ones I love. Friends who carry a lot but call it
          nothing. People who would never download a &ldquo;mental health
          app&rdquo; but might download a friend. The 11pm thinker. The
          person who&rsquo;d journal if they could find the words. The expat
          who keeps the call short so their mom doesn&rsquo;t worry. The
          student who hasn&rsquo;t slept properly in three days. People who
          already do the work of being okay, and just want someone to sit
          with them while they do it.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          Why solo
        </h2>
        <p className="text-pretty mb-7">
          I&rsquo;m one person. No funding. I write the code, I write the
          words, I take the feedback, I send the emails. I do it this way
          because Sattvah needs a voice and a point of view, not a board
          meeting. I&rsquo;m optimising for one user feeling understood at
          2am, not for hockey-stick graphs. If that sounds like the right
          thing to you, you&rsquo;re going to like what we&rsquo;re building.
        </p>

        <h2 className="mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          What&rsquo;s coming
        </h2>
        <p className="text-pretty mb-7">
          Indian languages first (Hindi, Tamil, Bengali on the way). Better
          remembering, so Sattvah holds the small details that mattered to
          you last week. A quiet, growing community. Real experts you can
          book without a referral. And nothing else. No streaks. No badges.
          No ads. Ever.
        </p>

        <p className="pt-2 text-foreground/65 italic">
          If you want to reach me directly,{" "}
          <a
            href="mailto:mano@sattvah.ai"
            className="text-foreground underline underline-offset-4 hover:text-accent transition-colors not-italic"
          >
            mano@sattvah.ai
          </a>
          . I read every email.
        </p>
      </div>

      <div className="mt-14 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          See what we&rsquo;ve built
        </Link>
        <Link
          href="/mission"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Read our mission
        </Link>
      </div>
    </article>
  );
}
