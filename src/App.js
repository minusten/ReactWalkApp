import React, {Component} from 'react';
import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/LoginComponent/Login';
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/HomeComponent/Home';
import { CookiesProvider } from 'react-cookie';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
     authed: false
    }
  
  }
  render() {
    return (
      <CookiesProvider> 
      <div className="App">
        <Switch>
          <Route exact path="/login"  component={Login} />
          <Route path='/registration' component={Registration}/>
          <Route exact path='/' component={Home}/>
          <PrivateRoute authed={this.state.authed} path='/home' component={Home} />
  
        </Switch>
      </div>
      </CookiesProvider>
    );
  }
  
}

export default App;
