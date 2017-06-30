import React from 'react'
import PropTypes from 'prop-types'

import PaginationMenu from '../../app/components/PaginationMenu'

const ArtistList = ({ perPage, currentPage, totalVenues, venues, ...props }) => {
  const paginationMenu = (
    <PaginationMenu
      perPage={perPage}
      currentPage={currentPage}
      total={totalVenues}
      handlePageButtonClick={props.handlePageButtonClick} />
  )

  return (
    <section className="artist-list">
      {paginationMenu}
    </section>
  )
}

VenueList.propTypes = {
  venues: PropTypes.array.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalVenues: PropTypes.number.isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handlePageButtonClick: PropTypes.func.isRequired
}

export default ArtistList
