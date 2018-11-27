import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {showFilter, hideFilter} from '../../store'
import {connect} from 'react-redux'

const Navbar = props => {
  const {prop1, prop2, isFilterVisible, showFilter, hideFilter} = props
  // console.log(props.location.pathname)
  const isList = props.match.path === '/businessList'
  const isMap = props.match.path === '/map'
  const toggleFilter = () => {
    isFilterVisible ? hideFilter() : showFilter()
  }

  if (isList) {
    return (
      <nav className="navbar is-link is-fixed-top" role="navigation">
        <Link
          to="/map"
          className="navbar-item is-expanded is-block has-text-centered"
        >
          <i className="icon fa fa-map-marker" />
          <p className="is-size-7">Map</p>
        </Link>
        <Link
          to="/home"
          className="navbar-item is-expanded is-block is-flex is-logo"
        >
          <img src="/logo.png" height="32" width="32" />
        </Link>
        <a
          className="navbar-item is-expanded is-block has-text-centered"
          onClick={toggleFilter}
        >
          <i className="fa fa-filter" />
          <p className="is-size-7">Filter</p>
        </a>
      </nav>
    )
  } else if (isMap) {
    return (
      <nav className="navbar is-link is-fixed-top" role="navigation">
        <Link
          to="/businessList"
          className="navbar-item is-expanded is-block has-text-centered"
        >
          <i className="icon fa fa-list-ul" />
          <p className="is-size-7">List</p>
        </Link>
        <Link
          to="/home"
          className="navbar-item is-expanded is-block is-flex is-logo"
        >
          <img src="/logo.png" height="32" width="32" />
        </Link>
        <a
          className="navbar-item is-expanded is-block has-text-centered"
          onClick={toggleFilter}
        >
          <i className="fa fa-filter" />
          <p className="is-size-7">Filter</p>
        </a>
      </nav>
    )
  } else {
    return (
      <nav className="navbar is-link is-fixed-top" role="navigation">
        <Link
          to="/businessList"
          className="navbar-item is-expanded is-block has-text-centered"
        >
          <i className="icon fa fa-list-ul" />
          <p className="is-size-7">List</p>
        </Link>
        <Link
          to="/home"
          className="navbar-item is-expanded is-block is-flex is-logo"
        >
          <img src="/logo.png" height="32" width="32" />
        </Link>
        <Link
          to="/map"
          className="navbar-item is-expanded is-block has-text-centered"
        >
          <i className="icon fa fa-map-marker" />
          <p className="is-size-7">Map</p>
        </Link>
      </nav>
    )
  }
}

const mapState = state => ({
  isFilterVisible: state.categories.isFilterVisible
})
const mapDispatch = dispatch => ({
  showFilter: () => dispatch(showFilter()),
  hideFilter: () => dispatch(hideFilter())
})

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
