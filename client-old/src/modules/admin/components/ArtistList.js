import React from 'react'
import PropTypes from 'prop-types'

// import PaginationMenu from '../../app/components/PaginationMenu'
import ArtistRow from './ArtistRow'

const ArtistList = props => (
  <section className="artist-list">
    {/* <PaginationMenu
      perPage={perPage}
      currentPage={currentPage}
      total={totalVenues}
      handlePageButtonClick={props.handlePageButtonClick} /> */}
    {props.artists.map(artist => (
      <ArtistRow artist={artist} />
    ))}
  </section>
)

ArtistList.propTypes = {
  artists: PropTypes.array.isRequired
}

export default ArtistList
