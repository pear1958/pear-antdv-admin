<template>
  <div class="page-box">
    <div>账号管理</div>
    <div class="mt-20">
      <a-button @click="goNav1">点击跳转到子页面1</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goNav1 = () => {
  router.push({
    path: '/systemManage/account/page1',
    query: {
      name: 'page1',
      number: 22
    }
  })
}
</script>

<style lang="less" scoped></style>
