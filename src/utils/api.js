import axios from 'axios'
import Cookies from 'universal-cookie'
import API_URL from '../config'

const cookies = new Cookies()
const BASE_URL = API_URL

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use((config) => {
  config.headers['x-api-key'] = cookies.get('token')
  config.headers['x-total-count'] = 22
  config.headers['x-total-pages'] = 3
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

  static walkGet (page = null, limit = null) {
    return axios('/walks', {
      method: 'get',
      params: {
        page,
        limit
      }
    })
  }

  static login (user) {
    return axios('/login', {
      method: 'post',
      data: { user }
    })
  }

  static register (user) {
    return axios('/users', {
      method: 'post',
      data: { user }
    })
  }

  static delete (data) {
    return axios('/walks', {
      method: 'delete',
      data: { walk: data }
    })
  }

  static updateUser (user, id) {
    return axios(`/users/${id}`, {
      method: 'put',
      data: { user }
    })
  }
}
export default API
