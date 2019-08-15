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
    distance: []
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
  // let mark1 = new google.maps.LatLng(res.data.walks.coordinates)
  // let mark2 = new google.maps.LatLng(res.data.walks.coordinates)
 API.walkGet()  
  .then(res => this.setState({ 
    routes: res.data.walks,
    isLoading: false,
    locations: res.data.walks.coordinates,
    lat: res.data.walks.lat,
    lng: res.data.walks.lng
    // distance: google.maps.geometry.spherical.computeDistanceBetween(mark1, mark2)
  }))
  
}
// someFunc = () => { 
//     //using, for example as:
//     this._map.getCenter() 
//     this._map.setZoom(5)
//   }

// checkCoords = (google) => {
//   let mark1 = new google.maps.LatLng(40.715, -74.002)
//   let mark2 = new google.maps.LatLng(51.506, -0.119)
//  let  distance = google.maps.geometry.spherical.computeDistanceBetween(mark1, mark2)
 
// }

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

render () {
  
 
 const style = {width: '300px', height: '200px', borderRadius: '20px'}
  return (
   <div className='routes'>
    <div className='routes-content'>
     { this.state.isLoading ? <Spinner />
      : <div>
       {
        this.state.routes.map((route, map) => {
         return (
          <div className='data-wrap'>                                         
            <div className='map-wrap'> 
              <Map   
                key={route.toString()}                          
                style={style}
                google={this.props.google}
                zoom={3}
               
                // ref={(map) => this._map = map} 
                
                center={this.getCenter(route)}
              >                 
                {route.coordinates.map((coord, i) => {
                  return (
                    <Marker   
                      key={coord.toString()}                                
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
