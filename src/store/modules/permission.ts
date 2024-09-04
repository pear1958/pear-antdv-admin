import { defineStore } from 'pinia'
import { getMenuListApi, getButtonDataApi } from '@/api/modules/user'
import { getFlatArr, getBreadcrumbList } from '@/router/utils'
// 基础路由(非动态路由)
import { basicRouter } from '@/router/modules/basic'
import { PermissState } from '../types'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissState => ({
    // 菜单权限
    menuList: [...basicRouter],
    // 按钮权限
    buttonData: null,
    // 当前页面的 route name, 用来做按钮权限筛选
    curRouteName: ''
  }),
  getters: {
    // 扁平化之后的一维数组路由, 主要用来添加动态路由
    flatMenuListGet: state => getFlatArr(state.menuList),
    // 面包屑数据
    // 不能使用route.mached的原因: 所有的路由都转成一层路由储存在 layout下的children 中, 因此找不到面包屑的数据
    // @/router/modules/static.js中
    // 为什么要这么做: 为了嵌套路由: 否则嵌套路由需要在每个父路由中写 router-view标签, 还要去控制其显示与隐藏 (麻烦了)
    breadcrumbListGet: state => {
      return path => getBreadcrumbList(path, state.menuList)
    }
  },
  actions: {
    setRouteName(name) {
      this.curRouteName = name
    },
    // 获取侧边栏菜单数据
    getMenuList() {
      return new Promise((resolve, reject) => {
        getMenuListApi()
          .then(res => {
            const menuData = res.data ?? []
            this.menuList.push(...menuData)
            // 菜单排序
            this.menuList.sort((a, b) => a.meta.rank - b.meta.rank)
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },
    getButtonData() {
      return new Promise((resolve, reject) => {
        getButtonDataApi()
          .then(res => {
            this.buttonData = res.data
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    }
  }
})
