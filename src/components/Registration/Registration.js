import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom'
import './Registration.css'

class Registration extends Component {
        constructor(props) {
            super(props)
            this.state = {
                name: '',
                email: '',
                password: ''
            }
        }
        render() {
            return (
                <div> 
                    <div > It's registration </div>
                    <form noValidate autoComplete="off" className = 'regist'>
					<TextField
						id="filled-name-input"
						label="name"
						margin="normal"
						variant="filled"
					/>
                    <TextField
						id="filled-email-input"
						label="e-mail"
						type="email"
						autoComplete="current-email"
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
              

               <Button variant="contained" href="#contained-buttons" > <NavLink to='/'> Sign in </NavLink> </Button>  
                </div>
            )
        }
}

export default Registration