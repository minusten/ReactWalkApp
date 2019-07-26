import { createStore } from 'redux'
import rootReducer from './rootReducer'
import {
    USER_FIRST_NAME,
   
  } from './action';




function users(state = [], action) {
  switch (action.type) {
    case 'USER_FIRSTNAME':
      return state.concat([action.res])

    default:
      return state
  }
}
const url = `http://10.0.4.20:3006/users`
const store = createStore(users, [url])


function loginUser(res) {
    return {
      type: 'USER_FIRSTNAME',
      res
    }
  }

console.log(store.getState())
console.log(loginUser({type: USER_FIRST_NAME}))



export default store