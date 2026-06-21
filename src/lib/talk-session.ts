/**
 * Lightweight "am I signed in?" hook for the /talk PWA surface.
 *
 * The rest of the site uses amazon-cognito-identity-js + a richer
 * AuthProvider, but /talk has to work in a static-export build that
 * doesn't yet pull in those modules. Instead we read the same
 * localStorage keys amazon-cognito-identity-js writes so that, once the
 * full AuthProvider lands (or the user already signed in via /signin),
 * /talk picks up the session automatically.
 *
 * Storage key shape (mirrored by lib/talk-api.hydrateSessionFromVerify):
 *   CognitoIdentityServiceProvider.<clientId>.LastAuthUser
 *   CognitoIdentityServiceProvider.<clientId>.<username>.idToken
 */
"use client";

import { useEffect, useState } from "react";

const CLIENT_ID =
  process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID || "66399mbe64i3useqp8ese1u8g2";

export type TalkSession = {
  username: string;
} | null;

function readSession(): TalkSession {
  if (typeof window === "undefined") return null;
  try {
    const prefix = `CognitoIdentityServiceProvider.${CLIENT_ID}`;
    const username = localStorage.getItem(`${prefix}.LastAuthUser`);
    if (!username) return null;
    const idToken = localStorage.getItem(`${prefix}.${username}.idToken`);
    if (!idToken) return null;
    return { username };
  } catch {
    return null;
  }
}

export function useTalkSession(): {
  session: TalkSession;
  hydrated: boolean;
  refresh: () => void;
} {
  const [session, setSession] = useState<TalkSession>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setHydrated(true);
    // Cross-tab updates (e.g. user signed out elsewhere).
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("CognitoIdentityServiceProvider")) {
        setSession(readSession());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    session,
    hydrated,
    refresh: () => setSession(readSession()),
  };
}
