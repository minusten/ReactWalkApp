import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { NavLink, Redirect } from 'react-router-dom';
import './index.css';
import avatar from '../../assets/images/avatar.png'
import lock from '../../assets/images/lock.png'
import users from '../file.json'
import Cookies from 'universal-cookie';
import axios from 'axios'

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
    users: []
  }
  changeFields = (e) => {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData })
    console.log(this.state)
  }
  findData = () => {
    this.state.db.forEach((data, index) => {
      if (data.email === this.state.email && data.password === this.state.password) {
        this.setState({ logedIn: true })
        console.log('Successful login')
      }
    })
    this.setState({ cookiesSaved: cookies.set('loginStatus', !this.state.status) })
    if (this.state.logedIn) {
      this.setState({ logenIn: !this.state.logedIn })
      return this.props.history.push('/login')
    }
  }
  login = () => {
    console.log('sdfsd')
    console.log(this.state)
    const url = `http://10.0.4.20:3006/login`
    axios.post(url, { user: { email: this.state.formData.email, password: this.state.formData.password } })
      .then((response) => {
        console.log(response)
        cookies.set('token', response.data.user.token)
        this.props.history.push('/')
      })

  }
  render() {
    if (this.state.logedIn) {
      return <Redirect to='/' />
    }
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