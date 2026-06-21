/**
 * Thin API client for sattvah-web.
 *
 * Public reads hit /v1/public/community/* with no auth.
 * Authed reads + every write attach the Cognito Id token from
 * amazon-cognito-identity-js localStorage session.
 */
import { siteConfig } from "./site";
import { getIdToken } from "./cognito";

export type PublicPost = {
  id: string;
  authorId?: string;
  authorName: string;
  authorPersona?: string;
  authorAvatarUrl?: string;
  isAnonymous: boolean;
  title: string;
  body: string;
  /** Optional hero image. When present, renders above the body excerpt
   *  on feed cards and above the body on the post detail page. */
  imageUrl?: string;
  topic: string;
  subTheme?: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  downvotes: number;
  replyCount: number;
};

export type PublicReply = {
  id: string;
  postId: string;
  authorId?: string;
  authorName: string;
  authorPersona?: string;
  authorAvatarUrl?: string;
  isAnonymous: boolean;
  body: string;
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  downvotes: number;
};

export type PublicTopic = { id: string; label: string };

async function publicGet<T>(path: string): Promise<T> {
  const res = await fetch(`${siteConfig.apiBaseUrl}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

async function authedFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = await getIdToken();
  if (!token) throw new Error("Not signed in");
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${siteConfig.apiBaseUrl}${path}`, { ...init, headers });
}

export const publicApi = {
  listPosts: (topic?: string, limit?: number) =>
    publicGet<{ items: PublicPost[]; nextCursor: string }>(
      `/v1/public/community/posts?${topic ? `topic=${encodeURIComponent(topic)}&` : ""}${limit ? `limit=${limit}` : ""}`,
    ),
  getPost: (id: string) =>
    publicGet<{ post: PublicPost; replies: PublicReply[] }>(
      `/v1/public/community/posts/${encodeURIComponent(id)}`,
    ),
  listTopics: () =>
    publicGet<{ items: PublicTopic[] }>(`/v1/public/community/categories`),
  /** Similar posts = same topic, exclude the current one, take N. The
   *  backend doesn't yet have a similarity endpoint, so this is a thin
   *  filter on top of listPosts. Returns at most `limit` items. */
  similarPosts: async (currentId: string, topic: string, limit = 3) => {
    const { items } = await publicGet<{ items: PublicPost[]; nextCursor: string }>(
      `/v1/public/community/posts?topic=${encodeURIComponent(topic)}&limit=${limit + 1}`,
    );
    return items.filter((p) => p.id !== currentId).slice(0, limit);
  },
};

export const authedApi = {
  me: () => authedFetch("/me").then((r) => r.json()),
  votePost: (postId: string, value: 1 | -1) =>
    authedFetch(`/community/posts/${encodeURIComponent(postId)}/vote`, {
      method: "POST",
      body: JSON.stringify({ value }),
    }),
  savePost: (postId: string) =>
    authedFetch(`/community/saved/posts/${encodeURIComponent(postId)}`, {
      method: "POST",
    }),
  unsavePost: (postId: string) =>
    authedFetch(`/community/saved/posts/${encodeURIComponent(postId)}`, {
      method: "DELETE",
    }),
  replyToPost: (postId: string, body: string, isAnonymous: boolean) =>
    authedFetch(`/community/posts/${encodeURIComponent(postId)}/replies`, {
      method: "POST",
      body: JSON.stringify({ body, isAnonymous }),
    }),
  createPost: (
    title: string,
    body: string,
    topic: string,
    isAnonymous: boolean,
  ) =>
    authedFetch(`/community/posts`, {
      method: "POST",
      body: JSON.stringify({ title, body, topic, isAnonymous }),
    }),
  deletePost: (postId: string) =>
    authedFetch(`/community/posts/${encodeURIComponent(postId)}`, {
      method: "DELETE",
    }),
  followAuthor: (userId: string) =>
    authedFetch(`/community/follow/users/${encodeURIComponent(userId)}`, {
      method: "POST",
    }),
};
