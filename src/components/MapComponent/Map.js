import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from 'react-google-maps'


class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
     
      locations: [],
      propgress: [],
      isMarkerShown: false,
     
  }
}
componentDidMount() {
  this.delayedShowMarker()
}

delayedShowMarker = () => {
  
  setTimeout(() => {
    this.setState({ isMarkerShown: true })
  }, 3000)
  console.log('sfdfsd')
}

handleMarkerClick = () => {
  this.setState({ isMarkerShown: false,
   })
  this.delayedShowMarker()
  
}

addMarker = (e) => {
  let position = [{
    lat: e.target.value,
    lng: e.target.value
  }]
  position.map(() => {
    this.setState({isMarkerShown: true})
     console.log('add')
  })
}

   render() {
const GoogleMapExample = withGoogleMap(props => (
     
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 4 }
        
      >
      {this.state.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={this.onMarkerClick}/>}
{this.state.isMarkerShown && <Marker lat={props.lat} lng={props.lng} onClick={this.addMarker}/> }
      <Polyline path={[{ lat: 40.756795, lng: -73.954298 }, { lat: -35.397, lng: 151.644 }]}/>
      </GoogleMap>
      
   ))
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={<div style={{ height: `100%` }} />}
          
        />
      </div>
    )
  }
};
export default Map
