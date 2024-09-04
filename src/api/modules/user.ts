import http from '@/api'

import dRouter from '@/assets/json/dRouter.json'
import buttonData from '@/assets/json/buttonData.json'
import userInfo from '@/assets/json/userInfo.json'

// 登录
export const login = params => http.post('/login', params)

// 个人信息
export const getUserInfo = () => http.get('/admin/getUserInfo')

// 获取菜单权限列表
export const getMenuListApi = () => {
  return Promise.resolve(dRouter)
}

// 获取按钮权限列表
export const getButtonDataApi = () => {
  return Promise.resolve(buttonData)
}

export const getUserInfoApi = () => {
  return Promise.resolve(userInfo)
}
