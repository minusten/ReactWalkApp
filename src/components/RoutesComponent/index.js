import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import * as map from 'google-map-react'
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
    type: ''
  }
}
renderRouteImg = (type) => { 
 switch(type) {
  case 'Walk':  
    return <img src={walk} alt='walk' className='walks-img'/>
  case 'Bicycle': 
    return <img src={bicycle} alt='bicycle' className='walks-img'/>
  case 'car': 
    return  <img src={car} alt='car' className='walks-img'/>
  default:
    return ''
  }   
} 

componentDidMount () { 
 API.walkGet()  
  .then(res => this.setState({ 
    routes: res.data.walks,
    isLoading: false,
    locations: res.data.walks.coordinates,
    polylines: res.data.walks.coordinates
  }))
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

render () {
 const style = {width: '300px', height: '200px', borderRadius: '20px'}
  return (
   <div className='routes'>
    <div className='routes-content'>
     { this.state.isLoading ? <Spinner />
      : <div>
       {
        this.state.routes.map((route, i) => {
         return (
          <div className='data-wrap' key={i} >
            <div className='map-wrap'> 
              <Map   
                key={route.toString()}
                style={style}
                google={this.props.google}
                zoom={4}
                initialCenter={this.getCenter(route)}
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
