import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import apiCall from '../../utils/api-call'

class AdminContainer extends Component {
  static propTypes = {

  }

  state = {

  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <section className="admin-container">
        <h1>Admin Panel</h1>
      </section>
    )
  }
}

const Admin = connect()(AdminContainer)

export default Admin
