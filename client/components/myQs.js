import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {
  fetchUserAppointment,
  updateAppointment,
  updateStylistSlot
} from '../store'
import Footer from './footer'
import moment from 'moment'
import Navbar from './navbar/navbarMain'

import {confirmAlert} from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

/**
 * COMPONENT
 */

export class MyQs extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit = event => {
    const x = this.props.appointment[event.target.value]
    console.log(x)
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure to cancel this reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            console.log(x)
            const appointmentInfo = {
              status: 'Cancelled',
              id: x.id
            }
            const stylistSlotInfo = {
              status: 'Open',
              stylistId: x.stylistId,
              slotId: x.slotId
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
    const {appointment} = this.props
    return (
      <div>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <Navbar />
        <div className="section insideFrame">
          <div className="container">
            {appointment.length !== 0 ? (
              appointment.map((x, index) => (
                <div key={x.id}>
                  <div className="card front-page animated fadeInDown">
                    <header className="card-header has-text-centered">
                      <p className="card-header-title has-text-centered">
                        Up Coming Reservation {index + 1}
                      </p>
                    </header>
                    <div className="card-content has-text-centered">
                      <div className="content">
                        <strong>{x.stylist.business.name}</strong>
                        <p>{x.stylist.business.address}</p>
                        <p>{x.stylist.business.phoneNumber}</p>
                        <p>Stylist: {x.stylist.name}</p>
                        <strong>
                          {moment(x.slot.date).format('MMM Do YY')}
                          {'   '}
                          {x.slot.time}
                        </strong>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <div className="card-footer-item">
                        <button
                        type="button"
                          className="button is-link"
                          onClick={this.submit}
                          value={index}
                        >
                          Cancel
                        </button>
                      </div>
                    </footer>
                  </div>
                  <br />
                </div>
              ))
            ) : (
              <div className="box has-text-centered">
                <p>No reservations found.</p>
              </div>
            )}
          </div>
        </div>
        <Footer className="animated fadeInUp" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    appointment: state.appointment
  }
}

const mapDispatch = dispatch => {
  return {
    getAppointment: () => dispatch(fetchUserAppointment()),
    cancelAppointment: status => dispatch(updateAppointment(status)),
    bookStylistSlot: stylistSlotInfo =>
      dispatch(updateStylistSlot(stylistSlotInfo))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(MyQs))

/**
 * PROP TYPES
 */
