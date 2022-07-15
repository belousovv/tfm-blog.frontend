import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://tfm-blog.herokuapp.com',
})

instance.interceptors.request.use((req) => {
  req.headers.Authorization = window.localStorage.getItem('token')
  return req
})

export default instance
