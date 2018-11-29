import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login} from './auth-form'
import {me, logout, fetchUserAppointment, updateAppointment, updateStylistSlot} from '../store'
import Footer from './footer'
import moment from 'moment'

import {confirmAlert} from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

/**
 * COMPONENT
 */

export class UserHome extends React.Component {
  submit = () => {
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure to cancel this reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const appointmentInfo = {
              status: 'Cancelled',
              id: this.props.appointment[0].id
            }
            const stylistSlotInfo = {
              status: "Open",
              stylistId: this.props.appointment[0].stylistId,
              slotId: this.props.appointment[0].slotId
            }
            await this.props.cancelAppointment(appointmentInfo)
            await this.props.bookStylistSlot(stylistSlotInfo)
            alert('Reservation is canceled')
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }
  componentDidMount() {
    this.props.getAppointment()
  }

  render() {
    const {
      email,
      isLoggedIn,
      isNotLoggedIn,
      handleClick,
      appointment
    } = this.props
    let imgUrl = 'https://victoriassalon.com/wp-content/uploads/2015/02/rev.jpg'
    return (
      <div className="insideFrameHome">
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
          <div className="container has-text-centered">
            <div className="has-text-white">
              <p className="title has-text-white">Welcome, {email}</p>
            </div>
          </div>
        )}
        {appointment.length !== 0 && (
          <div className="card front-page animated fadeInDown">
            <header className="card-header has-text-centered">
              <p className="card-header-title has-text-centered">
                Up Coming Reservation
              </p>
            </header>
            <div className="card-content has-text-centered">
              <div className="content">
               <Link to={`/business/${appointment[0].stylist.business.id}`}>
                <strong>{appointment[0].stylist.business.name}</strong></Link>
                <p>{appointment[0].stylist.business.address}</p>
                <p>{appointment[0].stylist.business.phoneNumber}</p>
                <p>Stylist: {appointment[0].stylist.name}</p>
                <strong>
                  {moment(appointment[0].slot.date).format('MMM Do YY')}
                  {'   '}
                  {appointment[0].slot.time}
                </strong>
              </div>
            </div>
            <footer className="card-footer">
              <div className="card-footer-item">
                <button className="button is-link" onClick={this.submit}>
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        )}
        <div className="container has-text-centered animated fadeInUp">
          <div>
            <div className="column is-4 is-offset-4">
              <Link to="/map">
                <button
                  className="button is-block is-danger is-large is-fullwidth"
                  type="button"
                >
                  Find Map &nbsp;&nbsp; &nbsp;&nbsp;{' '}
                  <i className="fa fa-map" aria-hidden="true" />
                </button>
              </Link>
            </div>
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
            {isNotLoggedIn && <Login className="animated fadeInUp" />}
            <br />
          </div>
        </div>
        <img className="bg" src={imgUrl} />
        {isLoggedIn && <Footer className="animated fadeInUp" />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isNotLoggedIn: !state.user.id,
    email: state.user.email,
    appointment: state.appointment
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    handleClick() {
      dispatch(logout())
    },
    getAppointment: () => dispatch(fetchUserAppointment()),
    cancelAppointment: status => dispatch(updateAppointment(status)),
    bookStylistSlot: stylistSlotInfo =>
    dispatch(updateStylistSlot(stylistSlotInfo))
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
