import React, {Component} from 'react'
import {connect} from 'react-redux'
import {approveSingleReservation, markReservationAsServed} from '../store'

class ReservationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      waitTime: this.props.defaultWaitTime
    }
  }
  handleChangeWaitTime = event => {
    event.preventDefault()
    this.setState({waitTime: event.target.value})
  }

  handleApprovePending = event => {
    event.preventDefault()
    const reservationId = event.target.name
    this.props.approveSingleReservation(reservationId, this.state.waitTime)
  }

  // converts dateandtime value from sequelize -> Date object
  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  render() {
    const {reservation, handleServeActive} = this.props
    const handleApprovePending = this.handleApprovePending

    let diff, minFromNow, timeOfService
    if (reservation.estimatedTimeOfService) {
      timeOfService = this.parseISOString(reservation.estimatedTimeOfService)
      minFromNow = Math.floor((timeOfService - new Date)/60000)
    }
    return (
      <article className="media box">
        <div className="media-left">
          <h3>
            {reservation.queuePosition
              ? `# ${reservation.queuePosition}`
              : 'n/a'}
          </h3>
        </div>
        <div className="media-content">
          <p>Name: {reservation.name}</p>
          <p>Status: {reservation.status}</p>
          <p>Phone #: {reservation.phoneNumber}</p>
          <p>Party Size: {reservation.partySize}</p>
          <p>Date booked: {this.parseISOString(reservation.dateBooked).toString()}</p>
          <p>Note: {reservation.note}</p>
          <p>Estimated time of service: {minFromNow ? `${minFromNow} min` : 'n/a'}</p>
        </div>
        <div className="media-right">
          {reservation.status === 'Pending' && (
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={this.state.waitTime}
                  name={reservation.id}
                  onChange={this.handleChangeWaitTime}
                  placeholder="Estimate how long they'll wait (minutes)"
                />
              </div>
              <div className="control">
                <button
                  name={reservation.id}
                  type="button"
                  className="button"
                  onClick={handleApprovePending}
                >
                  Approve
                </button>
              </div>
            </div>
          )}
          {reservation.status === 'Active' && (
            <button
              name={reservation.id}
              type="button"
              className="button"
              onClick={handleServeActive}
            >
              Mark as served
            </button>
          )}
        </div>
      </article>
    )
  }
}

const mapDispatch = dispatch => ({
  approveSingleReservation: (reservationId, waitTime) =>
    dispatch(approveSingleReservation(reservationId, waitTime)),
  handleServeActive: event => {
    const reservationId = event.target.name
    dispatch(markReservationAsServed(reservationId))
  }
})

export default connect(null, mapDispatch)(ReservationCard)
