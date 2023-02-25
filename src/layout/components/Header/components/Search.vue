<template>
  <div class="header-icon" @click="showSearchPanel = true">
    <search-outlined />
  </div>

  <a-modal v-model:visible="showSearchPanel" :title="null" :footer="null" class="menu-search-modal">
    <a-input
      v-model:value="searchKey"
      style="width: 100%"
      allowClear
      placeholder="请输入菜单名称进行搜索"
      @change="onSearch"
    >
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>

    <div class="panel panel-scroll">
      <template v-if="searchList.length">
        <div class="search-item" v-for="searchItem in searchList" @click="handleSelect(searchItem)">
          <div class="flex-center">
            <span class="icon">
              <file-text-outlined />
            </span>

            <div class="breadcrumb-text">
              <a-breadcrumb separator=">">
                <a-breadcrumb-item v-for="(item, index) in searchItem" :key="item.path">
                  <span>{{ item.meta.title }}</span>
                </a-breadcrumb-item>
              </a-breadcrumb>
            </div>
          </div>

          <a class="icon">
            <enter-outlined />
          </a>
        </div>
      </template>

      <div class="empty" v-else>
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无搜索结果" />
      </div>
    </div>

    <div class="search-tips">
      <span class="key">S</span>
      <span class="tips">打开搜索面板</span>

      <span class="key left">Esc</span>
      <span class="tips">关闭</span>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, shallowRef, unref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import hotkeys from 'hotkeys-js'
import { Empty } from 'ant-design-vue'
import { usePermissionStore } from '@/store/modules/permission'

const route = useRoute()
const router = useRouter()

const showSearchPanel = ref(false)
const searchKey = ref('')
const searchList = shallowRef([])
const searchSourceData = shallowRef([])

onMounted(() => {
  hotkeys('s', event => {
    event.preventDefault()
    // 打开modal时按下s键, true -> true 不会触发watch
    showSearchPanel.value = true
  })
})

onBeforeUnmount(() => {
  hotkeys.unbind('s')
})

// 默认的菜单搜索所有数据
const getAllSearchList = () =>
  usePermissionStore().flatMenuListGet.map(item => {
    return usePermissionStore().breadcrumbListGet(item.path)
  })

// 获取 | 设置 搜索菜单为默认值
watch(showSearchPanel, async () => {
  await nextTick()

  if (showSearchPanel.value) {
    // 组装搜索的字符串数据
    searchSourceData.value = getAllSearchList().map(cardItem => {
      let str = ''
      cardItem.forEach(item => (str += item.meta.title))
      return str
    })
  } else {
    searchKey.value = ''
    searchList.value = []
  }
})

let timer = null

// Input文字改变时进行搜索  函数防抖, 0.3s进行搜索
function onSearch(e) {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    searchMenu(e.target.value)
  }, 300)
}

function searchMenu(queryString) {
  const key = queryString.toLowerCase()
  // 符合搜索条件的下标
  const indexList = []

  unref(searchSourceData).forEach((item, index) => {
    item.includes(key) && indexList.push(index)
  })

  searchList.value = key === '' ? [] : getAllSearchList().filter((item, index) => indexList.includes(index))
}

function handleSelect(data) {
  const item = data.at(-1)

  const clickPath = item.redirect || item.path

  // 点击的是非当前页面才进行跳转
  if (clickPath !== route.path) router.push({ path: clickPath })

  showSearchPanel.value = false
}
</script>

<style lang="less" scoped>
:deep(.ant-input) {
  height: 35px;
}

.panel {
  margin: 20px 0;
  border: 1px solid var(--border-color-split);
  max-height: 220px;
  overflow: hidden;
  overflow-y: scroll;

  .search-item {
    .flex(space-between);
    padding: 13px 20px;
    border-bottom: 1px solid var(--border-color-split);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--primary-1);
    }

    .icon {
      font-size: 18px;
    }

    .breadcrumb-text {
      margin-left: 12px;
    }
  }
}

.panel-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--primary-2);
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--primary-color);
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 4px;
    background: #ffffff;
  }
}

.search-tips {
  display: flex;
  margin-top: 10px;

  .key {
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding-bottom: 2px;
    margin: 0 4px;
    border-radius: 2px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
    font-weight: bold;
  }

  .tips {
    margin-right: 10px;
  }
}
</style>

<style lang="less">
.menu-search-modal .ant-modal-close {
  display: none;
}
</style>
