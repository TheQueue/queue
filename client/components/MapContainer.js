import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import CurrentLocation from './map'
import {thunkAllB} from '../store/business'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const mapStyles = {
  width: '100%',
  height: '100%'
}
// MAP STATE AND DISPATCH TO PROPS
const mapState = state => ({
  businesses: state.business.businesses
})
const mapDispatch = dispatch => {
  return {
    fetchB: () => {
      dispatch(thunkAllB())
    }
  }
}

// ACTUAL COMPONENT
class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    businessName: '',
    businessId: NaN
  }
  componentDidMount() {
    this.props.fetchB()
  }
  onMarkerClick = (props, marker, e) => {
    console.log('props: ', props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      // businessName: e.target.name,
      // businessId: e.target.id
    })
  }
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        businessName: '',
        businessId: NaN
      })
    }
  }

  render() {
    const {businesses} = this.props
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {businesses.map(business => (
          <Marker
            key={`marker${business.id}`}
            name={business.name}
            id={business.id}
            position={{
              lat: business.coordinates[0],
              lng: business.coordinates[1]
            }}
            onClick={this.onMarkerClick}
            value={`id=${business.id}&name=${business.name}`}
            // this renders markers for each item in state.business
          />
        ))}
        {/* {businesses.map(business => (
          <InfoWindow
            key={`window${business.id}`}
            position={{
              lat: business.coordinates[0],
              lng: business.coordinates[1]
            }}
            visible={true}
          >
            <div>
              <a href={`/business/${business.id}`}>{business.name}</a>
            </div>
          </InfoWindow>
        ))} */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <a href={`/business/${this.state.selectedPlace.id}`}>{this.state.selectedPlace.name}</a>
          </div>
        </InfoWindow>
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: 'AIzaSyAQOJclHXVkkIoHGpFDgRwcqoqjy9VZSzk'
}))(connect(mapState, mapDispatch)(MapContainer))
