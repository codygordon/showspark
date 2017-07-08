import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { debounce } from 'lodash'

import { Loader } from 'semantic-ui-react'
import FbPageSearchItem from './FbPageSearchItem'

export default class FbPageSearch extends Component {
  static defaultProps = {
    addClass: '',
    label: '',
    category: null,
    maxLikes: 999999999,
    minLikes: 0,
    limit: 25,
    placeholder: '',
    pageFields: ['id', 'name', 'category', 'fan_count', 'picture']
  }

  static propTypes = {
    fbToken: PropTypes.string.isRequired,
    addClass: PropTypes.string,
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
    showItems: false,
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

  handlePageItemClick = (page) => {
    this.props.onPageSelect(page)
    this.setState({ pages: [] })
    this.searchInput.value = ''
    this.searchInput.focus()
  }

  render() {
    const { addClass, label, placeholder } = this.props
    const { showItems, isFetching, error, pages } = this.state
    return (
      <div className={`fb-page-search ${addClass}`.trim()}>
        {label && <label htmlFor="page-search-input">{label}</label>}
        <input
          id="page-search-input"
          type="text"
          placeholder={placeholder}
          ref={(ref) => { this.searchInput = ref }}
          onFocus={() => setTimeout(() => {
            this.setState({ showItems: true })
          }, 155)}
          onBlur={() => setTimeout(() => {
            this.setState({ showItems: false })
          }, 150)}
          onChange={() => {
            this.setState({ isFetching: true, pages: [] })
            this.handleInputChange()
          }} />
        {(isFetching || pages.length || error) && showItems &&
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
