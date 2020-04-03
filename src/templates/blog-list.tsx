import React from 'react'
import { graphql } from 'gatsby'

import { ArticleForBlog } from 'types/Article'
import Layout from 'components/Layout'
import BlogRoll from 'components/BlogRoll'
import Seo from 'components/Seo'
import Pagination from 'components/Pagination'

type Props = {
  data: {
    allMarkdownRemark: {
      edges: ArticleForBlog[]
    }
  }
  pageContext: {
    limit: number
    skip: number
    numPages: number
    currentPage: number
  }
}

const BlogPage: React.FC<Props> = ({ data, pageContext }) => (
  <Layout>
    <Seo slug={'/'} title="" />
    <BlogRoll articles={data.allMarkdownRemark.edges} />
    <Pagination
      currentPage={pageContext.currentPage}
      numPages={pageContext.numPages}
    />
  </Layout>
)

export default BlogPage

export const blogQueryPage = graphql`
  query BlogQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
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
