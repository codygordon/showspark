import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

const PaginationMenu = ({ location, history, venues }) => {
  const pages = Math.ceil(venues.data.length / venues.perPage)
  const offset = (venues.currentPage - 1) * venues.perPage
  const newPageSearch = page => qs.stringify({ page, ...qs.parse(location.search) })
  const buttons = Array.from(Array(pages)).map((x, i) => (
    <button
      key={`page-button-${i}`} // eslint-disable-line
      className={venues.currentPage === i
        ? 'page-button active' : 'page-button'}
      onClick={() => history.push(`${location.pathname}?${newPageSearch(i)}`)}>
      {i + 1}
    </button>
  ))

  return (
    <nav className="pagination-menu">
      {venues.data.length > 0 &&
        <span className="text">
          {offset + 1} -&nbsp;
          {offset + venues.perPage > venues.data.length
            ? venues.data.length : offset + venues.perPage}
          &nbsp;of {venues.data.length} venues
        </span>}
      {buttons}
    </nav>
  )
}

PaginationMenu.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired
}

export default PaginationMenu
