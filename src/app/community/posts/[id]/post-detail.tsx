"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  MessageCircle,
  Send,
  User,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { PublicPost, PublicReply } from "@/lib/api";
import { SignInPrompt } from "@/components/sign-in-prompt";
import { CommunityNudge, bumpCommunityReadCount } from "@/components/community-nudge";

type Props = {
  post: PublicPost;
  replies: PublicReply[];
};

export function PostDetail({ post, replies }: Props) {
  const { user } = useAuth();
  const isAuthed = !!user;
  const [prompt, setPrompt] = useState<{ open: boolean; reason: string }>({
    open: false,
    reason: "to react",
  });

  // Nudge #1 — bump the read counter when a guest opens a post detail.
  // Once the counter crosses 3 this session, CommunityNudge renders.
  useEffect(() => {
    if (!isAuthed) bumpCommunityReadCount();
  }, [isAuthed, post.id]);

  const requireAuth = (reason: string, action: () => void) =>
    isAuthed ? action() : setPrompt({ open: true, reason });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Link
        href="/community"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to community
      </Link>

      <article className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <header className="flex items-center gap-3 mb-5">
          {post.authorAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.authorAvatarUrl}
              alt=""
              className="h-10 w-10 rounded-full bg-foreground/10 object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium">{post.authorName}</div>
            <div className="text-xs text-muted-foreground">
              {post.authorPersona ? `${capitalize(post.authorPersona)} · ` : ""}
              {formatRelative(post.createdAt)}
            </div>
          </div>
        </header>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug mb-3">
          {post.title}
        </h1>

        {post.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt=""
            className="block w-full aspect-[16/9] object-cover rounded-xl bg-foreground/5 my-5"
          />
        )}

        <p className="text-foreground/85 leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs rounded-full bg-foreground/5 px-2.5 py-1 text-foreground/65"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <footer className="mt-6 pt-4 border-t border-border/60 flex items-center gap-1 text-sm text-muted-foreground">
          <button
            onClick={() => requireAuth("to react", () => {})}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
          >
            <ChevronUp className="h-4 w-4" /> {post.upvotes}
          </button>
          <button
            onClick={() => requireAuth("to react", () => {})}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
          >
            <ChevronDown className="h-4 w-4" /> {post.downvotes}
          </button>
          <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5">
            <MessageCircle className="h-4 w-4" /> {post.replyCount}{" "}
            {post.replyCount === 1 ? "reply" : "replies"}
          </span>
          <button
            onClick={() => requireAuth("to save", () => {})}
            className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-foreground/5 transition-colors"
          >
            <Bookmark className="h-4 w-4" /> Save
          </button>
        </footer>
      </article>

      {/* Replies */}
      <div className="mt-8">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>

        {/* Reply composer (auth-gated) */}
        <button
          onClick={() =>
            requireAuth("to reply", () => alert("Reply composer coming soon"))
          }
          className="w-full text-left bg-card border border-border rounded-2xl p-4 mb-5 flex items-center gap-3 hover:border-foreground/15 transition-colors"
        >
          <div className="h-9 w-9 rounded-full bg-foreground/10 flex items-center justify-center">
            <Send className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-foreground/60 text-sm">Add a reply…</span>
        </button>

        {replies.map((r) => (
          <article
            key={`${r.id}#${r.createdAt}`}
            className="bg-card border border-border rounded-2xl p-5 mb-3"
          >
            <header className="flex items-center gap-3 mb-2">
              {r.authorAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.authorAvatarUrl}
                  alt=""
                  className="h-8 w-8 rounded-full bg-foreground/10 object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
              <div className="text-sm">
                <span className="font-medium">{r.authorName}</span>
                <span className="text-muted-foreground">
                  {" "}· {formatRelative(r.createdAt)}
                </span>
              </div>
            </header>
            <p className="text-foreground/85 leading-relaxed whitespace-pre-wrap">
              {r.body}
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <button
                onClick={() => requireAuth("to react", () => {})}
                className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-foreground/5"
              >
                <ChevronUp className="h-3.5 w-3.5" /> {r.upvotes}
              </button>
              <button
                onClick={() => requireAuth("to react", () => {})}
                className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-foreground/5"
              >
                <ChevronDown className="h-3.5 w-3.5" /> {r.downvotes}
              </button>
            </div>
          </article>
        ))}
      </div>

      <SignInPrompt
        open={prompt.open}
        reason={prompt.reason}
        onClose={() => setPrompt((p) => ({ ...p, open: false }))}
      />
      <CommunityNudge isGuest={!isAuthed} />
    </div>
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
