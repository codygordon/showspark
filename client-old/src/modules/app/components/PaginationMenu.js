import React from 'react'
import PropTypes from 'prop-types'

const PaginationMenu = ({ perPage, currentPage, total, handlePageButtonClick }) => {
  const pages = Math.ceil(total / perPage)
  const offset = (currentPage - 1) * perPage
  const buttons = Array.from(Array(pages)).map((x, i) => (
    <button
      key={`page-button-${i}`} // eslint-disable-line
      className={currentPage === i + 1
        ? 'page-button active' : 'page-button'}
      onClick={() => handlePageButtonClick(i + 1)}>
      {i + 1}
    </button>
  ))

  return (
    <nav className="pagination-menu">
      {total > 0 &&
        <span className="text">
          {offset + 1} -&nbsp;
          {offset + perPage > total
            ? total : offset + perPage}
          &nbsp;of {total}
        </span>}
      {buttons}
    </nav>
  )
}

PaginationMenu.propTypes = {
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handlePageButtonClick: PropTypes.func.isRequired
}

export default PaginationMenu
