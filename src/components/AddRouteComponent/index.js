import React, { Component } from 'react'
import './index.css'
import  MapContainer  from '../MapComponent/index';
import  Map  from '../MapComponent/Map';
import  {ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class AddRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showItem: false,
            text: ''
        }
    }
    showMenu = (e) => {
        e.preventDefault();
    
        this.setState({ showItem: true }, () => {
            document.addEventListener('click', this.closeMenu);
          });
    }
    closeMenu = () => {
        this.setState({ showItem: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
      }

    changeInput = (e) => {
        this.setState({ text: e.target.value})
        console.log(this.state.text)
    }
    render() {
        return(

            
        <div className='addRoute'>  
            <div className='wrap-routes'> 
            <div className='map'>
            <MapContainer />        
            {/* <Map google={this.props.google}
					center={{lat: 18.5204, lng: 73.8567}}
					height='300px'
					zoom={15}/> */}
            </div>
          <div className='menu-routes'>
              <p> Title: {this.state.text} </p>
              <ValidatorForm>
              <TextValidator
                label='Title'
                onChange={this.changeInput}
                
              /> 
               
                                    <button onClick={this.showMenu} className='menuButton'>
                                    Select
                                    </button>

                                    {
                                        this.state.showItem
                                            ? (
                                                <div className="menu-item">
                                                    <button >Walk</button>
                                                    <button > Bicycle </button>
                                                    <button > Auto </button>                                                 
                                                </div>
                                            )
                                            : (
                                                null
                                            )
                                    }
                <TextValidator
                label='Description'
                onChange={this.changeInput}
                
              /> 
               </ValidatorForm>
        </div>
        </div>
        </div>
     
            
        )
    }
}

export default AddRoute