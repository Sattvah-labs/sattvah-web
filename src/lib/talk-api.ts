/**
 * Client for the /talk PWA surface.
 *
 * The site ships as a Next.js static export (output: "export"), so we
 * cannot host POST handlers inside this repo. The three "endpoints"
 * referenced in /talk live on the existing backend at
 * NEXT_PUBLIC_API_BASE (api.sattvah.ai). This file is the thin browser
 * shim around them.
 *
 * Endpoint contract (server side, owned by api.sattvah.ai):
 *
 *   POST /api/auth/start-sms
 *     body: { phone: "+919xxxxxxxxx" }
 *     resp: { sessionId: string, mock?: boolean }
 *     side effect: MSG91 sends an OTP using the OTP_LOGIN DLT template.
 *
 *   POST /api/auth/verify-sms
 *     body: { sessionId: string, code: string, phone: string }
 *     resp: { idToken, accessToken, refreshToken, displayName }
 *     side effect: sets a session cookie for sattvah.ai; we ALSO mirror
 *                  the tokens into the amazon-cognito-identity-js
 *                  localStorage shape so useAuth() picks them up.
 *
 *   POST /api/voice/transcribe
 *     body: multipart (field "audio": Blob, "lang": "en")
 *     resp: { text: string, durationMs: number, mock?: boolean }
 *
 * For dev + Playwright the env flag NEXT_PUBLIC_TALK_MOCK=1 short
 * circuits every call with a fixture response so the surface is fully
 * usable before the backend ships.
 */
import { siteConfig } from "./site";

const MOCK = process.env.NEXT_PUBLIC_TALK_MOCK === "1";

export type StartSmsResp = { sessionId: string; mock?: boolean };
export type VerifySmsResp = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  displayName: string;
  mock?: boolean;
};
export type TranscribeResp = { text: string; durationMs: number; mock?: boolean };

function api(path: string): string {
  return `${siteConfig.apiBaseUrl}${path}`;
}

/**
 * E.164-ish normaliser. Accepts: 9876543210, +919876543210, 0 9876543210.
 * Returns +91... for 10-digit Indian numbers, raw +xx... for everything
 * else. Throws on anything that obviously isn't a phone number.
 */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    if (digits.length < 8) throw new Error("Phone number too short.");
    return digits;
  }
  const just = digits.replace(/^0+/, "");
  if (just.length === 10) return `+91${just}`;
  if (just.length === 12 && just.startsWith("91")) return `+${just}`;
  throw new Error("Enter a 10 digit mobile number.");
}

export async function startSms(phone: string): Promise<StartSmsResp> {
  if (MOCK) {
    return { sessionId: `mock-${Date.now().toString(36)}`, mock: true };
  }
  const res = await fetch(api("/api/auth/start-sms"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
    credentials: "include",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`start-sms failed (${res.status}): ${txt.slice(0, 200)}`);
  }
  return (await res.json()) as StartSmsResp;
}

export async function verifySms(
  sessionId: string,
  phone: string,
  code: string,
): Promise<VerifySmsResp> {
  if (MOCK) {
    if (code !== "123456") throw new Error("Wrong code. Try 123456 in mock mode.");
    return {
      idToken: "mock.id.token",
      accessToken: "mock.access.token",
      refreshToken: "mock.refresh.token",
      displayName: phone,
      mock: true,
    };
  }
  const res = await fetch(api("/api/auth/verify-sms"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, code, phone }),
    credentials: "include",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`verify-sms failed (${res.status}): ${txt.slice(0, 200)}`);
  }
  return (await res.json()) as VerifySmsResp;
}

export async function transcribe(audio: Blob, lang = "en"): Promise<TranscribeResp> {
  if (MOCK) {
    // Fixture: a calm one-liner so the UI has something to render. Real
    // STT lands in A18.
    return {
      text:
        "I just want to sit with this for a minute. Today felt heavier than I expected.",
      durationMs: 4200,
      mock: true,
    };
  }
  const form = new FormData();
  form.set("audio", audio, "clip.webm");
  form.set("lang", lang);
  const res = await fetch(api("/api/voice/transcribe"), {
    method: "POST",
    body: form,
    credentials: "include",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`transcribe failed (${res.status}): ${txt.slice(0, 200)}`);
  }
  return (await res.json()) as TranscribeResp;
}

/**
 * Mirror MSG91-verified tokens into amazon-cognito-identity-js's
 * localStorage so the existing useAuth() hook picks them up. The backend
 * verifySms handler issues Cognito-issued JWTs for the matched user so
 * the keys here are the same shape as the federated flow.
 */
export function hydrateSessionFromVerify(
  resp: VerifySmsResp,
  cognitoUsername: string,
): void {
  const CLIENT_ID =
    process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID || "66399mbe64i3useqp8ese1u8g2";
  const prefix = `CognitoIdentityServiceProvider.${CLIENT_ID}`;
  try {
    localStorage.setItem(`${prefix}.LastAuthUser`, cognitoUsername);
    localStorage.setItem(`${prefix}.${cognitoUsername}.idToken`, resp.idToken);
    localStorage.setItem(`${prefix}.${cognitoUsername}.accessToken`, resp.accessToken);
    localStorage.setItem(`${prefix}.${cognitoUsername}.refreshToken`, resp.refreshToken);
    localStorage.setItem(`${prefix}.${cognitoUsername}.clockDrift`, "0");
  } catch {
    // localStorage may be blocked (Safari private mode); silent fall back
    // to the http session cookie that the backend already set.
  }
}
