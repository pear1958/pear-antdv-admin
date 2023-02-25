<template>
  <div class="collapse-icon" @click="toggleSidebar">
    <component :is="isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" class="trigger" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSystemStore } from '@/store/modules/system'

const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)

function toggleSidebar() {
  useSystemStore().setCollapse(!isCollapse.value)
}
</script>

<style lang="less" scoped>
.collapse-icon {
  padding: 0 16px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
}

.trigger {
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
}
</style>
