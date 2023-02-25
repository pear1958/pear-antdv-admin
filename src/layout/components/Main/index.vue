<template>
  <div class="main">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="systemStore.keepLiveNameList">
          <component :is="Component" :key="route.path" v-if="routerShow" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import emitter from '@/utils/mitt'
import { useSystemStore } from '@/store/modules/system'

const systemStore = useSystemStore()

const routerShow = ref(true)

// 刷新当前页面
emitter.on('refreshPage', val => {
  routerShow.value = val
})
</script>

<style lang="less" scoped>
.main {
  min-height: calc(100vh - @headerHeight - @tabHeight);
  padding: 20px;
}
</style>
