import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';

class Login extends Component {
      
   render () {
    return(
			<div> 
				<p> Hello, I'm Login </p>
				<form noValidate autoComplete="off">
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
			</div>
    )
	}
}

export default Login