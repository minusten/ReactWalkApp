import React, { Component } from 'react'
import './index.css'
import { Redirect } from 'react-router-dom'
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      redirect: ''
    }
  }
 goToLogin = () => {
 this.setState({
     redirect: '/login'
 })
 }
  render () {
    const { redirect} = this.state
    return (       
      <div className='home'>
          {redirect && <Redirect to={redirect}  /> }
            <h1> Please, sign in! </h1>
            {/* <button onClick={this.goToLogin}> Sign In </button> */}
      </div>
    )
  }
}

export default Home
