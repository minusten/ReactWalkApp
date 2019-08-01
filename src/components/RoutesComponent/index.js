import React, { Component } from 'react'

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
      <div>
                Routes
                <button onClick={this.goToHome}> Return </button> 
      </div>
    )
  }
}

export default Routes
