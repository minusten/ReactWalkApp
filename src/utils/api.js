import axios from 'axios'
import Cookies from 'universal-cookie'
import API_URL from '../config'

const cookies = new Cookies()
const BASE_URL = API_URL

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use((config) => {
  config.headers['x-api-key'] = cookies.get('token')
  console.log('token: ', cookies.get('token'))
  return config
}, (error) => {
  return Promise.reject(error)
})

class API {
  static walkPost (data) {
    return axios('/walks', {
      method: 'post',
      data: { walk: data }
    })
  }

  static walkGet () {
    return axios('/walks', {
      method: 'get'

    })
  }

  static login (user) {
    return axios('/login', {
      method: 'post',
      data: { user }
    })
  }

  static register (user) {
    return axios('/registration', {
      method: 'post',
      data: { user }
    })
  }
}
export default API
