import axios from 'axios'
import { getCurrentInstance } from 'vue'

const service = axios.create({
  baseURL: '',
  timeout: 10000
})

export const getConfig = () => {
  return getCurrentInstance().appContext.config.globalProperties.$config || {}
}

// 获取项目动态全局配置
export const getSystemConfig = app => {
  return new Promise((reslove, reject) => {
    service({
      method: 'GET',
      url: 'systemConfig.json'
    })
      .then(({ data: config }) => {
        app.config.globalProperties.$config = config
        reslove(config)
      })
      .catch(() => {
        reject({})
        throw '请在public文件夹下添加systemConfig.json配置文件'
      })
  })
}
