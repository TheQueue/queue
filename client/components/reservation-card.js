import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSingleReservationThunk} from '../store'

class ReservationCard extends Component {
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
    const {reservation} = this.props
    const handleCancel = this.handleCancel
    const handleService = this.handleService

    return (
      <article className="media box">
        <div className="media-left">
          <img src="" />
        </div>
        <div className="media-content">
          <p>Name: {reservation.name}</p>
          <p>Status: {reservation.status}</p>
          <p>Phone #: {reservation.phoneNumber}</p>
          <p>
            Start time:{' '}
            {this.parseISOString(reservation.startDateAndTime).toString()}
          </p>
          <p>
            End time:{' '}
            {this.parseISOString(reservation.endDateAndTime).toString()}
          </p>
          <p>Note: {reservation.note}</p>
        </div>
        <div className="media-right">
          {reservation.status === 'Active' && (
            <button
              name={reservation.id}
              type="button"
              className="button"
              onClick={handleService}
            >
              Mark as served
            </button>
          )}
          {reservation.status === 'Active' && (
            <button
              name={reservation.id}
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
  updateSingleReservationThunk: (reservationId, action) =>
    dispatch(updateSingleReservationThunk(reservationId, action))
})

export default connect(null, mapDispatch)(ReservationCard)
