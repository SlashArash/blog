import React from 'react'

const Heading: React.FC = ({ children }) => (
  <h1 className="text-gold-400 hover:text-gold-600 text-3xl font-bold transition duration-300 ease-in-out my-4">
    {children}
  </h1>
)

export default Heading
