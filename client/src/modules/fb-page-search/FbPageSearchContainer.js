import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { debounce } from 'lodash'

import { Loader } from 'semantic-ui-react'
import FbPageSearchItem from './components/FbPageSearchItem'

export default class FbPageSearchContainer extends Component {
  static defaultProps = {
    label: [<i key="i" className="fa fa-facebook-official" aria-hidden="true" />, ' Page'],
    category: null,
    maxLikes: null,
    minLikes: 0,
    limit: 25,
    placeholder: '',
    pageFields: ['id', 'name', 'category', 'fan_count', 'picture']
  }

  static propTypes = {
    fbToken: PropTypes.string.isRequired,
    label: PropTypes.array,
    pageFields: PropTypes.array,
    limit: PropTypes.number,
    category: PropTypes.string,
    maxLikes: PropTypes.number,
    minLikes: PropTypes.number,
    placeholder: PropTypes.string,
    onPageSelect: PropTypes.func.isRequired
  }

  state = {
    isFetching: false,
    error: '',
    pages: []
  }

  handleInputChange = debounce(async () => {
    if (!this.searchInput.value) return this.setState({ isFetching: false })
    const { fbToken, limit, minLikes, maxLikes, category, pageFields } = this.props
    try {
      const url = 'https://graph.facebook.com/v2.9/search'
      const params = {
        type: 'page',
        q: this.searchInput.value,
        fields: pageFields.join(','),
        access_token: fbToken,
        limit
      }
      const fullUri = `${url}?${qs.stringify(params)}`
      const res = await fetch(fullUri)
      const resParsed = await res.json()
      if (resParsed.data) {
        const pages = resParsed.data.filter(page => (
          page.fan_count >= minLikes
          && page.fan_count <= maxLikes
          && page.category === category
        ))
        return this.setState({
          pages,
          isFetching: false
        })
      }
      return this.setState({ pages: [], isFetching: false })
    } catch (err) { return this.setState({ error: err }) }
  }, 250)

  handlePageItemClick = async (page) => {
    const { onPageSelect } = this.props
    onPageSelect(page)
  }

  render() {
    const { isFetching, error, pages } = this.state
    return (
      <div className="fb-page-search">
        <label htmlFor="page-search-input">
          {this.props.label}
        </label>
        <input
          id="page-search-input"
          type="text"
          placeholder={this.props.placeholder}
          ref={(ref) => { this.searchInput = ref }}
          onChange={() => {
            this.setState({ isFetching: true, pages: [] })
            this.handleInputChange()
          }} />
        {(isFetching || pages.length || error) &&
          <div className="items-container">
            {isFetching &&
              <div className="loading">
                <Loader active inverted inline size="small" />
                Loading pages...
              </div>
            }
            {!!error && <div className="error">{error}</div> }
            {pages.slice(0, 5).map(page => (
              <FbPageSearchItem
                key={page.id}
                page={page}
                handleClick={this.handlePageItemClick} />
            ))}
          </div>
        }
      </div>
    )
  }
}
