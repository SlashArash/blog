import React from 'react'
import { graphql } from 'gatsby'

import { ArticleForPost } from 'Article'
import Layout from 'components/Layout'
import PostHeader from 'components/PostHeader'
import Seo from 'components/Seo'

type Props = {
  data: {
    markdownRemark: ArticleForPost
  }
}

const BlogPost: React.FC<Props> = ({ data: { markdownRemark: post } }) => {
  return (
    <Layout>
      <Seo
        date={post.frontmatter.date}
        meta_desc={post.frontmatter.description}
        slug={post.fields.slug}
        title={post.frontmatter.title}
      />
      <PostHeader
        slug={post.fields.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
      />
      <article
        className="my-6"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        date
        title
        description
        tags
      }
    }
  }
`
