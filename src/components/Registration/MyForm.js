import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField} from 'redux-form-material-ui'
import asyncValidate from './asyncValidate'
import ChildForm from './ChildForm'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  underline: {
    color: "red",
    height: 4,
    "&:before": {
      borderBottom: `1px solid #e0e0e0`,
      bottom: "-8px",
      left: "-32px"
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottom: "red",
      backgroundColor: "red",
      height: 1,
      bottom: "-8px",
      left: "-32px"
    },
    "&:not($disabled):not($error):after": {
      height: 2,
      bottom: "-8px",
      left: "-32px"
    },
    "&$error:before": {
      height: 1,
      bottom: "-8px",
      left: "-32px"
    },
    "&$error:after": {
      height: 1,
      bottom: "-8px",
      left: "-32px"
    }
  },
  disabled: {},
  error: {},
  focused: {}
});
const CustomTextField = ({ classes, ...other }) => {
  return <TextField InputProps={{ classes: classes }} {...other} />;
};



  const validate = values => {
    const errors = {}
    const requiredFields = [ 'firstName', 'lastName', 'email', 'password' ]
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Required'
      }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }
  
  const MaterialUiForm = () => {
  
  
   
    return (
      <form >
        <div>
          <Field name="firstName" component={ CustomTextField} placeholder="First Name"
       
          />
        </div>
        <div>
          <Field name="lastName" component={ CustomTextField} placeholder="Last Name"/>
        </div>
        <div>
          <Field name="email" component={ CustomTextField} placeholder="Email"/>
        </div>
        <div>
          <Field name="password" component={ CustomTextField} placeholder="password"/>
        </div>
    
        <div>
          <button type="submit" >Submit</button>
          <button type="button" >Clear Values
          </button>
        </div>
      </form>
    )
  }
  
  export default reduxForm({
    form: 'MaterialUiForm',  
    validate,
    asyncValidate
  })(MaterialUiForm)
  


 