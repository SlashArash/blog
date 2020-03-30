import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import { PersianDate } from 'utils/date'

type Props = {
  date?: string
  slug: string
  tags?: string[] | null
  title: string
}

const PostHeader: React.FC<Props> = ({ slug, title, date, tags }) => (
  <header>
    <Link
      className="text-gold-400 hover:text-gold-600 text-3xl font-bold transition duration-300 ease-in-out"
      to={slug}
    >
      <h1 className="">{title}</h1>
    </Link>
    <p className="my-4">
      {date && <span>{PersianDate(date)} - </span>}
      {tags && (
        <Fragment>
          {tags.map((tag) => (
            <Link
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
