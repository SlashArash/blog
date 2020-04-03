import React from 'react'
import { Link } from 'gatsby'

import messages from 'utils/messages'
import Layout from 'components/Layout'
import Seo from 'components/Seo'
import Heading from 'components/Heading'

const NotFoundPage: React.FC = () => (
  <Layout>
    <Seo slug={'/'} title={messages.pageNotFound} />
    <Heading>{messages.pageNotFound} :(</Heading>
    <p>{messages.youCanVisitFollowigPages}</p>
    <ul>
      <li className="my-4">
        <Link
          to="/"
          className="text-gold-400 hover:text-gold-600 transition duration-300 ease-in-out"
        >
          {messages.mainPage}
        </Link>
      </li>
      <li className="my-4">
        <Link
          to="/tags"
          className="text-gold-400 hover:text-gold-600 transition duration-300 ease-in-out"
        >
          {messages.tags}
        </Link>
      </li>
      <li className="my-4">
        <Link
          to="/آرش"
          className="text-gold-400 hover:text-gold-600 transition duration-300 ease-in-out"
        >
          {messages.aboutMe}
        </Link>
      </li>
    </ul>
  </Layout>
)

export default NotFoundPage
