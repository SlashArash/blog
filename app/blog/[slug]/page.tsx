import React from 'react'
import type { Metadata } from 'next'
import Markdoc from '@markdoc/markdoc'
import Link from 'next/link'

import { reader } from '../../reader'
import { markdocConfig } from '../../../keystatic.config'
import { siteConfig } from '../../../config/site'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug: slugParam } = await params // Decode the slug to handle Persian characters correctly
  const slug = decodeURIComponent(slugParam)

  const post = await reader.collections.posts.read(slug)

  if (!post) return <div>Post not found!</div>

  const { node } = await post.content()

  const errors = Markdoc.validate(node, markdocConfig)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }

  const renderable = Markdoc.transform(node, markdocConfig)

  return (
    <article className="prose prose-lg dark:prose-invert prose-blue prose-rtl mx-auto">
      <h1>{post.title}</h1>
      <div className="flex justify-between">
        <time className="text-zinc-400 dark:text-zinc-500">
          {new Date(post.date || '').toLocaleDateString('fa-IR')}
        </time>
        <div className="flex gap-3">
          {post.tags.map((tag) => (
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
      {Markdoc.renderers.react(renderable, React)}
    </article>
  )
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list()

  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await reader.collections.posts.read(decodeURIComponent(slug))

  if (!post) return { title: 'نوشته یافت نشد' }

  // Logic: Use SEO Meta Title if exists, otherwise use the Post Title
  const seoTitle = post.seo.metaTitle || post.title
  const seoDescription =
    post.seo.metaDescription || 'مطالعه این نوشته در وبلاگ آرش کدخدایی'

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.seo.keywords as string[],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      url: `${siteConfig.url}/blog/${slug}`,
      publishedTime: post.date || undefined,
      authors: [siteConfig.author],
      tags: post.tags as string[],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },
  }
}
