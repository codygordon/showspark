import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

const PaginationMenu = ({ location, history, venues }) => {
  const offset = (venues.currentPage - 1) * venues.perPage
  const newPageSearch = page => qs.stringify({ ...qs.parse(location.search.replace('?', '')), page })
  const buttons = Array(venues.pageCount).map((x, i) => (
    <button
      key={`page-button-${i}`} // eslint-disable-line
      className={venues.currentPage === i
        ? 'page-button active' : 'page-button'}
      onClick={() => history.push(`${location.pathname}?${newPageSearch(i)}`)}>
      {i}
    </button>
  ))

  return (
    <nav className="pagination-menu">
      {venues.data.length > 0 &&
        <span className="paginate-text">
          {offset + 1} -&nbsp;
          {offset + venues.perPage > venues.total
            ? venues.total : offset + venues.perPage}&nbsp;
          of {venues.total} venues
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
