import React, { Component } from 'react'
import './index.css'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import  { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import walk from '../../assets/images/walk.png'
import car from '../../assets/images/car.png'
import bicycle from '../../assets/images/bicycle.png'
import API from '../../utils/api'
import Spinner from '../Loader'
import Modal from 'react-bootstrap/Modal'

class AddRoute extends Component {
  constructor(props) {
      super(props)
      this.state = {
        showItem: false,
        type: '',
        title: '',                
        description: '',
        markers: [],
        locations: [],
        propgress: [],
        polylines: [],
        spinner: '',
        show: false,
        setShow: false,
        modal: ''
    }
}
 handleClose = () => {
   this.setState({
    setShow: false,
    show: false
   })
  }

 handleShow = () => {
  this.setState({
   setShow: true
  })
 }

showMenu = (e) => {
  e.preventDefault()
  this.setState({ showItem: true }, () => {
    document.addEventListener('click', this.closeMenu);
  })
}
closeMenu = () => {
  this.setState({ showItem: false }, () => {
    document.removeEventListener('click', this.closeMenu);
  })
}
editTitle = (e) => {
  this.setState({
    title: e.target.value
  })
}
editDesc = (e) => {
  this.setState({
    description: e.target.value
  })
}
changeInput = (e) => {
  const { text } = this.state;
  text[e.target.name] = e.target.value;
  this.setState({ text })
}
changeSelect = (name) => {  
  this.setState({
    type: name
  })
}
switchImg = () => {
  if (this.state.type === 'Walk') {
      return <img src={walk} alt='walk' className='add-img'/>
  } if (this.state.type === 'Bicycle') {
      return <img src={bicycle} alt='bicycle' className='add-img'/>
  } if (this.state.type === 'Car') {
      return  <img src={car} alt='car' className='add-img'/> 
  } else {
      return 'Select type'
  }
}
checkSubmit = () => {
  return console.log('Submitted')
}
addRoute = () => {
  if (this.state.title !== '' && this.state.description !== '' && this.state.type !== '' && this.state.polylines.length > 1) {
    console.log('Good')
    console.log('title:', this.state.title)
    console.log(this.state.locations) 
    console.log(this.state.type) 
    setTimeout(() => {
      this.setState({
        spinner: <div className='spinner'> <Spinner /> </div>
      })   
    }, 0)
    setTimeout(() => {
  API.walkPost({coordinates: this.state.locations, title: this.state.title, type: this.state.type, description: this.state.description})
    .then((response) => {
     this.setState({
       spinner: '',
       type: '',
       title: '',
       description: '',
       locations: [],
       polylines: []
     })
    })
  }, 3000)
  } else  {   
  this.setState({
    show: true,
    modal: <Modal className='modal' show={this.state.show} onHide={this.handleClose}> <Modal.Header closeButton><Modal.Title>Hello</Modal.Title></Modal.Header> <Modal.Body>Please, contain all fields!</Modal.Body> </Modal>
  })
    console.log(this.state.show) 
  }
}
handleMapClick = (ref, map, e) => {
  const location = e.latLng
    this.setState(prevState => ({
      locations: [...prevState.locations, location],
      polylines: [...prevState.polylines, location],
      markers:  [...prevState.markers, location]  
  }))
    map.panTo(location)
}

render() {
  const style = {width: '80%', height: '610px', borderRadius: '20px'}
  return(  
    <div className='addRoute'>  
      <div className='wrap-routes'> 
      <div> {this.state.spinner} </div>  
      <div>  
        <Modal className='modal' show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
          <Modal.Title>{this.props.firstName}, </Modal.Title>
         </Modal.Header>
         <Modal.Body>Please, contain all fields!</Modal.Body>
        </Modal> 
       </div>
        <div className='map'>
        <Map
            style={style}
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
            )
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
        {/* <Geolocation
        onSuccess={this.geoSuccess}     
        /> */}
        {/* <p>{console.log(this.state.locations)}</p> */}
        </div>
        <div className='menu-routes'>
          <p> Create new route </p>
         
            <ValidatorForm
              onSubmit={this.checkSubmit}
            >
            <TextValidator        
              label='Title'
              name='title'
              value={this.state.title}
              onChange={this.editTitle}
              validators={['required']}
              errorMessages={['this field is required']}
            />                
              <button onClick={this.showMenu} className='menuButton'>                                                                       
                {this.switchImg(this.state.type)}
              </button>
              {
                this.state.showItem
                  ? (
                      <div className="menu-item" >
                        <button name='Walk' onClick={() => {this.changeSelect('Walk')}}> <img src={walk} alt='walk' className='add-img'/> </button>
                        <button name='Bicycle' onClick={()=>{this.changeSelect('Bicycle')}}> <img src={bicycle} alt='bicycle' className='add-img'/> </button>
                        <button name='Car' onClick={()=>{this.changeSelect('Car')}}> <img src={car} alt='car' className='add-img'/>  </button>                                                 
                      </div>
                  ) : (
                      null
                    )
              }
            <TextValidator               
              label='Description'
              name='description'
              value={this.state.description}
              onChange={this.editDesc}
              validators={['required']}
              errorMessages={['this field is required']}
            /> 
          </ValidatorForm>
          <button onClick={this.addRoute} > Add </button>
        </div>
       </div>
      </div>           
     )
   }
}

AddRoute.displayName = 'AddRoute'
export default GoogleApiWrapper({
  apiKey: ('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBYg8KHYmVikQp7WWh_k7hzzJ0LLDMNA8o')
})(AddRoute)
