/**
 * Cross-surface silent SSO bootstrap for sattvah.ai (marketing site).
 *
 * The Sattvah surfaces (admin.sattvah.ai, learn.sattvah.ai, sattvah.ai)
 * all sit on the same Cognito User Pool. Once a user signs into any one
 * surface via Cognito Hosted UI, the browser holds a Cognito session
 * cookie scoped to hissme-auth.auth.ap-south-1.amazoncognito.com. Hitting
 * the /oauth2/authorize endpoint with prompt=none from a different
 * surface lets us silently mint a fresh code-grant for that surface
 * without showing the password screen.
 *
 * Marketing-site contract:
 *   - tryRestoreSession() NEVER blocks the page render. It runs as a
 *     fire-and-forget background restore.
 *   - On a fresh visit with no Cognito session, prompt=none returns
 *     ?error=login_required. We treat that as "stay signed out" and
 *     leave the header in its Sign in / Sign up state.
 *   - Token-refresh-grant is tried before the silent SSO redirect, since
 *     it avoids a round trip and a flash of the Cognito domain.
 *
 * Storage shape mirrors amazon-cognito-identity-js so the existing
 * `getCurrentUser()` + `getSession()` plumbing surfaces the user without
 * any changes to call sites.
 */

const POOL_CLIENT_ID =
  process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID || "66399mbe64i3useqp8ese1u8g2";
const HOSTED_UI_DOMAIN =
  process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI_DOMAIN ||
  "hissme-auth.auth.ap-south-1.amazoncognito.com";
const OAUTH_SCOPES = "openid email profile aws.cognito.signin.user.admin";

const SILENT_VERIFIER_KEY = "sattvah.web.silentSso.codeVerifier";
const SILENT_STATE_KEY = "sattvah.web.silentSso.state";
const SILENT_NEXT_KEY = "sattvah.web.silentSso.next";
const SILENT_LAST_ATTEMPT_KEY = "sattvah.web.silentSso.lastAttemptAt";
const SILENT_ATTEMPT_COOLDOWN_MS = 5 * 60 * 1000;

export type SilentRestoreOutcome =
  | "restored"
  | "refreshed"
  | "no_session"
  | "cooldown"
  | "redirecting"
  | "callback_handled"
  | "skipped";

/**
 * Best-effort session restore. Returns immediately if a valid id-token is
 * already in localStorage. Otherwise tries the refresh-token grant, then
 * (optionally) kicks off the prompt=none redirect. On the marketing site
 * we default `redirectOnMiss` to false so the user never sees the auth
 * domain flicker.
 */
export async function tryRestoreSession(
  opts: { redirectOnMiss?: boolean; next?: string } = {},
): Promise<SilentRestoreOutcome> {
  if (typeof window === "undefined") return "skipped";

  // If we landed back here from a silent SSO redirect, swallow the code.
  const callbackOutcome = await handleSilentCallbackIfPresent();
  if (callbackOutcome) return callbackOutcome;

  const tokens = readStoredTokens();
  if (tokens && !isJwtExpired(tokens.idToken)) {
    return "restored";
  }

  if (tokens?.refreshToken) {
    const refreshed = await tryRefreshGrant(tokens.refreshToken, tokens.cognitoUsername);
    if (refreshed) return "refreshed";
  }

  if (!opts.redirectOnMiss) {
    return "no_session";
  }

  // Cooldown so a hard-failed silent attempt does not infinite-loop on
  // the same page load when the user has actively signed out elsewhere.
  const lastAttempt = Number(localStorage.getItem(SILENT_LAST_ATTEMPT_KEY) || "0");
  if (lastAttempt && Date.now() - lastAttempt < SILENT_ATTEMPT_COOLDOWN_MS) {
    return "cooldown";
  }

  await silentSSOAttempt(opts.next ?? window.location.pathname + window.location.search);
  return "redirecting";
}

/**
 * Build the prompt=none authorize URL and redirect the browser. The
 * Hosted UI either issues a fresh code (we land back at the current
 * page) or bounces back with `?error=login_required` when no Cognito
 * session exists. Callers must persist any local UI state before this
 * runs because it triggers a full-page navigation.
 */
export async function silentSSOAttempt(next: string): Promise<void> {
  if (typeof window === "undefined") return;
  const verifier = generateCodeVerifier();
  const challenge = await sha256Base64Url(verifier);
  const state = generateCodeVerifier().slice(0, 32);

  sessionStorage.setItem(SILENT_VERIFIER_KEY, verifier);
  sessionStorage.setItem(SILENT_STATE_KEY, state);
  sessionStorage.setItem(SILENT_NEXT_KEY, next);
  localStorage.setItem(SILENT_LAST_ATTEMPT_KEY, String(Date.now()));

  const redirectUri = window.location.origin + window.location.pathname;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: POOL_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: OAUTH_SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
    prompt: "none",
  });
  window.location.assign(
    `https://${HOSTED_UI_DOMAIN}/oauth2/authorize?${params.toString()}`,
  );
}

