import axios from 'axios'
import store from './store'

function fetchUsers() {
    return function(dispatch) {
      return axios.get("http://10.0.4.20:3006/users")
       .then(({ user }) => {
          dispatch(store.getState(user));
        });
    };
 }
export default fetchUsers