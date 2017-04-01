import React from 'react'

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
  if (genre === 'Acoustic') icon = acousticIcon
  if (genre === 'Electronic') icon = electronicIcon
  if (genre === 'Hip-Hop') icon = hipHopIcon

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
    <div className="venue-genres-text">Show types</div>
    {genres.map(genre => <Genre genre={genre} key={`${genre}`} />)}
  </div>
)

export default Genres
