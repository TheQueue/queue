import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCurrentQueue} from '../store'

class MyOwnQueueDetail extends Component {
  componentDidMount() {
    this.props.fetchCurrentQueue(1)
  }


  render() {
    const {currentQueue} = this.props

    // if currentQueue redux doesnt have name, return loading msg
    if (!currentQueue.hasOwnProperty(name)) {
      return (
        <div>
          <h1>My Queue</h1>
          <div>Loading...</div>
        </div>
      )
    }
    const {reservations} = currentQueue
    // else return store data
    return (
      <div>
        <h1>My Queue</h1>
        <div>
          {reservations.map(reservation => (
            <div key={reservation.id}>
              reservation # ${reservation.queuePos}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  currentQueue: state.myOwnQueue
})
const mapDispatch = dispatch => ({
  fetchCurrentQueue: businessId => dispatch(fetchCurrentQueue(businessId))
})

export default connect(mapState, mapDispatch)(MyOwnQueueDetail)
