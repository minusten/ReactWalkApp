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
      type: ''
    }
  }
 renderRouteImg = (type) => {
    
    switch(type) {
        case 'Walk':  
          return <img src={walk} alt='walk' className='walks-img'/>
        break
        case 'Bicycle': 
         return <img src={bicycle} alt='bicycle' className='walks-img'/>
        break
        case 'car': 
         return  <img src={car} alt='car' className='walks-img'/> 
        break
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
       }))}

  handleMapClick = (ref, map, e) => {
    const location = e.latLng
     
    this.setState(prevState => ({
      locations: [...prevState.locations, location],
      // polylines: [...prevState.polylines, location],
      // markers:  [...prevState.markers, location],
      
    }));
    map.panTo(location);
   
  };
  render () {
    const style = {width: '300px', height: '200px', borderRadius: '20px'}
    return (
      <div className='routes'>
        <div className='routes-content'>
          { this.state.isLoading ? <Spinner />
            : <div>
              {
                this.state.routes.map((walks) => {
                  return (
                    <div className='data-wrap'>
                      
                      {/* <p> <b> Coordinates: </b>{walks.coordinates.map((coord) => {
                        return (
                          */}
                          
                            <div className='map-wrap'> 
                              <Map
                              // onClick={this.handleMapClick}
                               style={style}
                                google={this.props.google}
                                zoom={4}
                                initialCenter={{ lat: 49.449635, lng: 32.062827 }}

                              >
                                {walks.coordinates.map((coord) => {
                                  return (
                                    <Marker
                                     
                                      position={{ lat: coord.lat, lng: coord.lng }}
                                      // onClick={this.getcurrentLocation}
                                    />
                                  )
                                })}
                                
                                {/* <Polyline path={this.state.polylines}

                                  geodesic
                                  options={{
                                    strokeColor: '#ff2527',
                                    strokeOpacity: 0.75,
                                    strokeWeight: 2,
                                    icons: [
                                      {

                                        offset: '0',
                                        repeat: '20px'
                                      }
                                    ]
                                  }}
                                />  */}
                              </Map>
                           </div>
                            {/* <p> <b> Lat: </b> {coord.lat} </p>
                            <p> <b> Lng: </b> {coord.lng} </p> */}
                          
                        {/* )
                      })} */}
                     
                      <p className='walks-title'>  {walks.title}</p>                                 
                       <p>  {this.renderRouteImg(walks.type) }</p>
                      
                     {console.log(this.state.type)}
                    </div>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBYg8KHYmVikQp7WWh_k7hzzJ0LLDMNA8o')
})(Routes)
