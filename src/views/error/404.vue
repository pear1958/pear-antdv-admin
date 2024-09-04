<template>
  <div class="page-box-404">
    <noExist />

    <div class="desc">
      <h2>404</h2>
      <h4>抱歉, 您访问的页面不存在。</h4>
      <a-button type="primary" @click="$router.push('/home')">返回首页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import noExist from '@/assets/imgs/404.svg'
</script>

<style lang="less" scoped>
.page-box-404 {
  .flex();
  width: 100%;
  // height: 100%;
  height: calc(100vh - 48px - 42px - 40px);

  .desc {
    display: flex;
    flex-direction: column;
    margin-left: 120px;

    h2 {
      font-size: 26px;
      color: rgba(0, 0, 0, 0.85);
    }

    h4 {
      margin: 25px 0 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }

    .ant-btn {
      width: 100px;
    }
  }
}
</style>
