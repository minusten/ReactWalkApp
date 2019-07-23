import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom'
import './Registration.css'
import users from '../file.json'

class Registration extends Component {
        constructor(props) {
            super(props)
            this.state = {
				db: JSON.parse(JSON.stringify(users)),
                name: '',
                email: '',
				password: '',
            }
		}
		changeInputName = (e) => {
			this.setState({
				name: e.target.value,
			})
		}
		changeInputEmail = (e) => {
			this.setState({
				email: e.target.value,
			})
		}
		changeInputPassword = (e) => {
			this.setState({
				password: e.target.value,
			})
		}
		toJSON = () => {
		
			if (this.state.name && this.state.email && this.state.password) {
				this.state.db.push({
				name: this.state.db.name,
				email: this.state.db.email, 
				password:this.state.db.password
			})
			}
	
			console.log('успешная регистрация')
			console.log(this.state.db)
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
						onChange={this.changeInputName}
						
					/>
                    <TextField
						id="filled-email-input"
						label="e-mail"
						type="email"
						autoComplete="current-email"
						margin="normal"
						variant="filled"
						onChange={this.changeInputEmail}
					/>
					<TextField
						id="filled-password-input"
						label="password"
						type="password"
						autoComplete="current-password"
						margin="normal"
						variant="filled"
						onChange={this.changeInputPassword}
					/>
				</form>
              

               <Button variant="contained" href="#contained-buttons" onClick={this.toJSON}> <NavLink to='/login'> Sign up </NavLink> </Button>  
                </div>
            )
        }
}

export default Registration