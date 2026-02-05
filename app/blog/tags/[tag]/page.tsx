import Link from "next/link";
import { Metadata } from "next";

import { reader } from "../../../reader";
import { siteConfig } from "../../../../config/site";
import { getPlainText } from "../../../../lib/utils";
import PostList from "../../../../components/post-list";

type TagArchivePageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const allPosts = await reader.collections.posts.all();
  const tags = new Set<string>();
  allPosts.forEach((p) => p.entry.tags.forEach((t) => tags.add(t)));

  return Array.from(tags).map((tag) => ({
    tag: tag, // Next.js handles the encoding for the URL
  }));
}

export default async function TagArchivePage({ params }: TagArchivePageProps) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  const allPosts = await reader.collections.posts.all();
  const filteredPosts = allPosts
    .filter((post) => post.entry.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.entry.date || 0).getTime() -
        new Date(a.entry.date || 0).getTime(),
    );

  if (filteredPosts.length === 0) {
    return (
      <main className="text-center py-20" dir="rtl">
        <h1 className="text-2xl">هیچ نوشته‌ای با برچسب "{tag}" پیدا نشد.</h1>
        <Link href="/blog/tags" className="text-blue-500 mt-4 block">
          بازگشت به لیست برچسب‌ها
        </Link>
      </main>
    );
  }

  const postsWithExcerpts = await Promise.all(
    filteredPosts.map(async (post) => {
      const { node } = await post.entry.content();
      const plainText = getPlainText(node);

      // Slice the first 600 characters
      const excerpt =
        plainText.length > 600
          ? plainText.substring(0, 600) + "..."
          : plainText;

      return { ...post, excerpt };
    }),
  );

  return (
    <main className="max-w-3xl mx-auto py-20 px-4" dir="rtl">
      <div className="mb-10">
        <span className="text-gray-500 text-sm">نوشته‌های مربوط به:</span>
        <h1 className="text-3xl font-bold text-primary">#{tag}</h1>
      </div>

      <PostList posts={postsWithExcerpts} />
    </main>
  );
}

export async function generateMetadata({
  params,
}: TagArchivePageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const title = `نوشته‌های مربوط به ${decodedTag}`;
  const description = `مجموعه مقالات و آموزش‌های تخصصی مرتبط با ${decodedTag} در وبلاگ ${siteConfig.name}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${siteConfig.url}/blog/tags/${tag}`, // use encoded tag for URL
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: description,
      url: `${siteConfig.url}/blog/tags/${tag}`,
      type: "website",
    },
  };
}
