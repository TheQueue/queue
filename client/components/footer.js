import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
<nav className="navbar is-link is-fixed-bottom level is-centered" role="navigation">
    <div className="navbar-brand">
        <Link to="/search"><a className="navbar-item is-expanded">
            <i className="fa fa-user"></i>
            <p className="is-size-7">Search Qs</p>
        </a></Link>
        <Link to="/myQs"><a className="navbar-item is-expanded">
            <i className="fa fa-list"></i>
            <p className="is-size-7">My Qs</p>
        </a></Link>
        <Link to="/profile"><a className="navbar-item is-expanded">
            <i className="fa fa-flag"></i>
            <p className="is-size-7">Profile</p>
        </a></Link>
        <Link to ="/favorites"><a className="navbar-item is-expanded">
            <i className="fa fa-cog"></i>
            <p className="is-size-7">Favorite</p>
        </a></Link>
        <Link to="/Qdata"><a className="navbar-item is-expanded">
            <i className="fa fa-cog"></i>
            <p className="is-size-7">Q Data</p>
        </a></Link>
    </div>
</nav>
  )
}
export default Footer


