import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Button from '@material-ui/core/Button'
import { NavLink} from 'react-router-dom'
import './index.css';
import avatar from '../../assets/images/avatar.png'
import lock from '../../assets/images/lock.png'
import Cookies from 'universal-cookie'
import API from '../../utils/api'

const cookies = new Cookies()

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
      _id: ''
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
}
login = () => {
  
  API.login({ email: this.state.formData.email, password: this.state.formData.password})
    .then((response) => {
      this.props.changeStateProp('data', response.data.user, 'main')
      console.log(response.data.user)
      cookies.set('token', response.data.user.apiKey)
      this.props.history.push('/user')
    })   
}

checkSubmit = () => {
  return console.log('Submitted')
}

  render() {
    return (
      <div className='loginWrap'>
        <div className='login'>
         <p> LOGIN </p>
           <ValidatorForm
            onSubmit={this.checkSubmit}
           >
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
            <br/>
            </div>
            <div className='password'>
             <img src={lock} alt="Lock" className='lock'/>
            <br />
            <TextValidator
              label="Password"
              onChange={this.changeFields}
              name="password"
              type="password"
              value={this.state.password}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <br/>
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