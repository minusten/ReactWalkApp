import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { connect } from 'react-redux'
import { usersFetchData } from './actions/users'
import indexRegisterContainer from './components/RegisterComponent/indexContainer'
import indexLoginContainer from './components/LoginComponent/indexContainer'
import indexHomeContainer from './components/HomeComponent/indexContainer'
import indexUserContainer from './components/UserComponent/indexContainer'
import indexRoutesContainer from './components/RoutesComponent/indexContainer'
import indexAddRouteContainer from './components/AddRouteComponent/indexContainer'

class App extends Component {
  componentDidMount = () => {
    this.props.fetchData('http://10.0.4.20:3006/users')
  }
  render() {
    return (
      <CookiesProvider>
        <div className="App">
          safasfasfasfasfas
          <Switch>
            <Route exact path="/login" component={indexLoginContainer} />
            <Route path='/registration' component={indexRegisterContainer} />
            <Route path='/user' component={indexUserContainer} />
            <Route path='/routes' component={indexRoutesContainer} />
            <Route path='/add' component={indexAddRouteContainer} />
            <Route exact path='/' component={indexHomeContainer} />
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
