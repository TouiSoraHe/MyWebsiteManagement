import axios from 'axios'
import { getToken, setToken } from '@/utils/auth.js'
import store from '@/store/store.js'

// 创建axios实例
const service = axios.create({
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if (response.headers['authorization']) {
      setToken(response.headers['authorization'])
    }
    return response
  },
  error => {
    console.error(error) // for debug
    if (error.response && error.response.status === 401 && error.response.request.responseURL.indexOf('/login') === -1) {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    return Promise.reject(error)
  }
)

export default service
