import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {getDetails} from '../store/business'

function mapState(state) {
  return {
    business: state.business.single.business,
    isClosed: state.business.single.closed
  }
}
function mapDispatch(dispatch) {
  return {
    getB: id => dispatch(getDetails(id))
  }
}

class SingleBusiness extends React.Component {
  componentDidMount() {
    this.props.getB(Number(this.props.match.params.id))
  }
  componentWillUnmount() {}

  calculateWaitTime = (business) => {
    function parseISOString(s) {
      var b = s.split(/\D+/)
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
    }

    let waitTime;
    // if business full, calculate a wait time
    if (business.queues[0].isBusinessFull) {
      if (business.queues[0].queueLength === 0 || business.queues[0].timeAtWhichLastQueueGetsSeated === null) {
        // use default wait time
        waitTime = business.queues[0].defaultWaitTime
      } else if (business.queues[0].timeAtWhichLastQueueGetsSeated) {
        // if there's a 'time at which last queue gets served', calculate time diff from that
        let timeOfService = parseISOString(
          business.queues[0].timeAtWhichLastQueueGetsSeated
        )
        waitTime =  Math.floor((timeOfService - new Date()) / 60000)
      }
    } else {
      // if business is not full, return 0 min
      waitTime = 0;
    }
    if (waitTime < 0) waitTime = 0 // handle negative wait times
    return waitTime;
  }

  render() {
    console.log(this.props)

    if (
      (!this.props.business && !this.props.isClosed) ||
      this.props.business.id !== Number(this.props.match.params.id)
    ) {
      return <div />
    }
    return (
      <div className="sp">
        <img src={this.props.business.imageUrl} />
        <h3>{this.props.business.name}</h3>
        <p />
        Address: {this.props.business.address}
        phoneNumber: {this.props.business.phoneNumber}
        {this.props.isClosed ? <p>Closed</p> : <p>Open</p>}
        {!this.props.isClosed && <p>{this.calculateWaitTime(this.props.business)} min wait time</p>}
        <p />
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
