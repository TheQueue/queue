import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Navbar = props => {
  const {prop1, prop2} = props
  console.log(props.location.pathname)
  return (
    <nav className="navbar is-link is-fixed-top" role="navigation">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossOrigin="anonymous"
      />
      <Link to="/businessList" className="navbar-item is-expanded is-block has-text-centered">
        <i className="fa fa-list-ul" />
        <p className="is-size-7">List</p>
      </Link>
      <Link to="/home" className="navbar-item is-expanded is-block is-flex is-logo">
        <img src="/logo.png" height="32" width="32"  />
        
      </Link>
      {<Link to='/search' className="navbar-item is-expanded is-block has-text-centered">
        <i className="fa fa-filter" />
        <p className="is-size-7">Filter</p>
      </Link>}
    </nav>
  )
}

export default withRouter(Navbar)

/**
 * PROP TYPES
 */
