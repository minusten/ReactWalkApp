import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { NavLink} from 'react-router-dom';
import './index.css';
import avatar from '../../assets/images/avatar.png'
import lock from '../../assets/images/lock.png'
import users from '../file.json'
import Cookies from 'universal-cookie'
import axios from 'axios'
import {API_URL} from '../../config'

const cookies = new Cookies()

class Login extends Component {
  state = {
    db: JSON.parse(JSON.stringify(users)),
    formData: {
      email: '',
      password: ''
    },
    status: true,
    cookiesSaved: false,
    logedIn: false,
    fields: {},
    nameError: false,
    passwordError: false,
    users: [],
    token: ''
  }
  changeFields = (e) => {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData })
    console.log(this.state)
  }
 

  login = (response) => {
    console.log('sdfsd')
    console.log(API_URL)

    axios.post(`${API_URL}/login`, { user: { email: this.state.formData.email, password: this.state.formData.password } })
      .then((response) => {
        console.log(response)
        this.props.changeStateProp('data', response.data.user, 'main')
        cookies.set('token', response.data.user.token)
        this.props.history.push('/')
      })
      
  }
  componentDidMount() {  
    if (cookies.get('token')) {
     return this.props.history.push('/')
    }
   
  }
  render() {
  
    return (
      <div className='loginWrap'>
        <div className='login'>
          <p> LOGIN </p>
          <ValidatorForm>
            <div className='name'>
              <img src={avatar} alt="Logo" className='avatar' />
              <TextValidator
                label="Email"
                onChange={this.changeFields}
                name="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              <br />
            </div>
            <div className='password'>
              <img src={lock} alt="Lock" className='lock' />
              <br />
              <TextValidator
                label="Password"
                onChange={this.changeFields}
                name="password"
                value={this.state.password}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <br />
            </div>
          </ValidatorForm>
          <div className='button'>
            <Button className='but' variant="outlined" size="small" onClick={this.login}> Sign In </Button>
            <Button variant="outlined" size="small" > <NavLink to='/registration' className='link'>Sign Up</NavLink> </Button>
          </div>

        </div>
      </div>

    )
  }
}


export default Login