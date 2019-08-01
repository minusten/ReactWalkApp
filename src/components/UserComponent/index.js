import React, { Component } from 'react'

class UserComponent extends Component {
  constructor(props) {
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
        <h1> Hello </h1>
        <div> First name: {this.props.firstName} </div>
        <div> Last name: {this.props.lastName} </div>
        <div> Email: {this.props.email} </div>
        <button onClick={this.goToHome}> Return </button>
      </div>
    )
  }
}

export default UserComponent
