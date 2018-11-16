import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, error} = props
  const handleSubmit = async evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    await props.auth(email, password, formName)
  }
  
  return (
    <div className="column is-4 is-offset-4">
    <div className="box is-centered">
      <form onSubmit={handleSubmit} name={name}>
        <div className="control">
        <label htmlFor="email">
          <input
            className="input is-large"
            type="email"
            name="email"
            placeholder="Your Email"
            autoFocus=""
          />
          </label>
        </div>
        <div className="control">
        <label htmlFor="password">
          <input
            className="input is-large"
            type="password"
            name="password"
            placeholder="Your Password"
          />
          </label>
        </div>
        <label className="checkbox">
          <input type="checkbox" />Remember me
        </label>
        <button
          className="button is-block is-info is-large is-fullwidth"
          type="submit"
        >
          Login
        </button>
        <p className="has-text-grey">
          <a href="../">Sign Up</a> &nbsp;·&nbsp;
          <a href="../">Forgot Password</a>
        </p>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
    </div>
    
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, formName) =>
    dispatch(auth(email, password, formName))
  }
}


export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object
}


