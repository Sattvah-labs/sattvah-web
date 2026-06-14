import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CommunityPost } from "@/lib/api";
import { relativeTime, truncate } from "@/lib/utils";

interface PostCardProps {
  post: CommunityPost;
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const author =
    post.isAnonymous ? "Anonymous" : post.authorName || post.authorHandle || "Someone";
  return (
    <Link href={`/community/posts/${post.id}`} className="block group">
      <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_8px_rgba(15,23,42,0.05),0_24px_48px_-20px_rgba(15,23,42,0.18)]">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={post.isAnonymous ? null : post.authorAvatarUrl}
              name={author}
              size={36}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{author}</p>
              <p className="text-xs text-muted-foreground">{relativeTime(post.createdAt)}</p>
            </div>
            {post.category ? (
              <Badge variant="accent" className="ml-auto shrink-0">
                {post.category}
              </Badge>
            ) : null}
          </div>

          {post.title ? (
            <h3 className="text-lg font-semibold leading-snug text-balance">{post.title}</h3>
          ) : null}

          <p className="text-[15px] leading-relaxed text-foreground/85 whitespace-pre-wrap">
            {truncate(post.body || "", compact ? 160 : 280)}
          </p>

          <div className="flex items-center gap-5 pt-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              {post.reactionsCount ?? 0}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              {post.repliesCount ?? 0}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
