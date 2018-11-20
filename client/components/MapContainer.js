import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import CurrentLocation from './map'
import {thunkAllB} from '../store/business'
import {connect} from 'react-redux'

const mapStyles = {
  width: '100%',
  height: '100%'
}
// MAP STATE AND DISPATCH TO PROPS
const mapState = state => ({
  business: state.business.businesses
})
const mapDispatch = dispatch => {
  return {
    fetchB: () => {
      dispatch(thunkAllB())
    }
  }
}

// ACTUAL COMPONENT
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  }
  componentDidMount() {
    this.props.fetchB()
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }



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
    const businesses = this.props.business
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {businesses.map(business => (
          <Marker
            key={`marker${business.id}`}
            name={business.name}
            position={{
              lat: business.coordinates[0],
              lng: business.coordinates[1]
            }}
            onClick={this.onMarkerClick}
            // this renders markers for each item in state.business
          />
        ))}
        {businesses.map(business => (
          <InfoWindow
            key={`window${business.id}`}
            position={{
              lat: business.coordinates[0],
              lng: business.coordinates[1]
            }}
            visible={true}
          >
            <div>
              <h4>{business.name}</h4>
              <h4>{this.calculateWaitTime(business)} min wait time</h4>
            </div>
          </InfoWindow>
        ))}
        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: 'AIzaSyAQOJclHXVkkIoHGpFDgRwcqoqjy9VZSzk'
}))(connect(mapState, mapDispatch)(MapContainer))
