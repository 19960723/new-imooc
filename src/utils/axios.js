// 封装axios的请求, 返回重新封装的数据格式
import axios from 'axios'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 获取axios配置
  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      // debugger
      return Promise.reject(err)
    })
    // 响应请求的拦截器
    instance.interceptors.response.use(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, err => {
      return Promise.reject(err)
    })
  }

  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
