export const siteConfig = {
  name: "Sattvah",
  tagline: "Let's talk.",
  description:
    "A friend in your phone for the moments you need someone. Talk it out, read what others are working through, or sit with a real expert when you want one. Anonymous by default.",
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