/**
 * If the current URL has a `code` + `state` pair that matches a silent
 * attempt we kicked off, exchange the code for tokens, lay them into
 * localStorage, then strip the query params and navigate back to the
 * page the user was on. login_required (or any other ?error=) means the
 * Hosted UI had no session: drop the breadcrumb, leave the UI alone.
 */
async function handleSilentCallbackIfPresent(): Promise<SilentRestoreOutcome | null> {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const stateParam = url.searchParams.get("state");
  const errorParam = url.searchParams.get("error");
  const storedState = sessionStorage.getItem(SILENT_STATE_KEY);

  if (errorParam && storedState && stateParam === storedState) {
    clearSilentBreadcrumbs();
    cleanQueryParams();
    return "no_session";
  }

  if (!code || !stateParam || !storedState || stateParam !== storedState) {
    return null;
  }

  const verifier = sessionStorage.getItem(SILENT_VERIFIER_KEY);
  const next = sessionStorage.getItem(SILENT_NEXT_KEY) || "/";
  if (!verifier) {
    clearSilentBreadcrumbs();
    return null;
  }

  const redirectUri = window.location.origin + window.location.pathname;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: POOL_CLIENT_ID,
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });
  const res = await fetch(`https://${HOSTED_UI_DOMAIN}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await res.json().catch(() => ({}))) as {
    id_token?: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
  };
  clearSilentBreadcrumbs();

  if (!res.ok || !data.id_token || !data.access_token || !data.refresh_token) {
    cleanQueryParams();
    return "no_session";
  }

  hydrateCognitoLocalStorage(data.id_token, data.access_token, data.refresh_token);
  // Replace the current URL with the original target so the user keeps
  // their context (no full reload, no auth-domain flash).
  const target = new URL(next, window.location.origin);
  window.history.replaceState(null, "", target.pathname + target.search + target.hash);
  return "callback_handled";
}

async function tryRefreshGrant(
  refreshToken: string,
  cognitoUsername: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: POOL_CLIENT_ID,
    refresh_token: refreshToken,
  });
  try {
    const res = await fetch(`https://${HOSTED_UI_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as {
      id_token?: string;
      access_token?: string;
      refresh_token?: string;
    };
    if (!data.id_token || !data.access_token) return false;
    hydrateCognitoLocalStorage(
      data.id_token,
      data.access_token,
      data.refresh_token || refreshToken,
      cognitoUsername,
    );
    return true;
  } catch {
    return false;
  }
}

type StoredTokens = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  cognitoUsername: string;
};

function readStoredTokens(): StoredTokens | null {
  if (typeof window === "undefined") return null;
  const prefix = `CognitoIdentityServiceProvider.${POOL_CLIENT_ID}`;
  const cognitoUsername = localStorage.getItem(`${prefix}.LastAuthUser`);
  if (!cognitoUsername) return null;
  const idToken = localStorage.getItem(`${prefix}.${cognitoUsername}.idToken`);
  const accessToken = localStorage.getItem(`${prefix}.${cognitoUsername}.accessToken`);
  const refreshToken = localStorage.getItem(`${prefix}.${cognitoUsername}.refreshToken`);
  if (!idToken || !accessToken || !refreshToken) return null;
  return { idToken, accessToken, refreshToken, cognitoUsername };
}

function hydrateCognitoLocalStorage(
  idToken: string,
  accessToken: string,
  refreshToken: string,
  fallbackUsername?: string,
): void {
  if (typeof window === "undefined") return;
  const payload = decodeJwtPayload(idToken);
  const cognitoUsername =
    String(payload["cognito:username"] || payload.sub || fallbackUsername || "");
  if (!cognitoUsername) return;
  const prefix = `CognitoIdentityServiceProvider.${POOL_CLIENT_ID}`;
  localStorage.setItem(`${prefix}.LastAuthUser`, cognitoUsername);
  localStorage.setItem(`${prefix}.${cognitoUsername}.idToken`, idToken);
  localStorage.setItem(`${prefix}.${cognitoUsername}.accessToken`, accessToken);
  localStorage.setItem(`${prefix}.${cognitoUsername}.refreshToken`, refreshToken);
  localStorage.setItem(`${prefix}.${cognitoUsername}.clockDrift`, "0");
}

function clearSilentBreadcrumbs(): void {
  sessionStorage.removeItem(SILENT_VERIFIER_KEY);
  sessionStorage.removeItem(SILENT_STATE_KEY);
  sessionStorage.removeItem(SILENT_NEXT_KEY);
}

function cleanQueryParams(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  url.searchParams.delete("error");
  url.searchParams.delete("error_description");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

function isJwtExpired(jwt: string): boolean {
  const payload = decodeJwtPayload(jwt);
  const exp = typeof payload.exp === "number" ? payload.exp : 0;
  // 30s buffer so a token that is about to expire on the wire is treated
  // as already gone. Keeps refresh + restore from racing.
  return !exp || exp * 1000 < Date.now() + 30_000;
}

function decodeJwtPayload(jwt: string): Record<string, unknown> {
  try {
    const [, payload] = jwt.split(".");
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function generateCodeVerifier(): string {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

async function sha256Base64Url(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
