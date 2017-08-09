import React from 'react'
import PropTypes from 'prop-types'

import bandIcon from '../../../img/band-genre-icon.svg'
import acousticIcon from '../../../img/acoustic-genre-icon.svg'
import electronicIcon from '../../../img/electronic-genre-icon.svg'
import hipHopIcon from '../../../img/hip-hop-genre-icon.svg'

/* TODO LATER: Allow selection preferred genres (in green text) /
Not a good fit: (in red text) */

// TODO: Performance types, i.e. Band, Acoustic, DJ, Hip-Hop
const Genre = ({ genre }) => {
  let icon = null
  if (genre === 'Band') icon = bandIcon
  else if (genre === 'Acoustic') icon = acousticIcon
  else if (genre === 'Electronic') icon = electronicIcon
  else if (genre === 'Hip-Hop') icon = hipHopIcon
  else return null

  return (
    <div className="venue-genre">
      <span
        className="genre-icon"
        style={{ backgroundImage: `url(${icon})` }}
      />
      <span className="venue-genre-text">{genre}</span>
    </div>
  )
}

const Genres = ({ genres }) => (
  <div className="venue-genres-container">
    <div className="venue-genres-text">
      <span>Show types</span>
    </div>
    {genres.map(genre => <Genre genre={genre} key={`${genre}`} />)}
  </div>
)

Genres.propTypes = {
  genres: PropTypes.array.isRequired
}

Genre.propTypes = {
  genre: PropTypes.string.isRequired
}

export default Genres
