import React from 'react'
import PropTypes from 'prop-types'

const FbPageSearchItem = ({ page, handleClick }) => (
  <div
    className="fb-page-search-item"
    role="presentation"
    onClick={() => handleClick(page)}>
    <img src={page.picture.data.url} alt="" />
    <span className="name">{page.name}</span>
    <span className="likes">
      <i className="fa fa-thumbs-up" aria-hidden="true" />
      {page.fan_count.toLocaleString()}
    </span>
  </div>
)

FbPageSearchItem.propTypes = {
  page: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default FbPageSearchItem
