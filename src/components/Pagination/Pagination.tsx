import React from 'react'
import { Link } from 'gatsby'
import messages from 'utils/messages'

type Props = {
  currentPage: number
  numPages: number
}

const Pagination: React.FC<Props> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <div className="flex justify-between align-center mt-16">
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          → {messages.newer}
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => {
        const isActive = i + 1 === currentPage
        return (
          <Link
            key={i + 1}
            to={`/${i === 0 ? '' : i + 1}`}
            className={`py-1 px-4 rounded-lg transition duration-300 ease-in-out  ${
              isActive ? 'text-white' : 'text-gray-700'
            } ${isActive ? 'bg-gold-400' : 'bg-white'} ${
              isActive ? 'hover:bg-gold-600' : 'hover:text-gold-400'
            }`}
          >
            {i + 1}
          </Link>
        )
      })}

      {!isLast && (
        <Link to={nextPage} rel="next">
          {messages.older} ←
        </Link>
      )}
    </div>
  )
}

export default Pagination
