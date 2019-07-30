import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'

const REDUCER = 'MAIN'
const defaultState = {
  value: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })
    default:
      return state
  }
}