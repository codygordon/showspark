import React from 'react'

const VenueListPaginate = (props) => {
  const { venues, selectedLocation, history, pageSelected } = props
  const buttons = []
  const offset = (venues.currentPage - 1) * venues.perPage
  if (venues.pageCount > 1) {
    for (let i = 0; i < venues.pageCount; i += 1) {
      const page = i + 1
      buttons.push(<button
        key={`page-button-${i}`}
        className={venues.currentPage === i + 1 ? 'paginate-button active' : 'paginate-button'}
        onClick={() => {
          history.push(`?location-text=${selectedLocation.text}&page=${page}`)
        }}
      >{i + 1}</button>)
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
