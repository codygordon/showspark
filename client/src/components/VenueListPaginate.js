import React from 'react'

const VenueListPaginate = (props) => {
  const { venues, selectedLocation, history, pageSelected } = props
  const buttons = []
  const offset = (venues.currentPage - 1) * (venues.perPage + 1)
  for (let i = 0; i < venues.pageCount; i += 1) {
    const page = i + 1
    buttons.push(<button
      key={`page-button-${i}`}
      className={venues.currentPage === i ? 'paginate-button active' : 'paginate-button'}
      onClick={() => {
        pageSelected(selectedLocation.text, venues.perPage, offset, page)
        history.push(`?location-text=${selectedLocation.text}&page=${page}`)
      }}
    >{i + 1}</button>)
  }

  return (
    <div className="paginate-container">
      <span className="paginate-text">
        {offset} - {offset + venues.perPage} of {venues.data.length} Venues
      </span>
      {buttons}
    </div>
  )
}

export default VenueListPaginate
