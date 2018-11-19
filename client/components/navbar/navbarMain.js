import React from 'react'

const Navbar = props => {

  return(
<nav className="navbar is-link is-fixed-top" role="navigation">
    <div className="navbar-brand">
        <a className="navbar-item is-expanded">
            <i className="fa fa-user"></i>
            <p className="is-size-7">Props1</p>
        </a>
        <a className="navbar-item is-expanded">
            <i className="fa fa-list"></i>
            <p className="is-size-7">Props2</p>
        </a>
    </div>
</nav>
  )
}

export default Navbar

/**
 * PROP TYPES
 */
