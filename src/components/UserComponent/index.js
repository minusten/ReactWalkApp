import React, { Component } from 'react'
import './index.css'
import edit from '../../assets/images/edit.png'
import { Redirect } from 'react-router-dom'
import addImage from '../../assets/images/add-image.png'
import API from '../../utils/api'
import Spinner from '../Loader'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class UserComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      files: false,
      isEdit: false,
      id: '',
      spinner: '',
      redirect: false
    }
  }

saveAvatar = () => { 
  document.querySelector("input").addEventListener("change", this.uploadFile)
}
uploadFile = () => {
  if (document.querySelector("input").files[0]) {
    var fr = new FileReader();
    fr.addEventListener("load", function () {
      document.querySelector("label").style.backgroundImage = "url(" + fr.result + ")";
    }, false);
    fr.readAsDataURL(document.querySelector("input").files[0])
    this.setState({
      files: true
    })
  }
}
editData = () => {
    API.updateUser({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email}, this.props.id)
    .then(res => {
      setTimeout(() => {
        this.setState({
          spinner: <div className='spinner'> <Spinner /> </div>
        })   
      }, 0)
      this.props.changeStateProp('data', res.data.user, 'main')
      setTimeout(() => {
      this.setState({
        spinner: '',
        isEdit: false
      })
    }, 2000)
   })
 }
changeMod = (e) => {
  this.setState({
    isEdit: true
  })
}
componentDidMount() {
  let token  = cookies.get('token')
  if (!token) {
    this.setState({
      redirect: true
    })
  }
}
backFunc = () => {
  this.setState({
    isEdit: false,
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email
  })
}

 render () {
    if (this.state.redirect) {
      return  <Redirect to='/login' />
    }
  return (
    <div className='main-user-wrap'>
     <div className='main-user'>
      <div> {this.state.spinner} </div>  
       <div className='user-content-wrap'>
        <div className='main-wrap'>
         <div className='user-image'>
          <label htmlFor='pct' onClick={this.saveAvatar} > <img  className={this.state.files ? 'disable' : 'enable'} src={addImage} alt='Avatar' /></label>
           <input type='file' id='pct' />
           <p className='edit-button'> </p> 
          </div>
          <div className='user-content'>
           <h1> Hello, {this.state.firstName} </h1>
            <p> Welcome to  you're profile </p>
        {this.state.isEdit && 
          <span>
          <input className="form-control" type="text"  value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })}/> 
          <input className="form-control" type="text"  value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} /> 
          <input className="form-control" type="text"  value={this.state.email} onChange={e => this.setState({ email: e.target.value })}/> 
          <span className='button-cont'>
          <button onClick={this.editData} className='save'> Save </button>
          <button onClick={this.backFunc} className='save'> Back </button>
          </span>
          </span>
        }    
        {!this.state.isEdit && 
        <span>
             <div className='div-wrap'> First name: {this.state.firstName}  </div>
             <div className='div-wrap'> Last name: {this.state.lastName}</div>
             <div className='div-wrap'> Email: {this.state.email} </div>
             <img src={edit} alt='edit' onClick={this.changeMod}/> 
        </span> 
        }
          </div>
         </div>
        </div>
       </div>
      </div>
    )
  }
}

export default UserComponent
