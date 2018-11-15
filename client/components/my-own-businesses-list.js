import React, {Component} from 'react'
import {connect} from 'react-redux'
const MyOwnQueuesList = props => {
  const {currentQueue} = props

  // if currentQueue redux doesnt have name, return loading msg
  if (!currentQueue.hasOwnProperty(name)) {
    return (<div>
      <h1>My Queue</h1>
      <div>
        Loading...
      </div>
    </div>)
  }
  const {reservations} = currentQueue
  // else return store data
  return (
    <div>
      <h1>My Businesses</h1>
      <div>
        {reservations.map((reservation) => (
          <div key={reservation.id}>reservation # ${reservation.queuePos}</div>
        ))}
      </div>
    </div>
  )
}

const mapState = state => ({
  currentQueue: state.currentQueue,
})
// const mapDispatch = dispatch => ({
//   fetchCurrentQueue:
// })

export default connect(mapState)(MyOwnQueuesList)
