import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'

const config = {
  key: 'primary',
  storage
}

const reducer = persistCombineReducers(config, reducers)

const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(...[thunk])
  )
)

export default store
