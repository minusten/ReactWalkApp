import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import './index.css'
import Geolocation from 'react-geolocation'
import API from '../../utils/api'

export class MapContainer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        markers: [],
        locations: [],
        propgress: [],
        polylines: [],
        stores: [{lat: 49.449635, lng: 32.062827},
                {latitude: 49.449635, longitude: 32.062827},
                {latitude: 47.449636, longitude: 30.062826},
                ],
               
      }
    }
  

    geoSuccess = position => { 
      let coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
   
      this.setState({
        initialCenter: coords
      })
      console.log(coords)
   };
   handleMapClick = (ref, map, e) => {
    const location = e.latLng
     
    this.setState(prevState => ({
      locations: [...prevState.locations, location],
      polylines: [...prevState.polylines, location],
      markers:  [...prevState.markers, location],
      
    }));
    map.panTo(location);
   
  };
  async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng
        }
      },
      currentLocation: {
        lat,
        lng
      }
    }));
  }
  addRoute = (response) => {
    console.log('sdfsd')
    console.log('title:', this.state.title)

    API.walkPost({coordinates: this.state.locations, title: this.props.title, type: this.props.type})
      .then((response) => {
        console.log('Success')
       
      })
      
  }

   getcurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          console.log(coords)
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
      
    }
    return {
      lat: 0,
      lng: 0,
      
    }
    
  }

 
    render() {
   
      return (
         <div className='map-container'>
          <Map
            onClick={this.handleMapClick}
            google={this.props.google}
            zoom={6}
            initialCenter={{ lat:  49.449635, lng: 32.062827}}
          
          >
            {this.state.locations.map((location, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: location.lat(), lng: location.lng() }}
               onClick={this.getcurrentLocation}
              >
             
              </Marker>
            );
          })}      
        <Polyline path={this.state.polylines}
       
        geodesic={true}
        options={{
          strokeColor: "#ff2527",
          strokeOpacity: 0.75,
          strokeWeight: 2,
          icons: [
              {
                  
                  offset: "0",
                  repeat: "20px"
              }
          ]
      }}
        />    
        

          </Map>
         <Geolocation
         onSuccess={this.geoSuccess}
        
         />
          <p>{console.log(this.state.locations)}</p>
          <button onClick={this.addRoute}  className='add'> Add </button>
         </div>
      );
    }
  }
export default GoogleApiWrapper({
  apiKey: ('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBYg8KHYmVikQp7WWh_k7hzzJ0LLDMNA8o')
})(MapContainer)

