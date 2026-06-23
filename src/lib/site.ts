// sattvah.ai is the corporate home of Sattvah Labs Pvt Ltd, the parent
// platform brand. Consumer wellness (the Sattvah app) lives at
// wells.sattvah.ai; the creator platform (Forge) lives at
// forge.sattvah.ai. This config drives the parent-brand surface.
export const siteConfig = {
  name: "Sattvah Labs",
  tagline: "Calm software for India.",
  description:
    "Sattvah Labs builds calm software for India. The operating layer for wellness coaches and creators, and the apps that sit on top.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sattvah.ai",
  // Tenant + sub-brand homes the parent surface links to.
  wellsUrl: process.env.NEXT_PUBLIC_WELLS_URL || "https://wells.sattvah.ai",
  forgeUrl: process.env.NEXT_PUBLIC_FORGE_URL || "https://forge.sattvah.ai",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.sattvah.ai",
  iosAppUrl: process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/app/idTODO",
  androidAppUrl:
    process.env.NEXT_PUBLIC_ANDROID_APP_URL ||
    "https://play.google.com/store/apps/details?id=TODO",
  scheme: "sattvah://",
  twitter: "@sattvahlabs",
} as const;

export type SiteConfig = typeof siteConfig;
