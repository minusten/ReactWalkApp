import React, { Component } from 'react'
import './index.css'
class Routes extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }
 
  goToHome = () => {
      this.props.history.push('/')
  }
  render () {
    return (
      <div className='routes'>
                <div className='routes-content'> 
                Routes
          
                 </div>
                
      </div>
    )
  }
}

export default Routes
