// import React, {Component} from 'react'
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import {NavLink} from 'react-router-dom'
// import './Registration.css'
// import users from '../file.json'
// import axios from 'axios'
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import SimpleFormExample from './Some'





// class Registration extends Component {
	
	
//         constructor(props) {
//             super(props)
//             this.state = {
// 				db: JSON.parse(JSON.stringify(users)),
// 				firstName: '',
// 				lastName: '',
//                 email: '',
// 				password: '',
// 				firstNameValid: false,
// 				lastNameValid: false,
// 				emailValid: false,
// 				passwordValid: false
//             }
// 		}
// 		changeInputFirstName = (e) => {
// 			this.setState({
// 				firstName: e.target.value,
// 			})
// 		}
// 		changeInputLastName = (e) => {
// 			this.setState({
// 				lastName: e.target.value
// 			})
// 		}
// 		changeInputEmail = (e) => {
// 			this.setState({
// 				email: e.target.value
// 			})
// 		}
// 		changeInputPassword = (e) => {
// 			this.setState({
// 				password: e.target.value
// 			})
// 		}
		
//  		handlePost = () => {
// 			const user= {
// 			  firstName: this.state.firstName,
// 			  lastName: this.state.lastName,
// 			  email: this.state.email,
// 			  password: this.state.password
// 			};
		 
// 			axios.post(`http://10.0.4.20:3006/users`, { user })
// 			  .then(res => {
// 				console.log(res);
// 			  })
// 		  }
		 
//         render() {
			
			
//             return (
//                 <div > 
// 					<SimpleFormExample />
//                     <div > It's registration </div>
//                     <form noValidate autoComplete="off" className = 'regist'>
// 					<ValidatorForm>
// 					<TextValidator
// 						id="filled-first-name-input"
// 						label="First name"
// 						margin="normal"
// 						variant="filled"
// 						onChange={this.changeInputFirstName}
// 						className="textField"
						
// 					/>
// 					<TextField
// 						id="filled-last-name-input"
// 						label="Last name"
// 						margin="normal"
// 						variant="filled"
// 						onChange={this.changeInputLastName}
// 						className="textField"
// 					/>
//                     <TextField
// 						id="filled-email-input"
// 						label="E-mail"
// 						type="email"
// 						autoComplete="current-email"
// 						margin="normal"
// 						variant="filled"
// 						onChange={this.changeInputEmail}
// 						className="textField"
// 						value={this.state.email}
// 						validators={['required', 'isEmail']}
//                    		errorMessages={['this field is required', 'email is not valid']}
// 					/>
// 					<TextField
// 						id="filled-password-input"
// 						label="Password"
// 						type="password"
// 						autoComplete="current-password"
// 						margin="normal"
// 						variant="filled"
// 						onChange={this.changeInputPassword}
// 						className="textField"
// 					/>
// 					</ValidatorForm>
// 				</form>
           
				
//                <Button variant="outlined" className='button' onClick={this.handlePost}>
// 			   <NavLink to='/login' className='link'> Sign up </NavLink> </Button>  
//                 </div>
//             )
//         }
// }

// export default Registration