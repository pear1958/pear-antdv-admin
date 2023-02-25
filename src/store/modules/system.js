import { defineStore } from 'pinia'
import router from '@/router/index'

export const useSystemStore = defineStore({
  id: 'system',
  // 在@/layout/index.vue中, 监听数据改变, 并且同步到localStorage中
  state: () =>
    localStorage.getItem('systemConfig')
      ? JSON.parse(localStorage.getItem('systemConfig'))
      : {
          sideBar: {
            // 是否折叠菜单
            isCollapse: false
          },
          // 以route.name作为缓存的Key
          keepAliveNameList: [],
          tabList: [],
          // main区域是否全屏
          mainMaximize: false,
          isDark: false,
          themeColor: '#1890FF'
        },
  actions: {
    setCollapse(value) {
      this.sideBar.isCollapse = value
    },
    findIndex(name) {
      return this.keepAliveNameList.findIndex(item => item === name)
    },
    // 添加缓存路由
    addKeepAliveName(name) {
      !this.keepAliveNameList.includes(name) && this.keepAliveNameList.push(name)
    },
    // 删除缓存路由
    removeKeepAliveName(name) {
      const delIndex = this.findIndex(name)
      this.keepAliveNameList.splice(delIndex, 1)
    },
    // 批量更新缓存路由
    setKeepAliveName(nameList) {
      this.keepAliveNameList = nameList
    },
    removeLeftKeepAliveName(name) {
      const delIndex = this.findIndex(name)
      this.keepAliveNameList.splice(0, delIndex)
    },
    removeRightKeepAliveName(name) {
      const delIndex = this.findIndex(name)
      this.keepAliveNameList.splice(delIndex + 1)
    },
    // 新增Tab
    addTab(tabItem) {
      // 该Tab没被添加过 才添加
      if (!this.tabList.some(item => item.fullPath === tabItem.fullPath)) {
        this.tabList.push(tabItem)
      }
    },
    // 删除Tab
    removeTab(fullPath, isCurrent) {
      const { tabList } = this

      // 如果删除的是当前Tab: 默认切换到下一个Tab
      if (isCurrent) {
        tabList.forEach((item, index) => {
          if (item.fullPath !== fullPath) return
          const nextShowTab = tabList[index + 1] || tabList[index - 1]
          // 删除的是唯一的一个Tab, 则不需要切换Tab
          if (!nextShowTab) return
          router.push(nextShowTab.fullPath)
        })
      }

      const delIndex = tabList.findIndex(item => item.fullPath === fullPath)
      tabList.splice(delIndex, 1)
    },
    // 删除多个Tab
    // 不传fullPath则是 删除所有Tab
    removeMultipleTab(fullPath) {
      this.tabList = this.tabList.filter(item => item.fullPath === fullPath)
    },
    removeLeftTab(fullPath) {
      const delIndex = this.tabList.findIndex(item => item.fullPath === fullPath)
      this.tabList.splice(0, delIndex)
    },
    removeRightTab(fullPath) {
      const delIndex = this.tabList.findIndex(item => item.fullPath === fullPath)
      this.tabList.splice(delIndex + 1)
    },
    setMainMaximize(value) {
      this.mainMaximize = value
    },
    setDark(val) {
      this.isDark = val
    },
    setThemeColor(color) {
      this.themeColor = color
    }
  }
})
