import React from 'react'
import PropTypes from 'prop-types'

import { venueSelected } from '../../venue/venue'

import Card from './Card'
import ListPaginate from './ListPaginate'

const List = ({ dispatch, history, region, venues }) => {
  const handleCardClick = (venue) => {
    dispatch(venueSelected(venue))
    history.push(`/venue?id=${venue._id}`)
  }

  const cards = venues.data.map(venue => (
    <Card
      key={venue._id}
      dispatch={dispatch}
      venue={venue}
      handleCardClick={handleCardClick} />
  ))

  const pagination = (
    <ListPaginate
      history={history}
      venues={venues}
      region={region} />
  )

  return (
    <section className="venue-list-container">
      {pagination}
      {cards}
      {pagination}
    </section>
  )
}

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  venues: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
}

export default List
