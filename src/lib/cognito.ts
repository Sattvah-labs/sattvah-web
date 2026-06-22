/**
 * Thin re-export over the shared sattvah-auth library. Kept so legacy
 * import paths inside sattvah-web keep working; new code should import
 * from "@/lib/sattvah-auth" directly. The library is symlinked from
 * sattvah-admin/src/lib/sattvah-auth -- treat any change to it as a
 * multi-repo change.
 *
 * Previously this file hand-rolled the amazon-cognito-identity-js
 * wrapper + Hosted UI federation. Both flows are now owned by the
 * shared lib.
 */

import {
  classifyError,
  clearTokens,
  confirmSignUp as sattvahConfirmSignUp,
  decodeIdToken,
  exchangeCode,
  getValidIdToken,
  loadTokens,
  resendCode,
  signIn as sattvahSignIn,
  signInWithApple as sattvahSignInWithApple,
  signInWithGoogle as sattvahSignInWithGoogle,
  signOut as sattvahSignOut,
  signUp as sattvahSignUp,
  startPasswordReset,
  confirmPasswordReset,
} from "@/lib/sattvah-auth";

export type AuthUser = {
  sub: string;
  email: string;
  displayName: string;
};

export type SignUpInput = {
  email: string;
  password: string;
  displayName: string;
  intent?: "customer" | "coach";
  consents?: { termsAt: string; privacyAt: string };
};

export async function getIdToken(): Promise<string | null> {
  return getValidIdToken();
}

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!loadTokens()) return null;
  const payload = decodeIdToken();
  if (!payload) return null;
  return {
    sub: String(payload.sub || ""),
    email: String(payload.email || ""),
    displayName: String(
      payload.preferred_username || payload.given_name || payload.email || "",
    ),
  };
}

export function signUp(input: SignUpInput): Promise<{ userSub: string; username: string }> {
  return sattvahSignUp(input);
}

// confirmSignUp + resendConfirmationCode MUST be called with the
// opaque Cognito Username (u_<hex>), NOT the email. See audit B2.
export function confirmSignUp(username: string, code: string): Promise<void> {
  return sattvahConfirmSignUp(username, code);
}

export function resendConfirmationCode(username: string): Promise<void> {
  return resendCode(username);
}

export async function signIn(emailOrUsername: string, password: string): Promise<void> {
  await sattvahSignIn(emailOrUsername, password);
}

export function signOut(): void {
  // Caller decides whether to redirect; we just clear local tokens.
  // The Hosted UI session cookie is cleared via the /logout endpoint,
  // which sattvahSignOut() navigates to. sattvah-web's auth-context
  // historically called this as a side-effect-only function, so the
  // legacy contract is preserved by NOT redirecting when a caller just
  // wants to clear state.
  clearTokens();
}

export function signOutAndRedirect(): void {
  sattvahSignOut();
}

export function forgotPassword(email: string): Promise<void> {
  return startPasswordReset(email);
}

export function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string,
): Promise<void> {
  return confirmPasswordReset(email, code, newPassword);
}

export function signInWithGoogle(next: string = "/community"): Promise<void> {
  return sattvahSignInWithGoogle(next);
}

export function signInWithApple(next: string = "/community"): Promise<void> {
  return sattvahSignInWithApple(next);
}

export async function completeFederatedSignIn(code: string): Promise<{ next: string }> {
  // The lib's exchangeCode + consumeReturnTo own the round-trip. We
  // shape the return to match the previous wire so /auth/callback does
  // not need rewriting.
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const state = params.get("state") ?? "";
  await exchangeCode(code, state);
  // The lib stamps a `returnTo` into sessionStorage during startLogin;
  // exposing the consumer here lets the callback page navigate.
  const next = consumeStashedNext();
  return { next };
}

function consumeStashedNext(): string {
  // sattvah-web previously stashed the post-auth target under a
  // dedicated key; the lib now uses sattvah.auth.pkce.returnTo.
  // consumeReturnTo() returns "/" when the key is missing, which the
  // legacy /community fallback already handled at the caller.
  if (typeof sessionStorage === "undefined") return "/community";
  const v = sessionStorage.getItem("sattvah.auth.pkce.returnTo") ?? "/community";
  try {
    sessionStorage.removeItem("sattvah.auth.pkce.returnTo");
  } catch {
    // ignore
  }
  return v;
}

export { classifyError };
