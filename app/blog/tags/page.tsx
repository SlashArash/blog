import Link from "next/link";
import { Metadata } from "next";

import { reader } from "../../reader";
import { siteConfig } from "../../../config/site";

export default async function TagsPage() {
  const allPosts = await reader.collections.posts.all();

  // Count tags
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.entry.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <main className="max-w-3xl mx-auto py-20 px-4" dir="rtl">
      <h1 className="text-3xl font-bold mb-10">برچسب‌ها</h1>
      <div className="flex flex-wrap gap-4">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/blog/tags/${encodeURIComponent(tag)}`}
            className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
          >
            <span>{tag}</span>
            <span className="text-xs opacity-60 bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "برچسب‌ها",
  description: "موضوعات و دسته‌بندی‌های مقالات فنی در وبلاگ آرش کدخدائی",
  alternates: {
    canonical: `${siteConfig.url}/blog/tags`,
  },
  openGraph: {
    title: `برچسب‌ها | ${siteConfig.name}`,
    description: "موضوعات و دسته‌بندی‌های مقالات فنی در وبلاگ آرش کدخدائی",
    url: `${siteConfig.url}/blog/tags`,
  },
};
