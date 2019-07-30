import { FETCH_USER } from '../actions/users'

export function users (state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      return [action.payload.data, ...state]
    default:
      return state
  }
}
