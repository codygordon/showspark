import React from 'react'
import PropTypes from 'prop-types'

import RegionSearch from '../../shared-components/RegionSearch'

const Jumbotron = ({ dispatch, history, region }) => (
  <section className="home-jumbotron">
    <h1 className="home-jumbotron-heading">
      Help other artists by <span className="standout">reviewing the venues you&#39;ve played!</span>
    </h1>
    <div className="home-jumbotron-region-search">
      <RegionSearch
        dispatch={dispatch}
        history={history}
        region={region} />
    </div>
  </section>
)

Jumbotron.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
}

export default Jumbotron
