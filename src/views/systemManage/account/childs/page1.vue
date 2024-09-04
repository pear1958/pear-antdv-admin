<template>
  <div>
    <a-button @click="goNav">点击跳转到子页面Outer</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goNav = () => {
  router.push({
    path: '/systemManage/account/pageOuter',
    query: {
      name: 'outer',
      number: 77
    }
  })
}
</script>

<style lang="less" scoped></style>
