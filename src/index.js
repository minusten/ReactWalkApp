import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'


  const store = createStore(
     rootReducer,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}> 
    <BrowserRouter>
    <Switch>
   
    <App /> 
    
    </Switch>
    </BrowserRouter>
    </Provider>

    , document.getElementById('root'));


serviceWorker.unregister();

