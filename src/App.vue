<template>
  <a-config-provider :locale="locale">
    <a-spin :spinning="loading" size="large" class="app-spin">
      <router-view></router-view>
    </a-spin>
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useAppStore } from '@/store/modules/app'

// 全局汉化 antd
const locale = shallowRef(zhCN)

// 汉化时间类组件
dayjs.locale('zh-cn')

const loading = computed(() => {
  return useAppStore().appLoading
})
</script>

<style>
.app-spin {
  margin-top: 50vh !important;
  transform: translateY(-50%);
}
</style>
