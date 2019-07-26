import React, {Component} from 'react';
import './App.css'
import Login from './components/LoginComponent/Login';
import {Switch, Route} from 'react-router-dom'
import Home from './components/HomeComponent/Home';
import { CookiesProvider } from 'react-cookie';
import Register from './components/Registration/Register'
import {connect} from 'react-redux'
import {usersFetchData} from './actions/users'


class App extends Component {
  componentDidMount = () => {
    this.props.fetchData('http://10.0.4.20:3006/users')
}
  render() {
    return (
      <CookiesProvider> 
        <div className="App">
        <Switch>
          <Route exact path="/login"  component={Login} />
          <Route path='/registration' component={Register} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
      </CookiesProvider>
     
    )
  }
  
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(usersFetchData(url))
  }
}
console.log('App')
export default connect(mapStateToProps, mapDispatchToProps)(App);
