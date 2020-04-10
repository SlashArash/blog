import React from 'react'
import { graphql } from 'gatsby'

import { Page } from 'types/Page'
import Layout from 'components/Layout'
// import PostHeader from 'components/PostHeader'
import Seo from 'components/Seo'

type Props = {
  data: {
    markdownRemark: Page
  }
}

const SinglePage: React.FC<Props> = ({ data: { markdownRemark: post } }) => {
  return (
    <Layout>
      <Seo slug={post.fields.slug} title={post.frontmatter.title} />
      {/* <PostHeader slug={post.fields.slug} title={post.frontmatter.title} /> */}
      <article
        className="my-6"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export default SinglePage

export const singlePageQuery = graphql`
  query SinglePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
      html
    }
  }
`
