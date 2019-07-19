import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import './Login.css'


class Login extends Component {
      
   render () {
    return(
			<div> 
				<p> Hello, I'm Login </p>
				<form noValidate autoComplete="off" className='login'>
					<TextField
						id="filled-name-input"
						label="Name"
						margin="normal"
						variant="filled"
					/>
					<TextField
						id="filled-password-input"
						label="password"
						type="password"
						autoComplete="current-password"
						margin="normal"
						variant="filled"
					/>
				 </form>
			 <Button variant="contained" href="#contained-buttons" > <NavLink to='/registration'>Sign Up</NavLink> </Button>	 
			</div>
    )
	}
}
export default Login