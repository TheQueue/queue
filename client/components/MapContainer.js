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
