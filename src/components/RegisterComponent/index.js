import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { NavLink } from 'react-router-dom'
import './index.css'
import API from '../../utils/api'

class Register extends Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    submitted: false,
    cookiesSaved: false,
    status: true   
  }
validFieldChange = (e) => {
  const { formData } = this.state;
  formData[e.target.name] = e.target.value;
  this.setState({ formData })
}
register = (response) => {
  console.log('Registered')
   API.register( this.state.formData )
   .then(res => {
    console.log('Register');
    this.props.history.push('/login')
   }) 
}
checkSubmit = () => {
  return console.log('Submitted')
}

  render() { 
   const { submitted } = this.state;
     return (
      <div className='mainWrap'>
        <div className='formWrap'>
          <div className='registerForm'>
            <ValidatorForm
              onSubmit={this.checkSubmit}
            >
              <h2>Registration</h2>
              <TextValidator
                label="First Name"
                onChange={this.validFieldChange}
                name='firstName'
                value={this.state.firstName}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <br />
              <TextValidator
                label="Last Name"
                onChange={this.validFieldChange}
                name="lastName"
                value={this.state.lastName}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <br />
              <TextValidator
                label="Email"
                onChange={this.validFieldChange}
                name="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              <br />
              <TextValidator
                label="Password"
                onChange={this.validFieldChange}
                name="password"
                type="password"
                value={this.state.password}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <br />
              <Button
                className='buttonSubmit'
                onClick={this.register}
                color="primary"
                variant="contained"
                type="submit"
              >
                {
                  (submitted && 'Your form is submitted!')
                  || (!submitted && 'Submit')
                }
              </Button>
            </ValidatorForm>
          </div>
          <NavLink to='/login'> <p> Sign in </p> </NavLink>
        </div>
      </div>
    )
  }
}

export default Register