"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Plus,
  User,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { publicApi, PublicPost, PublicTopic } from "@/lib/api";
import { SignInPrompt } from "@/components/sign-in-prompt";
import { CommunityNudge } from "@/components/community-nudge";

type GuestFilter = string; // topic ID or ""
type AuthedFilter = "recent" | "my-posts" | "saved" | "following";

const guestSecondary = [
  { id: "recent", label: "Recent" },
  { id: "top", label: "Top this week" },
] as const;

const authedSecondary = [
  { id: "recent", label: "Recent" },
  { id: "my-posts", label: "My posts" },
  { id: "saved", label: "Saved" },
  { id: "following", label: "Following" },
] as const;

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth();
  const [topics, setTopics] = useState<PublicTopic[]>([]);
  const [activeTopic, setActiveTopic] = useState<GuestFilter>("");
  const [activeSecondary, setActiveSecondary] = useState<AuthedFilter>("recent");
  const [posts, setPosts] = useState<PublicPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<{ open: boolean; reason: string }>({ open: false, reason: "to react" });

  function openPrompt(reason: string) {
    setPrompt({ open: true, reason });
  }
  function closePrompt() {
    setPrompt((p) => ({ ...p, open: false }));
  }

  useEffect(() => {
    publicApi.listTopics().then(({ items }) => setTopics(items)).catch(() => {
      setTopics([
        { id: "", label: "Recent" },
        { id: "anxiety", label: "Heavy days" },
        { id: "relationships", label: "Relationships" },
        { id: "work", label: "Work" },
        { id: "mental-health", label: "Inner life" },
        { id: "self-growth", label: "Growth" },
        { id: "other", label: "Other" },
      ]);
    });
  }, []);

  const fetchPosts = useCallback(async () => {
    setPosts(null);
    setError(null);
    try {
      const { items } = await publicApi.listPosts(activeTopic || undefined);
      setPosts(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setPosts([]);
    }
  }, [activeTopic]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const isGuest = !authLoading && !user;
  const isAuthed = !!user;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {isGuest && (
        <div className="mb-6 -mx-4 px-4 py-2.5 bg-accent/10 border-y border-accent/30 text-sm text-foreground/80 text-center">
          You&rsquo;re browsing as a guest. Reading is open. Reacting, replying, and posting need a sign-in.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_280px] gap-8">
        {/* LEFT NAV */}
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Browse</div>
            <ul className="space-y-1">
              {topics.map((t) => (
                <li key={t.id || "recent-all"}>
                  <button
                    onClick={() => setActiveTopic(t.id)}
                    className={`flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${
                      activeTopic === t.id
                        ? "bg-foreground/5 font-medium"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>

            {isAuthed ? (
              <>
                <div className="mt-8 text-xs uppercase tracking-widest text-muted-foreground mb-3">For you</div>
                <ul className="space-y-1">
                  {authedSecondary.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => setActiveSecondary(s.id as AuthedFilter)}
                        className={`flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${
                          activeSecondary === s.id
                            ? "bg-foreground/5 font-medium"
                            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="mt-8 text-xs uppercase tracking-widest text-muted-foreground mb-3">Sort</div>
                <ul className="space-y-1">
                  {guestSecondary.map((s) => (
                    <li key={s.id}>
                      <button
                        className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>

        {/* CENTER */}
        <section>
          {/* Composer */}
          <button
            onClick={() => (isAuthed ? alert("Compose form coming soon") : openPrompt("to share what's on your mind"))}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 mb-5 transition-all hover:border-foreground/15 hover:shadow-[0_18px_50px_-20px_rgba(15,23,42,0.10)]"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-foreground/60 text-base">Share what&rsquo;s on your mind…</p>
            </div>
          </button>

          {/* Feed */}
          {posts === null ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              <p className="text-base">Nothing here yet.</p>
              <p className="text-sm mt-1">Try a different topic.</p>
            </div>
          ) : (
            posts.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                isAuthed={isAuthed}
                onGated={openPrompt}
              />
            ))
          )}
        </section>

        {/* RIGHT */}
        <aside className="hidden md:block">
          <div className="sticky top-24 space-y-5">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">About Sattvah</div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                A quiet place for the moments words are hard to find. Read, react, and reply, anonymously if you want.
              </p>
              {!isAuthed && (
                <div className="mt-4 space-y-2">
                  <Link
                    href="/signin?next=/community"
                    className="block w-full rounded-full bg-accent text-accent-foreground h-10 text-sm font-medium inline-flex items-center justify-center shadow-[0_10px_40px_-12px_hsl(36_92%_58%/0.55)] hover:shadow-[0_14px_50px_-12px_hsl(36_92%_58%/0.75)] transition-shadow"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup?next=/community"
                    className="block w-full rounded-full border border-border bg-card h-10 text-sm font-medium inline-flex items-center justify-center hover:bg-foreground/5"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What you can do</div>
              <ul className="text-sm space-y-2.5 text-foreground/80">
                <li className="flex items-start gap-2"><span className="text-accent">·</span> Read every post and reply</li>
                <li className="flex items-start gap-2"><span className="text-accent">·</span> Browse by topic</li>
                <li className={`flex items-start gap-2 ${isAuthed ? "" : "text-muted-foreground"}`}>
                  <span className={isAuthed ? "text-accent" : "text-muted-foreground"}>·</span>
                  React, reply, save{isAuthed ? "" : " (sign-in)"}
                </li>
                <li className={`flex items-start gap-2 ${isAuthed ? "" : "text-muted-foreground"}`}>
                  <span className={isAuthed ? "text-accent" : "text-muted-foreground"}>·</span>
                  Post your own{isAuthed ? "" : " (sign-in)"}
                </li>
              </ul>
            </div>

            <div className="text-xs text-muted-foreground px-2">
              Anonymous by default. No ads. No tracking pixels. We don&rsquo;t sell your data.
            </div>
          </div>
        </aside>
      </div>

      <SignInPrompt open={prompt.open} reason={prompt.reason} onClose={closePrompt} />
      <CommunityNudge isGuest={isGuest} />
    </div>
  );
}

function PostCard({
  post,
  isAuthed,
  onGated,
}: {
  post: PublicPost;
  isAuthed: boolean;
  onGated: (reason: string) => void;
}) {
  const requireAuth = (reason: string, action: () => void) =>
    isAuthed ? action() : onGated(reason);

  return (
    <article className="bg-card border border-border rounded-2xl p-6 md:p-7 mb-4 transition-all duration-300 hover:border-foreground/15 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.10)]">
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {post.authorAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.authorAvatarUrl}
              alt=""
              className="h-9 w-9 rounded-full bg-foreground/10 object-cover"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-foreground/10 flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium">{post.authorName}</div>
            <div className="text-xs text-muted-foreground">
              {post.authorPersona ? `${capitalize(post.authorPersona)} · ` : ""}
              {formatRelative(post.createdAt)}
            </div>
          </div>
        </div>
        <button
          onClick={() => requireAuth("to manage this post", () => {})}
          className="text-muted-foreground hover:text-foreground p-1"
          aria-label="More"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>

      <h2 className="text-lg md:text-xl font-semibold tracking-tight leading-snug mb-2">
        <Link href={`/community/posts/${post.id}`} className="hover:underline underline-offset-4">
          {post.title}
        </Link>
      </h2>
      {post.imageUrl && (
        <Link href={`/community/posts/${post.id}`} className="block -mx-2 my-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt=""
            className="block w-full aspect-[16/9] object-cover rounded-xl bg-foreground/5"
            loading="lazy"
          />
        </Link>
      )}
      <p className={`text-foreground/75 leading-relaxed ${post.imageUrl ? "line-clamp-2" : "line-clamp-4"}`}>{post.body}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="text-xs rounded-full bg-foreground/5 px-2.5 py-1 text-foreground/65">
              {t}
            </span>
          ))}
        </div>
      )}

      <footer className="mt-5 flex items-center gap-1 text-sm text-muted-foreground">
        <button
          onClick={() => requireAuth("to react", () => {})}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
        >
          <ChevronUp className="h-4 w-4" />
          {post.upvotes}
        </button>
        <button
          onClick={() => requireAuth("to react", () => {})}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
          {post.downvotes}
        </button>
        <Link
          href={`/community/posts/${post.id}`}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          {post.replyCount} {post.replyCount === 1 ? "reply" : "replies"}
        </Link>
        <button
          onClick={() => requireAuth("to save", () => {})}
          className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
        >
          <Bookmark className="h-4 w-4" />
          Save
        </button>
      </footer>
    </article>
  );
}

function capitalize(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

function formatRelative(iso: string): string {
  try {
    const t = new Date(iso).getTime();
    const ms = Date.now() - t;
    const min = Math.round(ms / 60000);
    if (min < 1) return "just now";
    if (min < 60) return `${min}m ago`;
    const hr = Math.round(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.round(hr / 24);
    if (day < 7) return `${day}d ago`;
    return new Date(iso).toLocaleDateString();
  } catch {
    return "";
  }
}
