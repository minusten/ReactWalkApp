import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { NavLink, Redirect } from 'react-router-dom';
import './Login.css';

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
			logedIn: false,
			fields: {},
			nameError: false,
			passwordError:false
		}
	}
	validateName = (e) => {
		
		  if(this.state.name === ''){
			this.setState({
			 nameError: true 
			  })
			// return  <p className='errName'> Введите имя </p>
			alert('Введите имя')
			} else {
			this.setState({
			    nameError: false,     
				name: e.target.value
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
				<form Validate autoComplete="on">
					<div className='name'> 
					<img src={avatar} alt="Logo" className='avatar' />
					<TextField
						id="filled-name-input"
						label="Name"
						margin="normal"
						variant="filled"
						name="name"
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
				 <Button className='but' variant="outlined"  size="small" onClick={this.findData} > Sign In </Button>	 
			 	 <Button variant="outlined"  size="small" > <NavLink to='/registration' className='link'>Sign Up</NavLink> </Button>
			  	 </div>
				{/* <input type='checkbox' />  <p> Remember me </p> */}
				</div>
			
    )
   }
}
export default Login