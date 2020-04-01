import React from 'react'
import { Link, graphql } from 'gatsby'

import messages from 'utils/messages'
import Tag from 'types/Tag'
import { kebabCase } from 'utils/string'
import Layout from 'components/Layout'
import Seo from 'components/Seo'
import Heading from 'components/Heading'

type Props = {
  data: {
    allMarkdownRemark: { group: Tag[] }
  }
}

const TagsPage: React.FC<Props> = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout>
    <Seo slug="/tags" title={messages.tags} />
    <Heading>{messages.tags}</Heading>
    <ul className="flex flex-wrap">
      {group.map((tag) => (
        <li key={tag.fieldValue} className="my-4 w-full sm:w-1/2">
          <Link
            to={`/tags/${kebabCase(tag.fieldValue)}/`}
            className="transition duration-300 ease-in-out hover:text-gray-600"
          >
            <span className="rounded-lg bg-gold-400 text-white px-2 py-1 w-10 inline-block text-center ml-4">
              {tag.totalCount}
            </span>
            <span className="font-bold">{tag.fieldValue}</span>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
