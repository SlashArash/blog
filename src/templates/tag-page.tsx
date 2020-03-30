import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'components/Layout'
import Seo from 'components/Seo'

type Props = {
  data: {
    allMarkdownRemark: any
  }
  pageContext: any
}

const TagRoute: React.FC<Props> = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const postLinks = posts.map((post: any) => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>
        <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
      </Link>
    </li>
  ))
  const tag = pageContext.tag
  const totalCount = data.allMarkdownRemark.totalCount
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <Seo slug={tag} title={tag} />
      <section>
        <h3>{tagHeader}</h3>
        <ul>{postLinks}</ul>
        <p>
          <Link to="/tags/">Browse all tags</Link>
        </p>
      </section>
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
