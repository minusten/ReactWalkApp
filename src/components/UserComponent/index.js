import React, { Component } from 'react'
import './index.css'
import edit from '../../assets/images/edit.png'
import addImage from '../../assets/images/add-image.png'

class UserComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      firstName: '',
      lastName: '',
      files: false
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

  render () {
    return (
     <div className='main-user-wrap'>      
      <div className='main-user'>
       <div className='user-content-wrap'>
        <div className='main-wrap'>
         <div className='user-image'>
          <label htmlFor='pct' onClick={this.saveAvatar} > <img  className={this.state.files ? 'disable' : 'enable'} src={addImage} alt='Avatar' /></label>
           <input type='file' id='pct' />
           <p className='edit-button'> </p> 
          </div>
          <div className='user-content'>
           <h1> Hello, {this.props.firstName} </h1>
            <p> Welcome to  you're profile </p>
             <div className='div-wrap'> First name: {this.props.firstName} <p> <img src={edit} alt='edit'/> </p></div>
             <div className='div-wrap'> Last name: {this.props.lastName}<p> <img src={edit} alt='edit' /> </p></div>
             <div className='div-wrap'> Email: {this.props.email}<p> <img src={edit} alt='edit'/> </p> </div>
          </div>
         </div>
        </div>
       </div>
      </div>
    )
  }
}

export default UserComponent
