"use client";

import { useState } from "react";

import { useTalkSession } from "@/lib/talk-session";
import { DeepLinkBanner } from "@/components/talk/deep-link-banner";
import { FallbackTiles } from "@/components/talk/fallback-tiles";
import { MagicLinkForm } from "@/components/talk/magic-link-form";
import { MicButton } from "@/components/talk/mic-button";
import { ShareToWa } from "@/components/talk/share-to-wa";
import { SwRegister } from "@/components/talk/sw-register";

/**
 * Client-side shell. Renders one of two states:
 *
 *   1. unauthed -> magic-link form (phone + 6 digit code) inline. The
 *      page never bounces to /signin so forwarded WA links stay on
 *      sattvah.ai/talk.
 *   2. authed   -> mic centerpiece + 3 fallback tiles + share-to-WA
 *      trigger so anyone who tapped in from a forward can pay it
 *      forward.
 *
 * The banner at the top reads `?source=wa&content=<id>` and welcomes
 * the receiver before they sign in. No notification permission prompts.
 * No "install our PWA" prompts.
 */
export function TalkShell() {
  const { session, hydrated, refresh } = useTalkSession();
  // Track a post-magic-link greeting so we can address the user before
  // useTalkSession refreshes from localStorage.
  const [greeting, setGreeting] = useState<string | null>(null);

  const signedIn = !!session || !!greeting;

  return (
    <>
      <SwRegister />

      <div className="space-y-8 md:space-y-10">
        <DeepLinkBanner />

        {!hydrated ? (
          <div className="text-center text-foreground/65 py-12">Loading...</div>
        ) : signedIn ? (
          <>
            <section aria-labelledby="talk-hello" className="text-center">
              <h1
                id="talk-hello"
                className="font-semibold tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 3.25rem)" }}
              >
                Sattvah is listening.
              </h1>
              <p className="mt-2 text-base md:text-lg text-foreground/70">
                Tap the mic. Or pick one of the three below.
              </p>
            </section>

            <section
              aria-label="Voice"
              className="flex flex-col items-center py-4"
            >
              <MicButton />
            </section>

            <section aria-label="Other ways to start">
              <FallbackTiles />
            </section>

            <section
              aria-label="Share"
              className="flex justify-center pt-2"
              data-testid="share-section"
            >
              <ShareToWa
                contentId="welcome"
                text="A small thing that helped me today, thought you might like it too."
              />
            </section>
          </>
        ) : (
          <>
            <section aria-labelledby="talk-welcome" className="text-center">
              <h1
                id="talk-welcome"
                className="font-semibold tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 3.25rem)" }}
              >
                Let&apos;s talk.
              </h1>
              <p className="mt-2 text-base md:text-lg text-foreground/70">
                One tap, your phone, a code. That&apos;s it.
              </p>
            </section>

            <MagicLinkForm
              onAuthed={(name) => {
                setGreeting(name);
                refresh();
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
