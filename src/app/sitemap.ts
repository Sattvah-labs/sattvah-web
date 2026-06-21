import type { MetadataRoute } from "next";

import { MOCK_COACHES } from "@/lib/coaches";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    cf: "daily" | "weekly" | "monthly";
  }[] = [
    { path: "", priority: 1.0, cf: "weekly" },
    { path: "/coaches", priority: 0.9, cf: "weekly" },
    { path: "/labs", priority: 0.7, cf: "monthly" },
    { path: "/trust", priority: 0.7, cf: "monthly" },
    { path: "/press", priority: 0.6, cf: "monthly" },
    { path: "/community", priority: 0.8, cf: "daily" },
    { path: "/about", priority: 0.6, cf: "monthly" },
    { path: "/mission", priority: 0.6, cf: "monthly" },
    { path: "/founder", priority: 0.6, cf: "monthly" },
    { path: "/crisis", priority: 0.7, cf: "monthly" },
    { path: "/privacy", priority: 0.5, cf: "monthly" },
    { path: "/terms", priority: 0.5, cf: "monthly" },
  ];

  const coachRoutes = MOCK_COACHES.map((c) => ({
    path: `/c/${c.handle}`,
    priority: 0.7,
    cf: "weekly" as const,
  }));

  return [...staticRoutes, ...coachRoutes].map(({ path, priority, cf }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: cf,
    priority,
  }));
}
