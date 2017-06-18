import React from 'react'
import PropTypes from 'prop-types'

import VenueCard from './VenueCard'
import PaginationMenu from './PaginationMenu'

const VenueList = ({ location, history, venues, ...props }) => {
  const paginationMenu = (
    <PaginationMenu
      location={location}
      history={history}
      venues={venues} />
  )

  return (
    <section className="venue-list">
      {paginationMenu}
      {venues.data.map(venue => (
        <VenueCard
          key={venue._id}
          venue={venue}
          handleHover={props.handleCardHover}
          handleClick={props.handleCardClick} />
      ))}
      {paginationMenu}
    </section>
  )
}

VenueList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
}

export default VenueList
