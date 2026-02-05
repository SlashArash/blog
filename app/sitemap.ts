import { MetadataRoute } from "next";

import { reader } from "./reader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kadkhodaei.ir";

  // 1. Fetch all data from Keystatic
  const allPosts = await reader.collections.posts.all();

  // Get unique tags
  const tags = new Set<string>();
  allPosts.forEach((post) => post.entry.tags.forEach((tag) => tags.add(tag)));

  // 2. Static Routes
  const routes = ["", "/arash", "/blog/archive", "/blog/tags"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 3. Dynamic Blog Post Routes
  const postRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.entry.date || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 4. Dynamic Tag Routes
  const tagRoutes = Array.from(tags).map((tag) => ({
    url: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...routes, ...postRoutes, ...tagRoutes];
}
