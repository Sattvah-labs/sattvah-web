"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AuthUser,
  getAuthUser,
  getIdToken as getCognitoIdToken,
  signOut as cognitoSignOut,
} from "@/lib/cognito";
import { tryRestoreSession } from "@/lib/silentSSO";

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => void;
  getIdToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const u = await getAuthUser();
    setUser(u);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Marketing site: silent SSO runs in the background. We never
        // block render on a redirect, so redirectOnMiss stays false. The
        // restore covers two cases:
        //   1. amazon-cognito-identity-js already has valid tokens, so
        //      tryRestoreSession() is a no-op fast path.
        //   2. The id token expired but the refresh token still works,
        //      in which case we silently exchange and rehydrate.
        // A miss simply leaves the header in its Sign in state.
        await tryRestoreSession({ redirectOnMiss: false });
        await refresh();
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      refresh,
      signOut: () => {
        cognitoSignOut();
        setUser(null);
      },
      getIdToken: getCognitoIdToken,
    }),
    [user, loading, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
