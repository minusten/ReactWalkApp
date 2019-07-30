import axios from 'axios'

export const FETCH_USER = 'FETCH_USER'
const ROOT_URL = 'http://10.0.4.20:3006/users'

export function usersFetchData (users) {
  const url = `${ROOT_URL}`
  const request = axios.get(url)

  return {
    type: FETCH_USER,
    payload: request
  }
}
