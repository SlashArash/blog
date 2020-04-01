import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import { PersianDate } from 'utils/date'
import Heading from 'components/Heading'

type Props = {
  date?: string
  slug: string
  tags?: string[] | null
  title: string
}

const PostHeader: React.FC<Props> = ({ slug, title, date, tags }) => (
  <header>
    <Link to={slug} className="inline-block">
      <Heading>{title}</Heading>
    </Link>
    <p className="my-4">
      {date && <span>{PersianDate(date)} - </span>}
      {tags && (
        <Fragment>
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="text-gold-400 transition duration-300 ease-in-out mx-1 px-1 border border-solid rounded-lg hover:text-gold-600 hover:border-gold-600"
            >
              {tag}
            </Link>
          ))}
        </Fragment>
      )}
    </p>
  </header>
)
export default PostHeader
