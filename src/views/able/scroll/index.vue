<template>
  <div>
    <a-page-header title="滚动组件示例" />

    <div class="scroll-wrap">
      <ScrollContainer>
        <ul class="p-15">
          <li class="p-5" :style="{ border: '1px solid #eee' }" v-for="index in 100" :key="index">
            {{ index }}
          </li>
        </ul>
      </ScrollContainer>
    </div>
  </div>
</template>

<script>
import ScrollContainer from '@/components/ScrollContainer/index.vue'

export default {
  components: {
    ScrollContainer
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background-color: #dddddd;
}
</style>
