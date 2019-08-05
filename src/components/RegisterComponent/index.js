import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './index.css'


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
    status: true,
    
  }
  validFieldChange = (e) => {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData })
    console.log(this.state)
  }

  handlePost = () => {
    axios.post(`http://10.0.4.20:3006/users`, { user: this.state.formData })
      .then(res => {
        console.log(res);
        this.props.history.push('/login')
      })

  }
  render() {
    
    const { submitted } = this.state;
    console.log(this.props)
    return (
      <div className='mainWrap'>
        <div className='formWrap'>
          <div className='registerForm'>
            <ValidatorForm>
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
                value={this.state.password}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <br />
              <Button
                className='buttonSubmit'
                onClick={this.handlePost}
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
          <NavLink to='/login'>   <p> У вас уже есть аккаунт? </p>  </NavLink>
        </div>
      </div>
    );
  }
}

export default Register