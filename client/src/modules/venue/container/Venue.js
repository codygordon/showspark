import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import Header from '../components/Header'

export default class Venue extends Component {
  static PropTypes = {

  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search)
    if (query.id && !this.props.venue._id) {
      this.props.fetchVenue(query.id)
    } else if (!query.id) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className="venue">
        <Header />

        <Dimmer active={this.props.venue.isFetching}>
          <Loader size="large">
            Loading Venue...
          </Loader>
        </Dimmer>

        <h1>{this.props.venue.title}</h1>
      </div>
    )
  }
}
