import React from 'react'
import PropTypes from 'prop-types'

const ListPaginate = ({ history, venues, region }) => {
  const offset = (venues.currentPage - 1) * venues.perPage
  const buttons = []
  if (venues.pageCount > 1) {
    for (let page = 1; page <= venues.pageCount; page += 1) {
      buttons.push(<button
        key={`page-button-${page}`}
        className={venues.currentPage === page ? 'paginate-button active' : 'paginate-button'}
        onClick={() => history.push(`?region-text=${region.text}&page=${page}`)}
      >{page}</button>)
    }
  }

  return (
    <div className="paginate-container">
      {venues.data.length > 0 &&
        <span className="paginate-text">
          {offset + 1} - {offset + venues.perPage > venues.total ? venues.total : offset + venues.perPage} of {venues.total} Venues
        </span>}
      {buttons}
    </div>
  )
}

ListPaginate.propTypes = {
  history: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
}

export default ListPaginate
