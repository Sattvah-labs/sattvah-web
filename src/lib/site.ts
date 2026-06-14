export const siteConfig = {
  name: "Sattvah",
  tagline: "A quieter place to feel heard.",
  description:
    "Sattvah is an emotional-support app and community where you can share what you're going through, read what others are working through, and book a session with a vetted listener, judgment-free.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sattvah.ai",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.sattvah.ai",
  iosAppUrl: process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/app/idTODO",
  androidAppUrl:
    process.env.NEXT_PUBLIC_ANDROID_APP_URL ||
    "https://play.google.com/store/apps/details?id=TODO",
  scheme: "sattvah://",
  twitter: "@sattvahapp",
} as const;

export type SiteConfig = typeof siteConfig;
