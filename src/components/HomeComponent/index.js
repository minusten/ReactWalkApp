import React, { Component } from 'react'
import './index.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      redirect: ''
    }
  }

  render () {
    return (
      <div className='home'>
        <h1> Please, sign in! </h1>
      </div>
    )
  }
}

export default Home
