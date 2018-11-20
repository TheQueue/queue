import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessData} from '../store'
import {ReservationCard} from './index'

class MyBusinessDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessId: props.match.params.businessId
    }
  }
  async componentDidMount() {
    // fetch data
    await this.props.fetchMyBusinessData()
    // filter fetched data to correct business id
  }
  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  render() {
    const {myBusinesses} = this.props
    const {businessId} = this.state

    // if isLoading value is true -> loading msg
    if (myBusinesses.isLoading) {
      return (
        <div className="box">
          <h1 className="title">My Business - Detail</h1>
          <div>Loading...</div>
        </div>
      )
    }
    // check if entities exists in businessData
    if (myBusinesses.businessData.hasOwnProperty('entities')) {
      const {entities, result} = myBusinesses.businessData
      if (entities.businesses[businessId]) {
        const currBusiness = entities.businesses[businessId]
        // if no associated queue for current business...
        // return this
        if (!currBusiness.queues.length) {
          return (
            <div className="container">
              <div className="box">
                <h1 className="title">{currBusiness.name}</h1>
                <h2>Business ID: {currBusiness.id}</h2>
                <h2>Address: {currBusiness.address}</h2>
                <h2>Phone: {currBusiness.phoneNumber}</h2>
                <h2>No queue found.</h2>
              </div>
            </div>
          )
        } else {
          // this else block renders business info + queue data

          // matchingReservs is hash table
          // key = status, value = array of reservations that have that status
          // we'll loop through statusList array to get matching reservations
          const matchingReservs = {}
          const statusList = [
            'Pending',
            'Active',
            'Serviced',
            'Cancelled',
            'Holding'
          ]
          statusList.forEach(status => {
            matchingReservs[status] = entities.queues[
              currBusiness.queues[0]
            ].reservations
              .map(reservationId => entities.reservations[reservationId])
              .filter(res => res.status === status)
          })
          const currQueue = entities.queues[currBusiness.queues[0]]

          // calculates last seat time based on if theres a time value on queue
          const lastSeatTimeMinFromNow = currQueue.timeAtWhichLastQueueGetsSeated ? Math.floor((this.parseISOString(currQueue.timeAtWhichLastQueueGetsSeated) - new Date)/60000) : currQueue.defaultWaitTime

          return (
            <div className="container">
              <div className="box">
                <h1 className="title">{currBusiness.name}</h1>
                <h2>Business ID: {currBusiness.id}</h2>
                <h2>Address: {currBusiness.address}</h2>
                <h2>Phone: {currBusiness.phoneNumber}</h2>
              </div>
              {currBusiness.queues.length ? (
                <div className="box">
                  <h2 className="title">Queue:</h2>
                  <h3>Active Queue Length: {matchingReservs.Active.length}</h3>
                  <h3>Last party will get seated in: {lastSeatTimeMinFromNow}</h3>
                  <h3>Wait time per party: {currQueue.defaultWaitTime} min</h3>
                  {statusList.map(status => (
                    <React.Fragment key={status}>
                      <h3>
                        {status} Reservations ({matchingReservs[status].length})
                      </h3>
                      {entities.queues[currBusiness.queues[0]].reservations
                        .length && (
                        <div>
                          {matchingReservs[status].map(reservation => (
                            <ReservationCard
                              reservation={reservation}
                              key={reservation.id}
                              defaultWaitTime={currQueue.defaultWaitTime}
                            />
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                'no queue'
              )}
            </div>
          )
        }
      } else {
        // this is for if the business with specified businessId
        // is not found in the loaded data
        return (
          <div>
            <h1>Business not found</h1>
          </div>
        )
      }
    }
  }
}

const mapState = state => ({
  myBusinesses: state.myBusinesses
})

const mapDispatch = dispatch => ({
  fetchMyBusinessData: () => dispatch(fetchMyBusinessData())
})

export default connect(mapState, mapDispatch)(MyBusinessDetail)
