import React from 'react'
import PropTypes from 'prop-types'

import VenueCard from './VenueCard'
import PaginationMenu from './PaginationMenu'

const VenuesList = ({ location, history, venues, handleCardClick }) => {
  const paginationMenu = (
    <PaginationMenu
      location={location}
      history={history}
      venues={venues} />
  )

  return (
    <section className="venues-list">
      {paginationMenu}
      {venues.data.map(venue => (
        <VenueCard
          key={venue._id}
          venue={venue}
          handleClick={handleCardClick} />
      ))}
      {paginationMenu}
    </section>
  )
}

VenuesList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired
}

export default VenuesList
