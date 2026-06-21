import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { publicApi } from "@/lib/api";
import { siteConfig } from "@/lib/site";
import { PostDetail } from "./post-detail";
import { SimilarPosts } from "@/components/similar-posts";

type Props = { params: { id: string } };

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const { items } = await publicApi.listPosts();
    return items.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { post } = await publicApi.getPost(params.id);
    return {
      title: post.title,
      description: post.body.slice(0, 160),
      alternates: { canonical: `${siteConfig.url}/community/posts/${post.id}` },
      openGraph: {
        title: post.title,
        description: post.body.slice(0, 160),
        url: `${siteConfig.url}/community/posts/${post.id}`,
        type: "article",
      },
    };
  } catch {
    return { title: "Post" };
  }
}

export default async function PostPage({ params }: Props) {
  let data: Awaited<ReturnType<typeof publicApi.getPost>> | null = null;
  try {
    data = await publicApi.getPost(params.id);
  } catch {
    /* render fallback */
  }

  if (!data) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <p className="text-muted-foreground">This post isn&rsquo;t available.</p>
        <Link
          href="/community"
          className="mt-6 inline-flex items-center gap-1.5 text-accent underline underline-offset-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to community
        </Link>
      </div>
    );
  }

  return (
    <>
      <PostDetail post={data.post} replies={data.replies} />
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <SimilarPosts currentId={data.post.id} topic={data.post.topic} />
      </div>
    </>
  );
}
