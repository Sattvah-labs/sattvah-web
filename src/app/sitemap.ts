import type { MetadataRoute } from "next";

import { getCommunityPosts, getExperts } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/community",
    "/experts",
    "/about",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Fetch in parallel; tolerate failures (sitemap should never crash the build).
  const [posts, experts] = await Promise.all([
    getCommunityPosts().catch(() => []),
    getExperts().catch(() => []),
  ]);

  const postRoutes: MetadataRoute.Sitemap = posts.slice(0, 1000).map((p) => ({
    url: `${base}/community/posts/${p.id}`,
    lastModified: p.createdAt ? new Date(p.createdAt) : new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const expertRoutes: MetadataRoute.Sitemap = experts.slice(0, 1000).map((e) => ({
    url: `${base}/experts/${e.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...expertRoutes];
}
