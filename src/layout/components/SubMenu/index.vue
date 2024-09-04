<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <a-menu-item v-if="!subItem.children || !subItem.children.length" :key="subItem.path" :title="subItem.title">
      <template #icon>
        <component :is="subItem.meta.icon" />
      </template>

      <span>{{ subItem.meta.title }}</span>
    </a-menu-item>

    <a-sub-menu v-else :key="(subItem.path as string)">
      <template #icon>
        <component :is="subItem.meta.icon" />
      </template>

      <template #title>{{ subItem.meta.title }}</template>

      <SubMenu :menuList="subItem.children" />
    </a-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import SubMenu from './index.vue'

defineProps({
  menuList: {
    type: Array as PropType<any>,
    default: () => []
  }
})
</script>
