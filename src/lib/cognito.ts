/**
 * Cognito web client. Same User Pool as the mobile + API.
 *
 * Token storage uses Cognito's built-in localStorage adapter — fine for
 * a static site since httpOnly cookies are not practical without a
 * server. JWT is read on each API call via getIdToken() and sent in the
 * Authorization header.
 */
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const POOL_ID =
  process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "ap-south-1_sTNifZZz1";
const CLIENT_ID =
  process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID || "66399mbe64i3useqp8ese1u8g2";
// Cognito Hosted UI domain (used for federated identity providers:
// Google + Sign In with Apple). The prefix is set on the user pool; we
// can swap it via env var when we cut over to a custom auth subdomain
// (e.g. auth.sattvah.ai) without touching call sites.
const HOSTED_UI_DOMAIN =
  process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI_DOMAIN ||
  "hissme-auth.auth.ap-south-1.amazoncognito.com";
const OAUTH_SCOPES = "openid email profile aws.cognito.signin.user.admin";

// Storage keys used by the federated callback to stash the PKCE code
// verifier + the post-auth redirect destination between the authorize
// redirect and the /auth/callback page render.
const PKCE_VERIFIER_KEY = "sattvah.oauth.codeVerifier";
const PKCE_STATE_KEY = "sattvah.oauth.state";
const POST_AUTH_NEXT_KEY = "sattvah.oauth.next";

let cachedPool: CognitoUserPool | null = null;

export function getPool(): CognitoUserPool {
  if (!cachedPool) {
    cachedPool = new CognitoUserPool({
      UserPoolId: POOL_ID,
      ClientId: CLIENT_ID,
    });
  }
  return cachedPool;
}

export type AuthUser = {
  sub: string;
  email: string;
  displayName: string;
};

export function getCurrentUser(): CognitoUser | null {
  return getPool().getCurrentUser();
}

export function getSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve) => {
    const user = getCurrentUser();
    if (!user) return resolve(null);
    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session || !session.isValid()) return resolve(null);
      resolve(session);
    });
  });
}

export async function getIdToken(): Promise<string | null> {
  const session = await getSession();
  return session ? session.getIdToken().getJwtToken() : null;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const session = await getSession();
  if (!session) return null;
  const payload = session.getIdToken().payload as Record<string, unknown>;
  return {
    sub: String(payload.sub || ""),
    email: String(payload.email || ""),
    displayName:
      String(payload.preferred_username || payload.given_name || payload.email || ""),
  };
}

export type SignUpInput = {
  email: string;
  password: string;
  displayName: string;
};

function generateCognitoUsername(): string {
  // Pool is configured with email-alias, so the Username MUST NOT be in
  // email format. Generate a u_<hex> shape that matches the existing
  // demo / platform admin convention. Sign-in still works by email
  // because email is registered as an alias attribute.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return (
    "u_" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

export function signUp(input: SignUpInput): Promise<{ userSub: string }> {
  return new Promise((resolve, reject) => {
    const attrs: CognitoUserAttribute[] = [
      new CognitoUserAttribute({ Name: "email", Value: input.email }),
      new CognitoUserAttribute({ Name: "given_name", Value: input.displayName }),
      new CognitoUserAttribute({ Name: "family_name", Value: "." }),
      new CognitoUserAttribute({ Name: "custom:tenantId", Value: "sattvah" }),
    ];
    const username = generateCognitoUsername();
    getPool().signUp(username, input.password, attrs, [], (err, result) => {
      if (err || !result) return reject(err || new Error("signUp returned no result"));
      resolve({ userSub: result.userSub });
    });
  });
}

export function confirmSignUp(email: string, code: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getPool() });
    user.confirmRegistration(code, true, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function resendConfirmationCode(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getPool() });
    user.resendConfirmationCode((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function signIn(email: string, password: string): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getPool() });
    const auth = new AuthenticationDetails({ Username: email, Password: password });
    user.authenticateUser(auth, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
      newPasswordRequired: () => {
        reject(new Error("New password required (admin-initiated reset). Use the app to complete sign-in."));
      },
    });
  });
}

export function signOut(): void {
  const user = getCurrentUser();
  if (user) user.signOut();
}

export function forgotPassword(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getPool() });
    user.forgotPassword({
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err),
    });
  });
}

export function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getPool() });
    user.confirmPassword(code, newPassword, {
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err),
    });
  });
}

// =================== Federated (Google / Apple) ===================

