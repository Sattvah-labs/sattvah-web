import { siteConfig } from "./site";

export interface CommunityPost {
  id: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatarUrl?: string | null;
  title?: string;
  body: string;
  category?: string;
  createdAt?: string;
  reactionsCount?: number;
  repliesCount?: number;
  reactions?: Record<string, number>;
  isAnonymous?: boolean;
}

export interface CommunityReply {
  id: string;
  authorName?: string;
  authorAvatarUrl?: string | null;
  body: string;
  createdAt?: string;
}

export interface CommunityPostDetail extends CommunityPost {
  replies?: CommunityReply[];
}

export interface Expert {
  id: string;
  name: string;
  handle?: string;
  avatarUrl?: string | null;
  coverImageUrl?: string | null;
  headline?: string;
  bio?: string;
  categories?: string[];
  languages?: string[];
  yearsExperience?: number;
  pricePerSession?: number;
  currency?: string;
  ratingAverage?: number;
  ratingCount?: number;
  verified?: boolean;
}

interface FetchOptions {
  revalidate?: number;
}

/**
 * Backend returns either an array or `{ items: [...] }`. Normalize.
 */
function unwrap<T>(json: unknown, key: string): T[] {
  if (Array.isArray(json)) return json as T[];
  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;
    if (Array.isArray(obj[key])) return obj[key] as T[];
    if (Array.isArray(obj.items)) return obj.items as T[];
    if (Array.isArray(obj.data)) return obj.data as T[];
  }
  return [];
}

async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T | null> {
  const url = `${siteConfig.apiBaseUrl}${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: opts.revalidate ?? 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const json = await apiFetch<unknown>("/community/posts", { revalidate: 60 });
  return unwrap<CommunityPost>(json, "posts");
}

export async function getCommunityPost(id: string): Promise<CommunityPostDetail | null> {
  return apiFetch<CommunityPostDetail>(`/community/posts/${encodeURIComponent(id)}`, {
    revalidate: 60,
  });
}

export async function getExperts(category?: string): Promise<Expert[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  const json = await apiFetch<unknown>(`/experts${qs}`, { revalidate: 120 });
  return unwrap<Expert>(json, "experts");
}

export async function getExpert(id: string): Promise<Expert | null> {
  return apiFetch<Expert>(`/experts/${encodeURIComponent(id)}`, { revalidate: 120 });
}
