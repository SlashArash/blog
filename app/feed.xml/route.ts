import RSS from "rss";
import Markdoc from "@markdoc/markdoc";

import { reader } from "../reader";

export async function GET() {
  const siteUrl = "https://kadkhodaei.ir";

  const allPosts = await reader.collections.posts.all();

  const sortedPosts = allPosts.sort((a, b) => {
    return (
      new Date(b.entry.date || 0).getTime() -
      new Date(a.entry.date || 0).getTime()
    );
  });

  const feed = new RSS({
    title: "آرش کدخدایی",
    description: "نوشته‌های تخصصی آرش کدخدایی در مورد توسعه وب و نرم‌افزار",
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: "fa-IR",
    pubDate: new Date(),
    copyright: `Copyright ${new Date().getFullYear()}, Arash Kadkhodaei`,
  });

  // We use Promise.all to handle the async content reading for all posts
  await Promise.all(
    sortedPosts.map(async (post) => {
      // 1. Get the Markdoc AST node from Keystatic
      const { node } = await post.entry.content();

      // 2. Transform the AST into a renderable tree
      const renderable = Markdoc.transform(node);

      // 3. Render the tree to a plain HTML string
      const htmlContent = Markdoc.renderers.html(renderable);

      feed.item({
        title: post.entry.title,
        description: post.entry.description || "",
        url: `${siteUrl}/blog/${post.slug}`,
        date: post.entry.date || "",
        categories: post.entry.tags as string[],
        author: "آرش کدخدایی",
        // 'custom_elements' allows us to use the 'content:encoded' tag
        // which RSS readers use to display the full article.
        custom_elements: [{ "content:encoded": { _cdata: htmlContent } }],
      });
    }),
  );

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
