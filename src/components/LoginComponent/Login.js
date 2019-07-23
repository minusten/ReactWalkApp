import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { NavLink, Redirect } from 'react-router-dom';
import './Login.css'

import avatar from './avatar.png'
import lock from './lock.png'
import users from '../file.json'
import Cookies from 'universal-cookie';


const cookies = new Cookies()



class Login extends Component {

	constructor(props){
		
		super(props)
		this.state = {
			db: JSON.parse(JSON.stringify(users)),
			name: '',
			password: '',
			status: true,
			cookiesSaved: false,
			logedIn: false
		}
	}
	componentDidMount () {

		var status = cookies.get('loginStatus')
		if (status === 'true') {
			
			this.setState({logedIn:true})
			console.log('sdfsdf')
		}
	}

	
	compareName = (e) => {
		this.setState({name: e.target.value })
	}
	comparePassword = (e) => {
		this.setState({password: e.target.value})
	}
	findData = () => {
		this.state.db.forEach((data, index) => {
			if (data.name === this.state.name && data.password === this.state.password) {
				this.setState({logedIn: true})
				console.log('Successful login')

			} 
		})
		this.setState({cookiesSaved: cookies.set('loginStatus', this.state.status)}) 
		console.log('Saved', !this.state.cookiesSaved)
	
		if (this.state.logedIn) {
			this.setState({logenIn: !this.state.logedIn})
			return this.props.history.push('/login')
		
		} 	
	}

	
   render () {
		if (this.state.logedIn) {
			return <Redirect to ='/' />
		}
		
    return(
		

			<div  className='login'> 
				<p> LOGIN </p>
				<form noValidate autoComplete="off">
					<div className='name'> 
					<img src={avatar} alt="Logo" className='avatar' />
					<TextField
						id="filled-name-input"
						label="Name"
						margin="normal"
						variant="filled"
						onChange={this.compareName}
						value={this.state.name}
					
					/>
					</div>

					<div className='password'>
					<img src={lock} alt="Lock" className='lock' />
					<TextField
						id="filled-password-input"
						label="password"
						type="password"
						autoComplete="current-password"
						margin="normal"
						variant="filled"
						onChange={this.comparePassword}
						value={this.state.password}
						className='text-field'
					/>
					</div>
				 </form>
				 
				 <div className='button'> 
				 <Button className='but' variant="outlined" href="#contained-buttons" size="small" onClick={this.findData}> Sign In </Button>	 
			 	 <Button variant="outlined" href="#contained-buttons" size="small" > <NavLink to='/registration' className='link'>Sign Up</NavLink> </Button>
			  	 </div>
				</div>
			
    )
   }
}
export default Login