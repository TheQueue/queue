import React, {Component} from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react'

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class Container extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233
        }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAQOJclHXVkkIoHGpFDgRwcqoqjy9VZSzk'
})(Container)

// import React from 'react'
// import Map from './Map'

// import GoogleApiComponent from 'google-maps-react'
// export class Container extends React.Component {
//   render() {
//     if (!this.props.loaded) {
//       return <div>Loading...</div>
//     }

//     const style = {
//       width: '100vw',
//       height: '100vh'
//     }
//     return (
//       <div style={style}>
//         <Map google={this.props.google} />
//       </div>
//     )
//   }
// }

// export default GoogleApiComponent({
//   apiKey: 'apiKeyAIzaSyAQOJclHXVkkIoHGpFDgRwcqoqjy9VZSzk'
// })(Container)
