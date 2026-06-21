/**
 * Crisis helpline catalogue, organised by ISO 3166-1 alpha-2 country code.
 *
 * Always available on /crisis — no login wall. Wellness apps that hide
 * crisis help behind auth get destroyed in reviews and (more importantly)
 * leave someone in distress staring at a sign-up form.
 *
 * Sources are official lines published by each org. Update verifyDate when
 * re-confirming a number; outdated helplines are worse than no helpline.
 */

export type Helpline = {
  name: string;
  phone?: string;
  text?: string; // SMS shortcode or "Text X to NNNN"
  hours: string; // e.g. "24/7" or "Mon-Fri 9am-5pm"
  languages?: string[];
  website?: string;
  note?: string;
  /** YYYY-MM-DD the line was last verified by us. */
  verifiedAt: string;
};

export type CountryHelplines = {
  code: string; // ISO alpha-2
  name: string;
  flag: string; // emoji
  helplines: Helpline[];
};

export const CRISIS_HELPLINES: Record<string, CountryHelplines> = {
  IN: {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    helplines: [
      {
        name: "iCALL (Psychosocial Helpline)",
        phone: "9152987821",
        hours: "Mon-Sat, 8am-10pm",
        languages: ["English", "Hindi", "Marathi", "Gujarati"],
        website: "https://icallhelpline.org",
        verifiedAt: "2026-06-15",
      },
      {
        name: "Vandrevala Foundation Helpline",
        phone: "18602662345",
        hours: "24/7",
        languages: ["English", "Hindi", "+10 Indian languages"],
        website: "https://www.vandrevalafoundation.com",
        verifiedAt: "2026-06-15",
      },
      {
        name: "KIRAN Helpline (Govt of India)",
        phone: "18005990019",
        hours: "24/7",
        languages: ["13 Indian languages"],
        verifiedAt: "2026-06-15",
      },
      {
        name: "AASRA",
        phone: "9820466726",
        hours: "24/7",
        languages: ["English", "Hindi"],
        website: "http://www.aasra.info",
        verifiedAt: "2026-06-15",
      },
    ],
  },
  US: {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    helplines: [
      {
        name: "988 Suicide & Crisis Lifeline",
        phone: "988",
        text: "Text 988",
        hours: "24/7",
        languages: ["English", "Spanish"],
        website: "https://988lifeline.org",
        verifiedAt: "2026-06-15",
      },
      {
        name: "Crisis Text Line",
        text: "Text HOME to 741741",
        hours: "24/7",
        languages: ["English", "Spanish"],
        website: "https://www.crisistextline.org",
        verifiedAt: "2026-06-15",
      },
    ],
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    helplines: [
      {
        name: "Samaritans",
        phone: "116123",
        hours: "24/7",
        website: "https://www.samaritans.org",
        verifiedAt: "2026-06-15",
      },
      {
        name: "SHOUT (text support)",
        text: "Text SHOUT to 85258",
        hours: "24/7",
        website: "https://giveusashout.org",
        verifiedAt: "2026-06-15",
      },
    ],
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    helplines: [
      {
        name: "9-8-8 Suicide Crisis Helpline",
        phone: "988",
        text: "Text 988",
        hours: "24/7",
        languages: ["English", "French"],
        website: "https://988.ca",
        verifiedAt: "2026-06-15",
      },
    ],
  },
  AU: {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    helplines: [
      {
        name: "Lifeline Australia",
        phone: "131114",
        text: "Text 0477 13 11 14",
        hours: "24/7",
        website: "https://www.lifeline.org.au",
        verifiedAt: "2026-06-15",
      },
      {
        name: "Beyond Blue",
        phone: "1300224636",
        hours: "24/7",
        website: "https://www.beyondblue.org.au",
        verifiedAt: "2026-06-15",
      },
    ],
  },
  SG: {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    helplines: [
      {
        name: "Samaritans of Singapore (SOS)",
        phone: "1767",
        text: "Text 9151 1767",
        hours: "24/7",
        website: "https://www.sos.org.sg",
        verifiedAt: "2026-06-15",
      },
    ],
  },
  AE: {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    helplines: [
      {
        name: "Estijaba (Department of Health Abu Dhabi)",
        phone: "8001717",
        hours: "24/7",
        verifiedAt: "2026-06-15",
      },
    ],
  },
};

/**
 * Befrienders Worldwide is the global fallback — they keep a directory of
 * crisis lines in 30+ countries. Shown when we can't detect a country or
 * the user picks "Other".
 */
export const GLOBAL_FALLBACK: Helpline = {
  name: "Befrienders Worldwide (global directory)",
  hours: "Varies by country",
  website: "https://befrienders.org",
  note: "Find a confidential listening line near you, in your language.",
  verifiedAt: "2026-06-15",
};

/**
 * Map common BCP-47 locale → country code. Used by the page on first
 * paint via navigator.language so we don't need a network call to guess
 * the user's country in 85% of cases.
 */
export function localeToCountry(locale: string): string | null {
  if (!locale) return null;
  const parts = locale.split(/[-_]/);
  // 1. Explicit region tag, e.g. "en-IN", "hi-IN"
  if (parts.length >= 2) {
    const region = parts[1].toUpperCase();
    if (CRISIS_HELPLINES[region]) return region;
  }
  // 2. Single language tag, fall back to a default-country guess
  const lang = parts[0].toLowerCase();
  switch (lang) {
    case "hi":
    case "ta":
    case "bn":
    case "te":
    case "kn":
    case "ml":
    case "mr":
    case "gu":
    case "pa":
    case "or":
      return "IN";
    case "en":
      return null; // ambiguous — let IP detection decide
    default:
      return null;
  }
}

export const COUNTRY_OPTIONS = Object.values(CRISIS_HELPLINES).map((c) => ({
  code: c.code,
  name: c.name,
  flag: c.flag,
}));
