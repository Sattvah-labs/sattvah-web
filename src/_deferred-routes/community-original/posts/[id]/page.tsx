import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";

import { DeepLinkButton } from "@/components/deep-link-button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCommunityPost } from "@/lib/api";
import { relativeTime, truncate } from "@/lib/utils";

// Static export — Next.js requires at least one generated param to satisfy
// `output: 'export'`. We seed a placeholder ID that renders a "post not
// found" page. Once Sattvah has real community posts, swap this for a
// call that fetches actual IDs from the API.
export const dynamic = "force-static";
export const dynamicParams = false;
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getCommunityPost(params.id);
  if (!post) return { title: "Post not found" };
  const author = post.isAnonymous ? "Anonymous" : post.authorName || "A Sattvah member";
  const title = post.title?.trim() || truncate(post.body || "", 70).replace(/…$/, "");
  const description = truncate(post.body || "", 160);
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      authors: [author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PostDetailPage({ params }: Params) {
  const post = await getCommunityPost(params.id);
  if (!post) notFound();

  const author = post.isAnonymous ? "Anonymous" : post.authorName || "Someone";
  const replies = post.replies ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title || truncate(post.body || "", 90),
    articleBody: post.body,
    datePublished: post.createdAt,
    author: { "@type": "Person", name: author },
    publisher: { "@type": "Organization", name: "Sattvah" },
  };

  return (
    <article className="container max-w-2xl py-12 md:py-16">
      <Link
        href="/community"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </Link>

      <header className="space-y-5">
        <div className="flex items-center gap-3">
          <Avatar src={post.isAnonymous ? null : post.authorAvatarUrl} name={author} size={44} />
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{relativeTime(post.createdAt)}</p>
          </div>
          {post.category ? (
            <Badge variant="accent" className="ml-auto">
              {post.category}
            </Badge>
          ) : null}
        </div>

        {post.title ? (
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
            {post.title}
          </h1>
        ) : null}
      </header>

      <div className="mt-8 prose prose-slate max-w-none">
        <p className="whitespace-pre-wrap leading-relaxed text-[17px] text-foreground/90">
          {post.body}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground border-y border-border/60 py-4">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-4 w-4" /> {post.reactionsCount ?? 0} reactions
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" /> {post.repliesCount ?? replies.length} replies
        </span>
        <DeepLinkButton
          path={`community/posts/${post.id}`}
          label="Reply in the app"
          size="sm"
          className="ml-auto"
        />
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Replies</h2>
        {replies.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Replies live in the app — open Sattvah to see the conversation and add yours.
              </p>
              <div className="mt-4">
                <DeepLinkButton
                  path={`community/posts/${post.id}`}
                  label="Open in the app"
                  size="sm"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-4">
            {replies.map((r) => (
              <li key={r.id}>
                <Card>
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar src={r.authorAvatarUrl} name={r.authorName} size={32} />
                      <div className="text-sm">
                        <p className="font-medium leading-none">{r.authorName || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {relativeTime(r.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
                      {r.body}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
