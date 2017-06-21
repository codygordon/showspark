import React from 'react'
import PropTypes from 'prop-types'

import { CSSTransitionGroup } from 'react-transition-group'
import VenueCard from './VenueCard'
import PaginationMenu from './PaginationMenu'

const VenueList = ({ perPage, currentPage, totalVenues, venues, ...props }) => {
  const paginationMenu = (
    <PaginationMenu
      perPage={perPage}
      currentPage={currentPage}
      total={totalVenues}
      handlePageButtonClick={props.handlePageButtonClick} />
  )

  return (
    <section className="venue-list">
      {paginationMenu}
      <CSSTransitionGroup
        className="venue-cards"
        transitionName="venue-cards"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={1}>
        {venues.data.length && venues.data.map(venue => (
          <VenueCard
            key={venue._id}
            venue={venue}
            handleHover={props.handleCardHover}
            handleClick={props.handleCardClick} />
        ))}
      </CSSTransitionGroup>
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

export default VenueList
