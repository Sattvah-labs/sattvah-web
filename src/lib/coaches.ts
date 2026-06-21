/**
 * Coach profile types + mock fixtures.
 *
 * At runtime, /c/[handle] tries to fetch from api.sattvah.ai. If the API
 * is unreachable (preview, offline, before the tenant API is wired) or
 * returns 404, we fall back to the bundled MOCK_COACHES so demos and
 * Playwright screenshots still render. Handles match section 6 of
 * sattvah-launch-data.md.
 */

export type CoachPlan = "free" | "pro" | "growth";

export type CoachProfile = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  handle: string;
  plan: CoachPlan;
  commission: number;
  pricePerMonthInr: number;
  language: string;
  clients: number;
  bio: string;
  /**
   * Whether to render the "Powered by Sattvah Labs" footer on this
   * coach's surfaces. Sattvah's own tenant sets this false; every
   * coach tenant defaults true.
   */
  parentLabsAttribution: boolean;
  photoUrl?: string;
};

// Mock seeds, ported 1:1 from sattvah-launch-data.md section 6.
export const MOCK_COACHES: CoachProfile[] = [
  {
    id: "t_coach_1",
    name: "Priya Sharma",
    specialty: "yoga",
    city: "Bangalore",
    handle: "priya-yoga",
    plan: "pro",
    commission: 5,
    pricePerMonthInr: 3000,
    language: "en,hi,ta",
    clients: 30,
    bio: "15 years of teaching slow yoga to people who don't think they are flexible enough.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_2",
    name: "Anjali Krishnan",
    specialty: "sleep",
    city: "Bangalore",
    handle: "anjali-sleep",
    plan: "free",
    commission: 12,
    pricePerMonthInr: 5000,
    language: "en,ta",
    clients: 20,
    bio: "Helps you fall asleep without scrolling. CBT-I trained.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_3",
    name: "Ravi Menon",
    specialty: "breathwork",
    city: "Mumbai",
    handle: "ravi-breath",
    plan: "pro",
    commission: 5,
    pricePerMonthInr: 4000,
    language: "en,hi,mr",
    clients: 40,
    bio: "Pranayama for people who sit in front of laptops all day.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_4",
    name: "Maya Iyer",
    specialty: "meditation",
    city: "Pune",
    handle: "maya-meditation",
    plan: "growth",
    commission: 2,
    pricePerMonthInr: 2500,
    language: "en,hi,mr",
    clients: 60,
    bio: "Daily 12-minute sittings. No mantra you can't pronounce.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_5",
    name: "Karan Singh",
    specialty: "sober",
    city: "Delhi",
    handle: "karan-sober",
    plan: "pro",
    commission: 5,
    pricePerMonthInr: 6000,
    language: "en,hi,pa",
    clients: 15,
    bio: "Quit for 9 years. Helps you do the same.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_6",
    name: "Deepa Reddy",
    specialty: "nutrition",
    city: "Hyderabad",
    handle: "deepa-nutrition",
    plan: "pro",
    commission: 5,
    pricePerMonthInr: 4500,
    language: "en,te,hi",
    clients: 35,
    bio: "South Indian food, weighed and loved.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_7",
    name: "Aditya Nair",
    specialty: "life",
    city: "Bangalore",
    handle: "aditya-life",
    plan: "growth",
    commission: 2,
    pricePerMonthInr: 8000,
    language: "en,hi,ml",
    clients: 12,
    bio: "1:1 weekly sessions for founders and operators.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_8",
    name: "Lakshmi Iyer",
    specialty: "women-wellness",
    city: "Chennai",
    handle: "lakshmi-women",
    plan: "free",
    commission: 12,
    pricePerMonthInr: 3500,
    language: "en,ta",
    clients: 50,
    bio: "Cycle-aware coaching. Made for Indian working women.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_9",
    name: "Vikram Joshi",
    specialty: "fitness",
    city: "Mumbai",
    handle: "vikram-fit",
    plan: "pro",
    commission: 5,
    pricePerMonthInr: 5500,
    language: "en,hi,mr",
    clients: 28,
    bio: "Strength for people over 40. No gym needed.",
    parentLabsAttribution: true,
  },
  {
    id: "t_coach_10",
    name: "Tanvi Mehta",
    specialty: "sleep-diary",
    city: "Ahmedabad",
    handle: "tanvi-sleep",
    plan: "pro",
    commission: 5,
    pricePerMonthInr: 3000,
    language: "en,gu,hi",
    clients: 45,
    bio: "Track your sleep without an Apple Watch. Diary-first.",
    parentLabsAttribution: true,
  },
];

const SPECIALTY_LABELS: Record<string, string> = {
  yoga: "Yoga",
  sleep: "Sleep coaching",
  breathwork: "Breathwork",
  meditation: "Meditation",
  sober: "Sober coaching",
  nutrition: "Nutrition",
  life: "Life coaching",
  "women-wellness": "Women's wellness",
  fitness: "Fitness",
  "sleep-diary": "Sleep + diary",
};

export function specialtyLabel(s: string): string {
  return SPECIALTY_LABELS[s] ?? s.replace(/-/g, " ");
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  bn: "Bengali",
  mr: "Marathi",
  gu: "Gujarati",
  ml: "Malayalam",
  pa: "Punjabi",
};

export function languageLabels(csv: string): string[] {
  return csv
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .map((c) => LANGUAGE_LABELS[c] ?? c);
}

export function findMockCoach(handle: string): CoachProfile | undefined {
  return MOCK_COACHES.find((c) => c.handle === handle);
}

/**
 * Fetches a coach profile by handle. Tries the live API first, then
 * falls back to the bundled mocks. Returns null only when both fail.
 *
 * Called at build time by /c/[handle]/page.tsx so the static export
 * ships every coach as a pre-rendered HTML file.
 */
export async function fetchCoach(handle: string): Promise<CoachProfile | null> {
  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sattvah.ai";
    const res = await fetch(`${apiBase}/c/${encodeURIComponent(handle)}`, {
      // Build-time fetch, no cache needed.
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as Partial<CoachProfile>;
      if (data && data.handle) {
        return {
          ...(data as CoachProfile),
          parentLabsAttribution: data.parentLabsAttribution ?? true,
        };
      }
    }
  } catch {
    // ignore, fall back to mocks
  }
  return findMockCoach(handle) ?? null;
}

export function planLabel(p: CoachPlan): string {
  if (p === "free") return "Sattvah Free";
  if (p === "pro") return "Sattvah Pro";
  return "Sattvah Growth";
}
