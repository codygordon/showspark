import React from 'react'

import LocationSearch from '../../shared-components/LocationSearch'

const Jumbotron = props => (
  <section className="home-jumbotron">
    <h1 className="home-jumbotron-heading">
      Want some help <span className="standout">booking your next show?</span>
    </h1>
    <div className="home-jumbotron-location-search">
      <LocationSearch
        history={props.history}
        location={props.location}
        venues={props.venues}
        selectedLocation={props.selectedLocation}
        locationSelectedAndRequestVenues={props.locationSelectedAndRequestVenues}
        locationSelected={props.locationSelected}
      />
    </div>
  </section>
)

export default Jumbotron
