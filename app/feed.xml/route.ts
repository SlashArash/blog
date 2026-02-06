import RSS from 'rss'
import Markdoc from '@markdoc/markdoc'
import { reader } from '../reader'
import { siteConfig } from '../../config/site'

export const dynamic = 'force-static'

export async function GET() {
  const allPosts = await reader.collections.posts.all()

  const sortedPosts = allPosts.sort((a, b) => {
    return (
      new Date(b.entry.date || 0).getTime() -
      new Date(a.entry.date || 0).getTime()
    )
  })

  const feed = new RSS({
    title: 'آرش کدخدایی',
    description: 'نوشته‌های تخصصی آرش کدخدایی در مورد توسعه وب و نرم‌افزار',
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: 'fa-IR',
    pubDate: new Date(),
    copyright: `Copyright ${new Date().getFullYear()}, Arash Kadkhodaei`,
  })

  await Promise.all(
    sortedPosts.map(async (post) => {
      const { node } = await post.entry.content()
      const renderable = Markdoc.transform(node)
      const htmlContent = Markdoc.renderers.html(renderable)

      feed.item({
        title: post.entry.title,
        description: post.entry.description || '',
        url: `${siteConfig.url}/blog/${post.slug}`,
        date: post.entry.date || '',
        categories: (post.entry.tags as string[]) || [],
        author: 'آرش کدخدایی',
        custom_elements: [{ 'content:encoded': { _cdata: htmlContent } }],
      })
    })
  )

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
