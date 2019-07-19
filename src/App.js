import React from 'react';
import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/LoginComponent/Login';
import {Switch, Route} from 'react-router-dom'



function App() {
  return (
    
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/registration' component={Registration}/>
       
      </Switch>
     
    

     
    </div>
  );
}

export default App;
