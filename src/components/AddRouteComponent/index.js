import React, { Component } from 'react'
import './index.css'
import  MapContainer  from '../MapComponent/index'
import  { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import walk from '../../assets/images/walk.png'
import car from '../../assets/images/car.png'
import bicycle from '../../assets/images/bicycle.png'

class AddRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showItem: false,
            type: '',
            title: '',
            text: {                
                description: ''
            }         
        }
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
  changeInput = (e) => {
    const { text } = this.state;
    text[e.target.name] = e.target.value;
    this.setState({ text })
    console.log(this.state)
  }
  changeSelect = (name) => {  
    this.setState({
      type: name
    })
  console.log(name)
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

 render() {
  return(  
    <div className='addRoute'>  
      <div className='wrap-routes'> 
        <div className='map'>
            <MapContainer 
            title={this.state.title}
            type={this.state.type}
            />          
        </div>
        <div className='menu-routes'>
          <p> Create new route </p>
            <ValidatorForm
              onSubmit={this.checkSubmit}
            >
            <TextValidator        
              label='Title'
              name='title'
              onChange={this.editTitle}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
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
              onChange={this.changeInput}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            /> 
          </ValidatorForm>
        </div>
       </div>
      </div>           
     )
   }
}

export default AddRoute