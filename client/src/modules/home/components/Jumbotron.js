import React from 'react'

import RegionSearch from '../../shared-components/RegionSearch'

const Jumbotron = props => (
  <section className="home-jumbotron">
    <h1 className="home-jumbotron-heading">
      Help other artists by <span className="standout">reviewing the venues you&#39;ve played!</span>
    </h1>
    <div className="home-jumbotron-region-search">
      <RegionSearch
        history={props.history}
        region={props.region}
        dispatch={props.dispatch}
      />
    </div>
  </section>
)

export default Jumbotron
