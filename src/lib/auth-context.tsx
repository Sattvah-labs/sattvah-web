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
