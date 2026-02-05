import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type PostListProps = {
  posts: {
    slug: string;
    excerpt: string;
    entry: {
      title: string;
      date: string | null;
      description: string;
      tags: readonly string[];
      keywords: readonly string[];
      content: () => Promise<any>;
    };
  }[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="flex flex-col gap-14">
      {posts.map((post) => (
        <article key={post.slug} className="flex flex-col gap-4 group ">
          <div className="flex justify-between">
            <time
              dateTime={post.entry.date || ""}
              className="text-sm text-zinc-400 dark:text-zinc-500 ps-3.5 border-s-2 border-zinc-200 dark:border-zinc-500"
            >
              {new Date(post.entry.date || "").toLocaleDateString("fa-IR")}
            </time>
            <div className="flex gap-3">
              {post.entry.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${encodeURIComponent(tag)}`}
                  className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-primary hover:underline transition-all"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold tracking-tight dark:text-zinc-400 group-hover:text-primary transition-colors">
              {post.entry.title}
            </h2>
          </Link>
          <p className="">{post.excerpt}</p>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 text-primary transition-all"
          >
            <span>خواندن نوشته</span>
            <ChevronLeft size={12} />
          </Link>
        </article>
      ))}
    </section>
  );
};

export default PostList;
