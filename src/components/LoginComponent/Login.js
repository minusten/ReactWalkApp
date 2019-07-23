import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import './Login.css'
import avatar from './avatar.png'
import lock from './lock.png'

class Login extends Component {
      
   render () {
    return(
			<div> 
				<p> Hello, I'm Login </p>
				<form noValidate autoComplete="off" className='login'>
					<div> 
					<img src={avatar} alt="Logo" className='avatar' />
					<TextField
						id="filled-name-input"
						label="Name"
						margin="normal"
						variant="filled"
					/>
					</div>
					<div>
					<img src={lock} alt="Lock" className='lock' />
					<TextField
						id="filled-password-input"
						label="password"
						type="password"
						autoComplete="current-password"
						margin="normal"
						variant="filled"
					/>
					</div>
				 </form>
			 <Button variant="contained" href="#contained-buttons" > <NavLink to='/registration'>Sign Up</NavLink> </Button>	 
			</div>
    )
	}
}
export default Login