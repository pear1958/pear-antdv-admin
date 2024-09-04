import axios from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { checkStatus } from './utils/checkStatus'
import router from '@/router'

const config = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    adminid: localStorage.getItem('adminId') || 'e8774e4015f733aeac3d2d242ce411d378ed8307'
  }
}

// 和后端统一协商的code规范
const resCode = {
  // ERROR: 500,
  OVERDUE: 599
  // TIMEOUT: 10000,
  // TYPE: 'success'
}

class Http {
  service = null

  // 实例化axios
  constructor(config) {
    this.service = axios.create(config)

    // 请求拦截器
    this.service.interceptors.request.use(
      config => {
        const { token } = useUserStore()
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      response => {
        const { data } = response

        // token过期, 后端如果重新返回, 则储存在本地
        const { authorization: authStr } = response.headers

        if (authStr && authStr.length > 0) {
          const token = authStr.substr(7)
          localStorage.setItem('token', token)
        }

        // token过期
        if (data.code == resCode.OVERDUE) {
          message.error(data.msg)
          useUserStore().setToken('')
          router.replace('/login')
          return Promise.reject(data)
        }

        // 全局错误信息拦截
        if (data.code !== 200) {
          message.error(data.msg)
          return Promise.reject(data)
        }

        // 请求成功
        return data
      },
      error => {
        const { response: res } = error

        // 根据响应的错误状态码, 做不同的处理
        if (res) checkStatus(res.status)

        // 服务器结果都没有返回(可能服务器错误可能客户端断网), 断网处理: 可以跳转到断网页面
        if (!window.navigator.onLine) router.replace('/500')

        return Promise.reject(error)
      }
    )
  }

  // https://axios-http.com/zh/docs/example
  // config: https://axios-http.com/zh/docs/req_config

  // 常用请求方法封装
  get(url, params, config = {}) {
    return this.service.get(url, { params, ...config })
  }

  post(url, data, config = {}) {
    return this.service.post(url, data, config)
  }

  put(url, data, config = {}) {
    return this.service.put(url, data, config)
  }

  delete(url, params, config = {}) {
    return this.service.delete(url, { params, ...config })
  }
}

export default new Http(config)
