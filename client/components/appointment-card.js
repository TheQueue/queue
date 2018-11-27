import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSingleReservationThunk} from '../store'
import moment from 'moment'

class AppointmentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleCancel = event => {
    event.preventDefault()
    const reservationId = event.target.name
    this.props.updateSingleReservationThunk(reservationId, 'cancel')
  }

  handleService = event => {
    event.preventDefault()
    const reservationId = event.target.name
    this.props.updateSingleReservationThunk(reservationId, 'service')
  }

  // converts dateandtime value from sequelize -> Date object
  parseISOString(s) {
    var b = s.split(/\D+/)
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
  }

  render() {
    const {appointment, slot, user} = this.props
    const handleCancel = this.handleCancel
    const handleService = this.handleService
    const slotDate = moment(this.parseISOString(slot.date)).format('MMM Do YY')
    return (
      <article className="media box">
        <div className="media-left">
          <img src="" />
        </div>
        <div className="media-content">
          <p>
            Date:{' '}
            {slotDate}
          </p>
          <p>
            Time:{' '}
            {slot.time}
          </p>
          <p>Username: {user.username}</p>
          <p>Status: {appointment.status}</p>
          <p>Phone #: {user.phoneNumber}</p>
          <p>Note: {appointment.note}</p>
        </div>
        <div className="media-right">
          {appointment.status === 'Active' && (
            <button
              name={appointment.id}
              type="button"
              className="button"
              onClick={handleService}
            >
              Mark as served
            </button>
          )}
          {appointment.status === 'Active' && (
            <button
              name={appointment.id}
              type="button"
              className="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </article>
    )
  }
}

const mapDispatch = dispatch => ({
  updateSingleReservationThunk: (appointmentId, action) =>
    dispatch(updateSingleReservationThunk(appointmentId, action))
})

export default connect(null, mapDispatch)(AppointmentCard)