/**
 * Build the Hosted UI authorize URL for a federated provider and redirect
 * the browser there. We use the authorization-code flow with PKCE so the
 * client secret never has to live in the browser (the User Pool app
 * client is configured as public, no secret). The verifier is stashed in
 * sessionStorage and consumed by /auth/callback.
 *
 * `next` is the post-sign-in destination (e.g. /community). We persist it
 * separately because Cognito's `state` round-trip is sometimes mangled by
 * extension noise during OAuth redirects; pulling it from sessionStorage
 * gives us a deterministic fallback.
 */
async function startHostedUiFederation(
  providerName: "Google" | "SignInWithApple",
  next: string,
): Promise<void> {
  if (typeof window === "undefined") return;
  const verifier = generateCodeVerifier();
  const challenge = await sha256Base64Url(verifier);
  const state = generateCodeVerifier().slice(0, 32);
  sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
  sessionStorage.setItem(PKCE_STATE_KEY, state);
  sessionStorage.setItem(POST_AUTH_NEXT_KEY, next);

  const redirectUri = `${window.location.origin}/auth/callback`;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    identity_provider: providerName,
    scope: OAUTH_SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
  });
  window.location.assign(
    `https://${HOSTED_UI_DOMAIN}/oauth2/authorize?${params.toString()}`,
  );
}

export function signInWithGoogle(next: string = "/community"): Promise<void> {
  return startHostedUiFederation("Google", next);
}

export function signInWithApple(next: string = "/community"): Promise<void> {
  return startHostedUiFederation("SignInWithApple", next);
}

/**
 * Run after the Hosted UI redirects back to /auth/callback with a `code`
 * query param. Exchanges the code for tokens via the Cognito token
 * endpoint, then hydrates amazon-cognito-identity-js's localStorage so the
 * existing `getSession()`, `getIdToken()`, and `useAuth().refresh()`
 * surface the federated user identically to a password sign-in.
 */
export async function completeFederatedSignIn(code: string): Promise<{
  next: string;
}> {
  if (typeof window === "undefined") {
    throw new Error("completeFederatedSignIn must run in the browser.");
  }
  const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
  const next = sessionStorage.getItem(POST_AUTH_NEXT_KEY) || "/community";
  if (!verifier) {
    throw new Error("Missing PKCE verifier. Restart the sign-in flow.");
  }

  const redirectUri = `${window.location.origin}/auth/callback`;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
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
    error?: string;
    error_description?: string;
  };
  if (!res.ok || !data.id_token || !data.access_token || !data.refresh_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        `Token exchange failed (HTTP ${res.status})`,
    );
  }

  // Wipe the one-shot PKCE breadcrumbs.
  sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  sessionStorage.removeItem(PKCE_STATE_KEY);
  sessionStorage.removeItem(POST_AUTH_NEXT_KEY);

  hydrateCognitoLocalStorage(
    data.id_token,
    data.access_token,
    data.refresh_token,
  );
  return { next };
}

/**
 * Lay tokens into localStorage using the key shape amazon-cognito-identity-js
 * expects, so subsequent `getCurrentUser()` + `getSession()` calls treat
 * the federated user the same as an email/password sign-in.
 */
function hydrateCognitoLocalStorage(
  idToken: string,
  accessToken: string,
  refreshToken: string,
): void {
  const payload = decodeJwtPayload(idToken);
  const cognitoUsername = String(payload["cognito:username"] || payload.sub || "");
  if (!cognitoUsername) return;
  const prefix = `CognitoIdentityServiceProvider.${CLIENT_ID}`;
  localStorage.setItem(`${prefix}.LastAuthUser`, cognitoUsername);
  localStorage.setItem(`${prefix}.${cognitoUsername}.idToken`, idToken);
  localStorage.setItem(`${prefix}.${cognitoUsername}.accessToken`, accessToken);
  localStorage.setItem(`${prefix}.${cognitoUsername}.refreshToken`, refreshToken);
  localStorage.setItem(`${prefix}.${cognitoUsername}.clockDrift`, "0");
}

function decodeJwtPayload(jwt: string): Record<string, unknown> {
  const [, payload] = jwt.split(".");
  const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
  const json = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return JSON.parse(json) as Record<string, unknown>;
}

function generateCodeVerifier(): string {
  // RFC 7636 says verifiers are 43-128 chars of unreserved set. 64 bytes
  // of crypto-random base64url easily satisfies the entropy floor.
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
