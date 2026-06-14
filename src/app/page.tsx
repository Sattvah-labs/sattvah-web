import Link from "next/link";
import { ArrowRight, Headphones, MessageCircle, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Pillars />
      <CommunityTeaser />
      <AppStoreCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-warm-radial">
      <div className="container py-20 md:py-28 lg:py-32 max-w-4xl text-center animate-fade-in">
        <Badge variant="accent" className="mb-6 text-xs uppercase tracking-wide">
          Now in early access
        </Badge>
        <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
          A quieter place to feel{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">heard.</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 h-3 bg-amber-soft -z-0 rounded-sm"
            />
          </span>
        </h1>
        <p className="mt-6 text-balance text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Sattvah is an emotional-support space where you can write what&rsquo;s on your mind,
          read what others are working through, and book time with a vetted listener — judgment-free.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/experts"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Find an expert
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/community"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Read community stories
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Free to read. Posting + booking happen inside the{" "}
          <Link href={siteConfig.iosAppUrl} className="underline underline-offset-4 hover:text-foreground">
            Sattvah app
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "12k+", label: "messages shared" },
    { value: "120+", label: "vetted listeners" },
    { value: "4.8/5", label: "average session rating" },
    { value: "24/7", label: "community open" },
  ];
  return (
    <section className="border-y border-border/50 bg-secondary/50">
      <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl md:text-3xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    {
      icon: MessageCircle,
      title: "Write what&rsquo;s heavy",
      body: "Anonymous or not. The community reads with care. Hateful replies don&rsquo;t make it past our moderation.",
    },
    {
      icon: Headphones,
      title: "Talk to a real listener",
      body: "Vetted experts across grief, burnout, relationships, queer identity, and more. Book a session in minutes.",
    },
    {
      icon: Sparkles,
      title: "Move at your pace",
      body: "Drop a hiss when it&rsquo;s urgent, journal when it&rsquo;s slow. No streaks, no pressure to perform wellness.",
    },
  ];
  return (
    <section className="container py-20 md:py-24">
      <div className="max-w-2xl mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Built for the moments words are hard to find.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          We&rsquo;re not another mood tracker. Sattvah meets you somewhere between a private journal
          and a trusted friend who happens to be qualified.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((p) => (
          <Card key={p.title}>
            <CardContent className="pt-6 space-y-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-soft text-foreground">
                <p.icon className="h-5 w-5" />
              </div>
              <h3
                className="text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CommunityTeaser() {
  return (
    <section className="bg-secondary/40 border-y border-border/50">
      <div className="container py-20 md:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <Badge variant="outline" className="mb-4">Community</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Real stories from people figuring it out, together.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl">
            Browse what the Sattvah community is sharing right now. No likes-as-currency,
            no doomscrolling — just honest writing and supportive replies.
          </p>
          <div className="mt-7">
            <Link
              href="/community"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              Open the community
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <Card className="rotate-[-1.5deg] hover:rotate-0 transition-transform">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Anonymous · 2h ago</p>
              <p className="leading-relaxed">
                &ldquo;I quit a job that was eating me alive and I&rsquo;m terrified, but for the first
                time in months I slept eight hours. Whatever happens next, that&rsquo;s a win.&rdquo;
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="accent">burnout</Badge>
                <Badge variant="secondary">42 replies</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4 ml-8 md:ml-16 rotate-[1deg] hover:rotate-0 transition-transform">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Priya · 6h ago</p>
              <p className="leading-relaxed">
                &ldquo;Therapist said something today that landed: &lsquo;you don&rsquo;t owe anyone
                the version of you they expected.&rsquo; Sitting with it.&rdquo;
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="accent">therapy</Badge>
                <Badge variant="secondary">18 replies</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function AppStoreCTA() {
  return (
    <section className="container py-20 md:py-24 text-center max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
        The full experience lives in the app.
      </h2>
      <p className="mt-4 text-muted-foreground text-lg text-balance">
        Posting, replying, and booking sessions all happen in Sattvah for iOS &amp; Android.
        This site is a window in — come on through.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={siteConfig.iosAppUrl}
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Download on the App Store
        </Link>
        <Link
          href={siteConfig.androidAppUrl}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Get it on Google Play
        </Link>
      </div>
    </section>
  );
}
