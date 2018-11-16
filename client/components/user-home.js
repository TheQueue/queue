import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login} from './auth-form'
import {me, logout} from '../store'
import Footer from './footer'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email, isLoggedIn, isNotLoggedIn, handleClick} = props
  let imgUrl =
    'http://s3.amazonaws.com/architecture-org/files/pages/201307-twilight-cruise-089.jpg'

  return (
    <div className="login">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossOrigin="anonymous"
      />
      <div className="container has-text-centered">
        <img
          src="/logo.png"
          height="150"
          width="150"
          className="logo animated fadeInDown"
        />
      </div>
      {isLoggedIn && (
        <div className="container has-text-centered d">
          <h1 className="has-text-white is-medium">Welcome, {email}</h1>
        </div>
      )}
      <div className="container has-text-centered animated fadeInUp">
        <div>
          <div className="column is-4 is-offset-4">
            <button
              className="button is-block is-primary is-large is-fullwidth"
              type="button"
            >
              Scan QR &nbsp;&nbsp; &nbsp;&nbsp;{' '}
              <i className="fa fa-qrcode fa-lg" aria-hidden="true" />
            </button>
          </div>
          <div className="column is-4 is-offset-4">
            <button
              className="button is-block is-danger is-large is-fullwidth"
              type="button"
            >
              Find Map &nbsp;&nbsp; &nbsp;&nbsp;{' '}
              <i className="fa fa-map" aria-hidden="true" />
            </button>
          </div>
          {isNotLoggedIn && <Login />}
          {isLoggedIn && (
            <div className="column is-4 is-offset-4">
              <button
                className="button is-block is-warning is-large is-fullwidth"
                type="button"
                onClick={handleClick}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      <img className="bg" src={imgUrl} />
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isNotLoggedIn: !state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  handleClick: PropTypes.func.isRequired
}
