import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import { ArticleForBlog } from 'types/Article'
import messages from 'utils/messages'
import PostHeader from 'components/PostHeader'

type Props = {
  articles: ArticleForBlog[]
}

const BlogRoll: React.FC<Props> = ({ articles }) => (
  <Fragment>
    {articles.map(({ node: post }) => (
      <div className="mb-6">
        <PostHeader
          date={post.frontmatter.date}
          slug={post.fields.slug}
          tags={post.frontmatter.tags}
          title={post.frontmatter.title}
        />
        <p className="my-6">{post.excerpt}</p>
        <Link
          className="text-gray-500 hover:text-gold-400 transition duration-300 ease-in-out hover:text-gold-600"
          to={post.fields.slug}
        >
          {messages.continueReadig} ⇜
        </Link>
      </div>
    ))}
  </Fragment>
)

export default BlogRoll
