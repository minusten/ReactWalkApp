import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import API from '../../utils/api'
import './index.css'
import Spinner from '../Loader'
import walk from '../../assets/images/walk.png'
import car from '../../assets/images/car.png'
import bicycle from '../../assets/images/bicycle.png'

class Routes extends Component {
constructor (props) {
  super(props)
  this.state = {
    value: '',
    routes: [],
    isLoading: true,
    locations: [],
    polylines: [],
    type: '',
    center: [],
    markers: [],
    lat: [],
    lng: [],
    zoom: 17
  }
}
renderRouteImg = (type) => { 
 switch(type) {
  case 'Walk':  
    return <img src={walk} alt='walk' className='walks-img'/>
  case 'Bicycle': 
    return <img src={bicycle} alt='bicycle' className='walks-img'/>
  case 'Car': 
    return  <img src={car} alt='car' className='walks-img'/>
  default:
    return ''
  }   
} 
componentDidMount (google, res) { 
 API.walkGet()  
  .then(res => this.setState({ 
    routes: res.data.walks,
    isLoading: false,
    locations: res.data.walks.coordinates,
    lat: res.data.walks.lat,
    lng: res.data.walks.lng
  })) 
}

onIdle = ({routes, maps}) => {
  const bounds = new window.google.maps.LatLngBounds();
  this.state.routes
    .filter(route => route.lat !== undefined && route.lng !== undefined)
    .forEach(route => {
      bounds.extend(new window.google.maps.LatLng(route.lat, route.lng));
    })
   routes.fitBounds(bounds)
}

getCenter = (route) => {
  console.log(route)
  let totalLat = 0
  let totalLng = 0
  for(let i = 0; i < route.coordinates.length; i++) {
    totalLat += route.coordinates[i].lat
    totalLng += route.coordinates[i].lng
  }
  const avgLat = totalLat / route.coordinates.length
  const avgLng = totalLng / route.coordinates.length
  return({lat: avgLat, lng: avgLng})
}

handleMapClick = (map, e) => {
  const location = e.latLng  
  this.setState(prevState => ({
    locations: [...prevState.locations, location],
    polylines: [...prevState.polylines, location]
  }))
  map.panTo(location)
}
// adjustMap(mapProps, map) {
//   const {google, markers} = mapProps;
//   const bounds = new google.maps.LatLngBounds();

//   markers.forEach(marker => {
//     const {lat, lng} = marker.position;

//     bounds.extend(new google.maps.LatLng(lat, lng));
//   });

//   map.fitBounds(bounds);
//   // map.panToBounds(bounds);
// }
render () {
 const style = {width: '300px', height: '200px', borderRadius: '20px',
//  top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
}
  return (
   <div className='routes'>
    <div className='routes-content'>
     { this.state.isLoading ? <Spinner />
      : <div>
       {
        this.state.routes.map((route, i, bounds) => {
         return (
          <div className='data-wrap' key={i} >
            <div className='map-wrap'> 
              <Map   
                onReady={this.adjustMap}            
                key={i}
                style={style}
                google={this.props.google}             
                initialCenter={this.getCenter(route)}
              >
                {route.coordinates.map((coord, j) => {
                  return (
                    <Marker   
                      key={j}                                
                      position={{ lat: coord.lat, lng: coord.lng }}
                    />
                  )
                })}                 
              <Polyline 
                path={route.coordinates}
                geodesic={true}
                options={{
                strokeColor: "#ffc107",
                strokeOpacity: 0.75,
                strokeWeight: 2,
                icons: [{
                  offset: "0",
                  repeat: "20px"
                }]}}
              />     
              </Map>
            </div>                       
           <p className='walks-title'>{route.title}</p>
          <p>{this.renderRouteImg(route.type) }</p>
        </div>)
      })}
     </div>}
    </div>
   </div>
  )}
 }

export default GoogleApiWrapper({

apiKey: ('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBYg8KHYmVikQp7WWh_k7hzzJ0LLDMNA8o')
})(Routes)
