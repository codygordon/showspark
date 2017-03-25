import React from 'react'

const VenueListPaginate = (props) => {
  const { venues, selectedLocation, history, pageSelected } = props
  const buttons = []
  const offset = (venues.currentPage - 1) * venues.perPage
  if (venues.pageCount > 1) {
    for (let pg = 1; pg <= venues.pageCount; pg += 1) {
      buttons.push(<button
        key={`page-button-${pg}`}
        className={venues.currentPage === pg ? 'paginate-button active' : 'paginate-button'}
        onClick={() => {
          pageSelected(selectedLocation.text, venues.perPage, offset, pg)
          history.push(`?location-text=${selectedLocation.text}&page=${pg}`)
        }}
      >{pg}</button>)
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

export default VenueListPaginate
