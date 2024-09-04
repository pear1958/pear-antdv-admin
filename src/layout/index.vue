<template>
  <Vertical />
  <Setting />
</template>

<script setup lang="ts">
import Vertical from './Vertical/index.vue'
import Setting from './components/Setting/index.vue'
import { useSystemStore } from '@/store/modules/system'

// 每当状态发生变化时, 将整个 state 持久化到本地存储
// useSystemStore().$subscribe(
//   (mutation, state) => {
//     localStorage.setItem('systemConfig', JSON.stringify(state))
//   },
//   // 在组件被卸载后, 该订阅依旧会被保留
//   { detached: true }
// )
</script>
