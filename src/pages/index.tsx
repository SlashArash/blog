import React from 'react'
import { graphql } from 'gatsby'

import { ArticleForBlog } from 'types/Article'
import Layout from 'components/Layout'
import BlogRoll from 'components/BlogRoll'
import Seo from 'components/Seo'

type Props = {
  data: {
    allMarkdownRemark: {
      edges: ArticleForBlog[]
    }
  }
}

const BlogPage: React.FC<Props> = ({ data }) => (
  <Layout>
    <Seo slug={'/'} title="" />
    <BlogRoll articles={data.allMarkdownRemark.edges} />
  </Layout>
)

export default BlogPage

export const blogQueryPage = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400, truncate: true)
          id
          fields {
            slug
          }
          frontmatter {
            date
            templateKey
            title
            tags
          }
        }
      }
    }
  }
`
