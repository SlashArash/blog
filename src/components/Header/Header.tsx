import React from 'react'

import logo from 'assets/images/SlashArash.svg'
import messages from 'utils/messages'
import { Link } from 'gatsby'

const Header: React.FC = () => (
  <header className="border-b border-solid border-gray-400 mb-4 pb-6 pt-10 flex items-center justify-between">
    <Link className="flex items-center" to="/">
      <img className="w-24 ml-4" src={logo} />
      <h1>{messages.arashKadkhodaei}</h1>
    </Link>
    <nav className="flex items-center">
      <Link className="mx-4" to="/آرش">
        {messages.arash}
      </Link>
      <span className="text-gold-400">/</span>
      <Link className="mx-4" to="/tags">
        {messages.tags}
      </Link>
      <span className="text-gold-400">/</span>
      <Link className="mr-4" to="/rss.xml">
        {messages.feed}
      </Link>
    </nav>
  </header>
)

export default Header
