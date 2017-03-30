import React from 'react'

import RegionSearch from '../../shared-components/RegionSearch'

const Jumbotron = props => (
  <section className="home-jumbotron">
    <h1 className="home-jumbotron-heading">
      Want some help <span className="standout">booking your next show?</span>
    </h1>
    <div className="home-jumbotron-region-search">
      <RegionSearch
        history={props.history}
        region={props.region}
        regionSet={props.regionSet}
      />
    </div>
  </section>
)

export default Jumbotron
