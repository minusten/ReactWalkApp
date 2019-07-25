import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios'

export default class Register extends React.Component {
    state = {
        formData: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        submitted: false,
    }

    validFieldChange = (e) => {
        const { formData } = this.state;
        formData[e.target.name] = e.target.value;
        this.setState({ formData });
    }

    handlePost = () => {

        axios.post(`http://10.0.4.20:3006/users`, { user: this.state.formData })
          .then(res => {
            console.log(res);
            this.props.history.push('/login')
          })
      }

    render() {
        const { formData, submitted } = this.state;

        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>Registration</h2>
                <TextValidator
                    label="First Name"
                    onChange={this.validFieldChange}
                    name="firstName"
                    value={formData.firstName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  
                />
                <br />
                <TextValidator
                    label="Last Name"
                    onChange={this.validFieldChange}
                    name="lastName"
                    value={formData.lastName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                 <br />
                <TextValidator
                    label="Email"
                    onChange={this.validFieldChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    label="Password"
                    onChange={this.validFieldChange}
                    name="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <Button
                   
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
        );
    }
}