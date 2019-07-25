import React, {Component} from 'react';
import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/LoginComponent/Login';
import {Switch, Route} from 'react-router-dom'
import Home from './components/HomeComponent/Home';
import { CookiesProvider } from 'react-cookie';
import { connect } from 'react-redux'
import Register from './components/Registration/Register'



class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
     authed: false
    }
  
  }
  render() {
    const {  login, home, registration } = this.props
    return (
      <CookiesProvider> 
      <div className="App">
        <Switch>
          <Route exact path="/login"  component={Login} value={login.value}/>
          <Route path='/registration' component={Register} value={registration.value}/>
          <Route exact path='/' component={Home} value={home.value}/>
        </Switch>
      </div>
      </CookiesProvider>
    );
  }
  
}
const mapStateToProps = store  => {
  console.log(store) 
  return {
    login: store.login,
    home:store.home,
    registration: store.registration
  }
}

export default connect(mapStateToProps)(App)
