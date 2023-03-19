<template>
  <Maximize v-if="mainMaximize" />

  <div class="tabs-box" :style="{ left: sideBarWidth }">
    <a-tabs v-model:activeKey="activeKey" type="editable-card" @tabClick="onTabClick" @edit="onEdit" hideAdd>
      <a-tab-pane v-for="tab in tabList" :key="tab.fullPath">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span style="display: inline-block">{{ tab.title }}</span>

            <template #overlay>
              <a-menu class="dropdown-menu">
                <a-menu-item :key="1" @click="refresh">
                  <reload-outlined />
                  刷新
                </a-menu-item>
                <a-menu-item :key="2" @click="closeCurrentTab">
                  <close-outlined />
                  关闭
                </a-menu-item>

                <a-menu-divider />

                <a-menu-item :key="3" @click="closeLeftTab(tab)">
                  <vertical-right-outlined />
                  关闭左侧标签页
                </a-menu-item>
                <a-menu-item :key="4" @click="closeRightTab(tab)">
                  <vertical-left-outlined />
                  关闭右侧标签页
                </a-menu-item>

                <a-menu-divider />

                <a-menu-item :key="5" @click="closeOtherTab(tab)">
                  <column-width-outlined />
                  关闭其它标签页
                </a-menu-item>
                <a-menu-item :key="6" @click="closeAllTab(tab)">
                  <minus-outlined />
                  关闭所有标签页
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>

      <template #rightExtra>
        <a-dropdown>
          <template #overlay>
            <a-menu class="dropdown-menu">
              <a-menu-item :key="1" @click="refresh">
                <reload-outlined />
                刷新
              </a-menu-item>
              <a-menu-item :key="2" @click="maximizeMain">
                <fullscreen-outlined />
                最大化
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item :key="3" @click="closeCurrentTab">
                <close-outlined />
                关闭当前
              </a-menu-item>
              <a-menu-item :key="4" @click="closeOtherTab">
                <column-width-outlined />
                关闭其它
              </a-menu-item>
              <a-menu-item :key="5" @click="closeAllTab">
                <minus-outlined />
                关闭所有
              </a-menu-item>
            </a-menu>
          </template>

          <div class="dropdown-tab">
            <span class="dropdownIcon">
              <svg-icon name="arrow-down" />
            </span>
          </div>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, computed, watch, unref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useSystemStore } from '@/store/modules/system'
import emitter from '@/utils/mitt'
import Maximize from './Maximize.vue'

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()

// 默认值
const activeKey = ref(route.fullPath)

const tabList = computed(() => systemStore.tabList)

const sideBarWidth = computed(() => {
  return systemStore.sideBar.isCollapse ? '64px' : '210px'
})

const mainMaximize = computed(() => {
  return systemStore.mainMaximize
})

const removeTab = fullPath => {
  // 删除keepAlive
  const name = unref(tabList).find(item => item.fullPath == fullPath)?.name || ''
  name && systemStore.removeKeepAliveName(name)

  if (unref(tabList).length === 1) {
    message.info('无法关闭最后一个页面~')
    return
  }

  // 删除Tab
  const isCurrentTab = fullPath === route.fullPath
  systemStore.removeTab(fullPath, isCurrentTab)
}

// action = 'add' | 'remove'
const onEdit = (targetKey, action) => {
  // 关闭当前Tab
  action === 'remove' && removeTab(targetKey)
}

// Tabs（白名单地址，不需要添加到 tabs 的路由地址）
const NAME_WHITE_LIST = ['403', '404', '500', 'login']

// 监听路由的变化
watch(
  () => router.currentRoute.value,
  curRoute => {
    activeKey.value = curRoute.fullPath

    if (NAME_WHITE_LIST.includes(curRoute.name)) return

    // 添加Tab
    systemStore.addTab({
      title: curRoute.meta.title,
      fullPath: curRoute.fullPath,
      name: curRoute.name
    })

    // 添加keep-alive
    curRoute.meta.keepAlive !== false && systemStore.addKeepAliveName(curRoute.name)
  },
  {
    immediate: true
  }
)

function onTabClick(fullPath) {
  router.push(fullPath)
}

const maximizeMain = () => {
  systemStore.setMainMaximize(true)
}

// 刷新当前Tab
// 只刷新router-view的地方, 没有调用router.place, 因为不需要刷新整个页面
async function refresh() {
  emitter.emit('refreshPage', false)
  await nextTick()
  emitter.emit('refreshPage', true)
}

