<template>
  <div>
    <a-space>
      <a-button>Default Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="text">Text Button</a-button>
      <a-button type="link">Link Button</a-button>
    </a-space>

    <!-- <Loading /> -->

    <a-date-picker v-model:value="value1" placeholder="请选择时间"/>

    <div class="home">
      <div v-for="item in 70">Home</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Loading from '@/components/Loading/index.vue'

const value1 = ref()
</script>

<style lang="less" scoped>
.home {
  margin-top: 20px;
}
</style>
