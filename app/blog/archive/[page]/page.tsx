import Link from "next/link";
import React from "react";

import { reader } from "../../../reader";
import PostList from "../../../../components/post-list";
import Pagination from "../../../../components/pagination";
import { Metadata } from "next";
import { siteConfig } from "../../../../config/site";
import { getPlainText } from "../../../../lib/utils";

const POSTS_PER_PAGE = 15;

type ArchivePageProps = {
  params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
  const allPosts = await reader.collections.posts.list();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { page } = await params;
  const currentPage = parseInt(page) || 1;

  // 1. Fetch all posts
  const allPosts = await reader.collections.posts.all();

  // 2. Sort by Date (Newest First)
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.entry.date || 0).getTime();
    const dateB = new Date(b.entry.date || 0).getTime();
    return dateB - dateA;
  });

  // 3. Pagination Logic
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  // Handle case where page number is out of bounds
  if (currentPosts.length === 0 && currentPage > 1) {
    return <div className="p-10 text-center">این صفحه وجود ندارد.</div>;
  }

  const postsWithExcerpts = await Promise.all(
    currentPosts.map(async (post) => {
      const { node } = await post.entry.content();
      const plainText = getPlainText(node);

      // Slice the first 350 characters
      const excerpt =
        plainText.length > 350
          ? plainText.substring(0, 350) + "..."
          : plainText;

      return { ...post, excerpt };
    }),
  );

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">بایگانی نوشته‌ها</h1>

      <PostList posts={postsWithExcerpts} />

      {/* Pagination Controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />

      <div className="mt-8 text-center">
        <Link href="/" className="text-primary hover:underline">
          ← بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: ArchivePageProps): Promise<Metadata> {
  const { page } = await params;

  const title = `بایگانی نوشته‌ها - صفحه ${page}`;
  const description = `مشاهده فهرست مقالات آرش کدخدائی در صفحه ${page}. مجموعه‌ای از مطالب تخصصی برنامه‌نویسی.`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${siteConfig.url}/blog/archive/${page}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${siteConfig.url}/blog/archive/${page}`,
    },
    // Useful for paginated pages to avoid indexing low-quality clones,
    // though usually indexing page 2+ is fine.
    robots: {
      index: true,
      follow: true,
    },
  };
}
