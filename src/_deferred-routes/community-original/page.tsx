import type { Metadata } from "next";
import Link from "next/link";

import { DeepLinkButton } from "@/components/deep-link-button";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCommunityPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Read real stories from the Sattvah community. Anonymous and on-the-record posts about burnout, grief, relationships, identity, and the messy middle of figuring it out.",
  openGraph: {
    title: "Sattvah Community",
    description: "Real, supportive writing from people figuring it out.",
    type: "website",
  },
};

export const revalidate = 60;

export default async function CommunityPage() {
  const posts = await getCommunityPosts();

  return (
    <div className="container py-12 md:py-16">
      <header className="max-w-2xl mb-10">
        <Badge variant="outline" className="mb-3">Community</Badge>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          What the community is sitting with right now.
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Browsing is free and judgment-free. To reply or post, open Sattvah on your phone.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <DeepLinkButton path="community/new" label="Share your story" size="default" />
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            How the community works →
          </Link>
        </div>
      </header>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="max-w-xl">
      <CardContent className="pt-6 space-y-3">
        <h3 className="font-semibold">Nothing here yet — or the feed couldn&rsquo;t load.</h3>
        <p className="text-sm text-muted-foreground">
          The community lives mostly in the mobile app. Open Sattvah to see the latest, post your own,
          and reply to others.
        </p>
        <div className="pt-2">
          <DeepLinkButton path="community" label="Open the app" size="default" />
        </div>
      </CardContent>
    </Card>
  );
}
