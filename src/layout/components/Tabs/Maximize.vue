<template>
  <div class="max-close-icon" @click="exitMaximize">
    <close-outlined />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useSystemStore } from '@/store/modules/system'

const systemStore = useSystemStore()

// method: 'add' | 'remove'
function changeClass(method) {
  const app = document.getElementById('app') as HTMLDivElement
  ;(app.classList as any)[method]('main-maximize')
}

// 退出Main全屏
function exitMaximize() {
  systemStore.setMainMaximize(false)
  changeClass('remove')
}

// 监听当前页是否全屏, 动态改变class
watch(
  () => systemStore.mainMaximize,
  newVal => {
    newVal && changeClass('add')
  },
  { immediate: true }
)
</script>

<style lang="less">
// 当前页面最大化 css
.main-maximize {
  .ant-layout-sider,
  .ant-layout-header,
  .tabs-box {
    display: none !important;
  }

  // Main主体部分
  .layout-box {
    margin-left: 0 !important;

    .content {
      margin-top: 0 !important;
      min-height: 100vh !important;
    }
  }
}
</style>

<style lang="less" scoped>
.max-close-icon {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 52px;
  height: 52px;
  cursor: pointer;
  background-color: #909399;
  border-radius: 50%;
  opacity: 0.7;

  &:hover {
    background-color: #73767a;
  }

  .anticon.anticon-close {
    position: relative;
    top: 68%;
    left: 32%;
    font-size: 16px;
    color: #ffffff;
    transform: translate(-50%, -50%);
  }
}
</style>
