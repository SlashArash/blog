import React from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'
import 'styles/tailwinds.css'

const Layout: React.FC = ({ children }) => (
  <div className="w-4/5 max-w-4xl m-auto">
    <Header />
    <main className="my-8">{children}</main>
    <Footer />
  </div>
)

export default Layout
