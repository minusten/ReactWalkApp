import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import API from '../../utils/api'
import './index.css'
import Spinner from '../Loader'
import walk from '../../assets/images/walk.png'
import car from '../../assets/images/car.png'
import bicycle from '../../assets/images/bicycle.png'
import Cookies from 'universal-cookie'
import InfiniteScroll from "react-infinite-scroll-component"

const cookies = new Cookies()

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
    page: 1,
    limit: 10,
    hasMore: true,
    fetching: false,
    loaded: false,
  }
}
 fetchMoreData = () => {
  const { page, limit } = this.state
  console.log('Scroll')
  API.walkGet(page, limit)
  .then((res) => {
    if (res) {
    let totalPages = res.config.headers['x-total-pages']
    let newRoutes = this.state.routes.concat(res.data.walks)
    this.setState({
      routes: newRoutes,
      page: this.state.page + 1,
      hasMore: parseInt(this.state.page + 1, 10) <= totalPages,
      isLoading: false
    })
  } else {
    this.setState({
      loaded: true,
      fetching: false
    })
    console.log('AAAAAAAAAAAAAAAAAAAAAAA')
  }
  })
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
componentDidMount () { 
  this.fetchMoreData()
 
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
  // console.log(route.createdBy)
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

deleteRoute = () => {
  if (cookies.get('token')) {
    API.delete({ routes: this.state.routes })
    .then(res => {
      const routes = res.data.walks;
      this.setState({ routes });
  })
  }
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
      : 
      <InfiniteScroll
          dataLength={this.state.routes.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4 style={{color: '#fff'}}>Loading...</h4>}
          style={{ overflow: 'initial' }}
        >
         {console.log(this.state.hasMore, this.state.page)
        
        } 
       {
        this.state.routes.map((route, i, bounds) => {
         return (
          <div className='data-wrap' key={i} >
            <div className='map-wrap'> 
              <Map         
                key={i}
                style={style}
                zoom={1}
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
          {/* <button onClick={this.deleteRoute}> Delete </button> */}
        </div>)
      })}  
          </InfiniteScroll> 
    }

    </div>
   </div>
  )}
 }

export default GoogleApiWrapper({

apiKey: ('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBYg8KHYmVikQp7WWh_k7hzzJ0LLDMNA8o')
})(Routes)
