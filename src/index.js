import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import AppContainer from './AppContainer'
import { persistStore } from 'redux-persist'
import store from './store'


persistStore(store, null, () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>

          <AppContainer />

        </Switch>
      </BrowserRouter>
    </Provider>

    , document.getElementById('root'))
})

serviceWorker.unregister()
