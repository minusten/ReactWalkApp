import React, { Component } from 'react'
import './index.css'

class AddRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    goToHome = () => {
        this.props.history.push('/')
    }

    render() {
        return(

            
            <div className='addRoute'>  
             <div className='add-content'> 
             AddRoute
              </div>
                
            </div>
        )
    }
}

export default AddRoute