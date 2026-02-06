import { Metadata } from 'next'

import { reader } from './reader'
import PostList from '../components/post-list'
import ButtonLink from '../components/button-link'
import { SocialLinks } from '../components/social-links'
import { siteConfig } from '../config/site'
import { getPlainText } from '../lib/utils'

export default async function Homepage() {
  const postsToShow = 5

  // 1. Fetch all posts
  const allPosts = await reader.collections.posts.all()

  // 2. Sort by Date (Newest First)
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.entry.date || '').getTime()
    const dateB = new Date(b.entry.date || '').getTime()
    return dateB - dateA // Descending order
  })

  const latestPosts = sortedPosts.slice(0, postsToShow)

  const postsWithExcerpts = await Promise.all(
    latestPosts.map(async (post) => {
      const { node } = await post.entry.content()
      const plainText = getPlainText(node)

      // Slice the first 350 characters
      const excerpt =
        plainText.length > 350 ? plainText.substring(0, 350) + '...' : plainText

      return { ...post, excerpt }
    })
  )

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-6 my-12">
        <div className="text-balance">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl flex items-baseline justify-center font-medium gap-3 dark:text-white text-base-900">
            سلام، من آرش هستم
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl dark:text-base-400 text-base-600 text-balance">
          اینجا از همه چیز می‌نویسم! نوشته‌هام رو ممکنه خودم دیگه نپسندم!
        </p>
        <SocialLinks />
      </section>
      <h2 className="text-2xl font-semibold tracking-tight ">نوشته‌ها</h2>
      <PostList posts={postsWithExcerpts} />
      <div className="text-center mt-6">
        <ButtonLink href="/blog/archive">همه‌ی نوشته‌ها</ButtonLink>
      </div>
    </>
  )
}

export const metadata: Metadata = {
  title: siteConfig.name,
}
