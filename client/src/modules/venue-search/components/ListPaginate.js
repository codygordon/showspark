import React from 'react'

const ListPaginate = (props) => {
  const { venues, selectedLocation, history, pageSelected } = props
  const offset = (venues.currentPage - 1) * venues.perPage
  const buttons = []
  if (venues.pageCount > 1) {
    for (let page = 1; page <= venues.pageCount; page += 1) {
      buttons.push(<button
        key={`page-button-${page}`}
        className={venues.currentPage === page ? 'paginate-button active' : 'paginate-button'}
        onClick={() => {
          const newOffset = (page - 1) * venues.perPage
          history.push(`?location-text=${selectedLocation.text}&page=${page}`)
        }}
      >{page}</button>)
    }
  }

  return (
    <div className="paginate-container">
      {props.venues.data.length > 0 &&
        <span className="paginate-text">
          {offset + 1} - {offset + venues.perPage > venues.total ? venues.total : offset + venues.perPage} of {venues.total} Venues
        </span>}
      {buttons}
    </div>
  )
}

export default ListPaginate
