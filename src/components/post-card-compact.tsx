import Link from "next/link";
import { ChevronUp, MessageCircle, User } from "lucide-react";

import { PublicPost } from "@/lib/api";

/**
 * PostCardCompact — small variant of the community post card. Used in
 * "More like this" rails below the post detail page. Three across on
 * desktop, single column on mobile. Image-first when imageUrl is set,
 * otherwise title + 2-line excerpt.
 */
export function PostCardCompact({ post }: { post: PublicPost }) {
  return (
    <Link
      href={`/community/posts/${post.id}`}
      className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_18px_45px_-15px_rgba(15,23,42,0.10)]"
    >
      {post.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imageUrl}
          alt=""
          className="block w-full aspect-[16/9] object-cover bg-foreground/5"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <h3 className="text-sm font-semibold tracking-tight leading-snug line-clamp-2 group-hover:underline underline-offset-4">
          {post.title}
        </h3>
        {!post.imageUrl && (
          <p className="mt-1.5 text-xs text-foreground/65 leading-relaxed line-clamp-2">
            {post.body}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {post.authorAvatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.authorAvatarUrl}
                alt=""
                className="h-4 w-4 rounded-full bg-foreground/10 object-cover"
              />
            ) : (
              <User className="h-3 w-3" />
            )}
            <span className="truncate max-w-[8rem]">{post.authorName}</span>
          </span>
          <span className="flex items-center gap-0.5">
            <ChevronUp className="h-3 w-3" /> {post.upvotes}
          </span>
          <span className="flex items-center gap-0.5">
            <MessageCircle className="h-3 w-3" /> {post.replyCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
