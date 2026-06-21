import { publicApi, PublicPost } from "@/lib/api";
import { PostCardCompact } from "@/components/post-card-compact";

/**
 * SimilarPosts — renders up to 3 small post cards related to the current
 * post (same topic). Server-rendered at build time via generateStaticParams.
 * Returns nothing if the fetch fails or there are no other posts.
 */
export async function SimilarPosts({
  currentId,
  topic,
}: {
  currentId: string;
  topic: string;
}) {
  let posts: PublicPost[] = [];
  try {
    posts = await publicApi.similarPosts(currentId, topic, 3);
  } catch {
    return null;
  }
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-border/60">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-5">
        More like this
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <PostCardCompact key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