// 关闭当前Tab
const closeCurrentTab = () => {
  removeTab(route.fullPath)
}

const closeLeftTab = tab => {
  if (unref(tabList).length === 1) {
    message.info('左侧没有其它页面了~')
    return
  }

  const mouseRightIndex = systemStore.findIndex(tab.name)
  const curIndex = systemStore.findIndex(route.name)

  // 删除的Tab在当前Tab的右侧, 则默认跳转到当前鼠标右键的Tab
  if (tab.name !== route.name && mouseRightIndex > curIndex) {
    router.push(tab.fullPath)
  }

  systemStore.removeLeftTab(tab.fullPath)
  systemStore.removeLeftKeepAliveName(tab.name)
}

const closeRightTab = tab => {
  if (unref(tabList).length === 1) {
    message.info('右侧没有其它页面了~')
    return
  }

  const mouseRightIndex = systemStore.findIndex(tab.name)
  const curIndex = systemStore.findIndex(route.name)

  // 删除的Tab在当前Tab的左侧, 则默认跳转到当前鼠标右键的Tab
  if (tab.name !== route.name && mouseRightIndex < curIndex) {
    router.push(tab.fullPath)
  }

  systemStore.removeRightTab(tab.fullPath)
  systemStore.removeRightKeepAliveName(tab.name)
}

const closeOtherTab = tab => {
  if (unref(tabList).length === 1) {
    message.info('当前没有其它页面了~')
    return
  }

  systemStore.removeMultipleTab(tab ? tab.fullPath : route.fullPath)
  systemStore.setKeepAliveName(tab ? [tab.name] : [route.name])
}

const closeAllTab = tab => {
  systemStore.removeMultipleTab()
  systemStore.setKeepAliveName([])
  // Tabs组件会监听到路由的变化, 自动添加Tab
  router.push('/home')
}
</script>

<style lang="less">
.dropdown-tab {
  align-items: center;
  display: flex;
  padding: 0 14px;
  height: 28px;

  .dropdownIcon {
    .flex();
    font-size: 17px;
    cursor: pointer;
  }
}

.dropdown-menu .anticon {
  margin-right: 3px;
}

.ant-tabs-tab:last-child {
  margin-right: 11px !important;
}
</style>

<style lang="less" scoped>
.tabs-box {
  height: @tabHeight;
  top: @headerHeight;
  .flex(flex-start);
  box-sizing: border-box;
  position: fixed;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 0 1px #888;
  z-index: 700;
  transition: all 0.2s;

  :deep(.ant-tabs) {
    width: 100%;

    .ant-tabs-nav-wrap {
      padding: 0 6px;
    }

    // 隐藏 tab - content
    .ant-tabs-content-holder {
      display: none;
    }

    .ant-tabs-nav {
      height: calc(@tabHeight - 2px);
      margin-bottom: 0;

      &::before {
        border-bottom: none;
      }

      .ant-tabs-tab {
        padding-left: 12px;
        padding-right: 8px;
        height: calc(@tabHeight - 2px);
        line-height: calc(@tabHeight - 2px);
        background-color: #ffffff;
        margin-right: 3px;

        // 没有选中的Tab
        // 默认都有关闭按钮, 默认都隐藏
        // close-icon
        &:not(.ant-tabs-tab-active) {
          border: 1px solid #d9d9d9;
        }

        &:hover {
          .ant-tabs-tab-remove {
            opacity: 1;
          }
        }

        .anticon-close {
          font-size: 12px;
          margin-top: 8px;

          svg {
            width: 0.7em;
          }
        }

        .ant-tabs-tab-remove {
          width: 8px;
          height: 28px;
          margin-left: 2px;
          margin-right: 3px;
          font-size: 12px;
          opacity: 0;
          transition: none;
          display: flex;
          align-items: flex-start;

          &:hover {
            svg {
              width: 0.9em !important;
            }
          }
        }

        &-active {
          background-color: var(--primary-color) !important;
          transition: none;
          border: none;
          border: 1px solid transparent !important;

          span {
            color: #ffffff !important;
          }

          .ant-tabs-tab-remove {
            opacity: 1;
          }

          svg {
            fill: #ffffff;
            width: 0.8em !important;
          }
        }
      }

      .ant-dropdown-trigger {
        font-size: 12px;
      }

      .ant-tabs-nav-more {
        padding: 3px 16px;
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
      }
    }
  }
}
</style>
