import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { NavLink, Redirect } from 'react-router-dom';
import './Login.css';

import avatar from '../../assets/images/avatar.png'
import lock from '../../assets/images/lock.png'
import users from '../file.json'
import Cookies from 'universal-cookie';
import axios from 'axios'


const cookies = new Cookies()


class Login extends Component {
	
	constructor(props){
		
		super(props)
		this.state = {
			db: JSON.parse(JSON.stringify(users)),
			email: '',
			password: '',
			status: true,
			cookiesSaved: false,
			logedIn: false,
			fields: {},
			nameError: false,
			passwordError:false,
			users: []
		}
	}
	validateName = (e) => {
		
		  if(this.state.name === ''){
			this.setState({
			 nameError: true 
			  })
			alert('Введите имя')
			} else {
			this.setState({
			    nameError: false,     
				email: e.target.value
			})
			console.log('good')
		  }
		
	}
	validatePass = (e) => { 
		  if(this.state.password===''){
			this.setState({
			  passwordError: true
			})
			alert('Введите пароль')
		  } else {
			this.setState({
			  passwordError: false,
			  password: e.target.value
			})
		  }
	   }

	

	
	compareName = (e) => {
		this.setState({email: e.target.value })
	}
	comparePassword = (e) => {
		this.setState({password: e.target.value})
	}
	findData = () => {
		this.state.db.forEach((data, index) => {
			if (data.email === this.state.email && data.password === this.state.password) {
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
		
	getUser = () => { 
				const url = `http://10.0.4.20:3006/users`;
				axios.get(url).then(response => response.data)
				.then((data) => {
				  console.log(data)
				  this.props.history.push('/home')
				 })
			  }
		
	
	  
	
   render () {
		if (this.state.logedIn) {
			return <Redirect to ='/' />
		}
	
    return(
		
			<div className='loginWrap'> 
			   
			<div  className='login'> 
				<p> LOGIN </p>
				<form Validate autoComplete="on">
					<div className='name'> 
					<img src={avatar} alt="Logo" className='avatar' />
					<TextField
						id="filled-name-input"
						label="E-mail"
						margin="normal"
						variant="filled"
						name="e-mail"
						onChange={this.compareName}
						value={this.state.name}
						onBlur={this.validateName}
					
					/>
					<span style={{color: "red"}}>{this.state.nameError["name"]}</span>
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
						name="password"
						onChange={this.comparePassword}
						value={this.state.password}
						className='text-field'
						onBlur={this.validatePass}
					/>
					</div>
				 </form>
				 
				 
				 <div className='button'> 
				 <Button className='but' variant="outlined"  size="small" onClick={this.getUser} > Sign In </Button>	 
			 	 <Button variant="outlined"  size="small" > <NavLink to='/registration' className='link'>Sign Up</NavLink> </Button>
			  	 </div>
			
				</div>
				</div>
			
    )
   }
}
export default Login