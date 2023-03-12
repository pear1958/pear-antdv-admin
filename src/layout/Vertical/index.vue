<template>
  <a-layout class="app">
    <a-layout-sider
      class="sider"
      v-model:collapsed="isCollapse"
      :trigger="null"
      collapsible
      :collapsedWidth="64"
      :width="210"
    >
      <!-- Logo -->
      <div class="logo flex-center">
        <logo-svg />
        <span v-show="!isCollapse">V-Admin</span>
      </div>

      <div class="menu">
        <ScrollContainer>
          <!-- 菜单 -->
          <a-menu
            v-model:selectedKeys="state.selectedKeys"
            :open-keys="state.openKeys"
            theme="dark"
            mode="inline"
            @click="handleClick"
          >
            <SubMenu :menuList="menuData" />
          </a-menu>
        </ScrollContainer>
      </div>
    </a-layout-sider>

    <a-layout class="layout-box" :style="{ marginLeft: sideBarWidth }">
      <a-layout-header class="header" :style="{ left: sideBarWidth }">
        <Header />
      </a-layout-header>

      <Tabs />

      <a-layout-content class="content">
        <Main />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed, reactive, watch, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSystemStore } from '@/store/modules/system'
import { filterMenuData } from '@/router/utils'
import { usePermissionStore } from '@/store/modules/permission'
import ScrollContainer from '@/components/ScrollContainer/index.vue'
import SubMenu from '../components/SubMenu/index.vue'
import Header from '../components/Header/index.vue'
import Main from '../components/Main/index.vue'
import Tabs from '../components/Tabs/index.vue'
import logoSvg from '@/assets/imgs/logo.svg'

const router = useRouter()
const route = useRoute()

const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)

const sideBarWidth = computed(() => {
  return isCollapse.value ? '64px' : '210px'
})

const menuData = computed(() => filterMenuData(usePermissionStore().menuList))

// 当前匹配的路由数据 || 面包屑数据
const curRouteList = computed(() => usePermissionStore().breadcrumbListGet(route.path))

const state = reactive({
  // 当前选中的 MenuItem
  selectedKeys: [route.path],
  // 当前展开的菜单
  openKeys: []
})

// 菜单收缩以后不显示二级菜单
watch(isCollapse, newVal => {
  if (unref(route.name) === '404') {
    state.openKeys = []
    return
  }

  state.openKeys = newVal ? [] : unref(curRouteList).map(item => item.path)
})

// 跟随页面路由变化, 切换菜单选中状态
watch(
  () => router.currentRoute.value,
  curRoute => {
    if (curRoute.name === '404') {
      state.openKeys = []
      state.selectedKeys = []
      return
    }

    // 展开当前菜单 设置打开的菜单 && 避免收缩的时候弹出二级菜单
    state.openKeys = isCollapse.value ? [] : unref(curRouteList).map(item => item.path)

    // 点击面包屑 || 输入url 路径发生变化, 修改selectedKeys
    state.selectedKeys = [curRoute.path]
  },
  {
    immediate: true
  }
)

function handleClick({ key }) {
  // 获取点击的路由
  const clickRoute = router.getRoutes().find(item => item.path === key)

  // 外部链接
  if (clickRoute.meta.link) {
    return window.open(clickRoute.meta.link, '_blank')
  }

  router.push(key)
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
