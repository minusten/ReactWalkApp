import {
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_EMAIL,
  USER_PASSWORD
} from './action';
const initialState = {
  users: [],
  loading: true,
  error: null

};
export default function rootReducer(action, state = initialState) {
  console.log(action)
  switch(action.type) {
    case  USER_FIRST_NAME:
      console.log('fsdfds')
      return {
        ...state,
        // loading: true,
        // users: action.payload.firstName
      };

    case  USER_LAST_NAME:
      return {
        ...state,
        loading: false,
        users: action.payload.lastName
      };

    case USER_EMAIL:
     
      return {
        ...state,
        loading: false,
        users: action.payload.email
      };
      case USER_PASSWORD:
     
      return {
        ...state,
        loading: false,
        users: action.payload.password
      };

    default:
      
      return state;
  }
}
