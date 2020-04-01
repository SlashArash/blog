import React from 'react'
import { Link, graphql } from 'gatsby'

import messages from 'utils/messages'
import Layout from 'components/Layout'
import Seo from 'components/Seo'
import Heading from 'components/Heading'

type Props = {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
          }
        }
      }[]
    }
  }
  pageContext: { tag: string }
}

const TagRoute: React.FC<Props> = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const tag = pageContext.tag
  const totalCount = data.allMarkdownRemark.totalCount

  return (
    <Layout>
      <Seo slug={tag} title={messages.tagName(tag)} />
      <Heading>{messages.tagName(tag)}</Heading>
      <p className="font-light text-gray-500">
        {totalCount} {messages.postWithThisTag}
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.node.fields.slug}>
            <Link to={post.node.fields.slug}>
              <h2 className="my-4 font-bold text-xl">
                <span className="inline text-gold-400 ml-2">+</span>
                {post.node.frontmatter.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
