<template>
  <a-switch v-model:checked="isDark" @change="onDarkChange">
    <template #checkedChildren>
      <svg-icon name="sun" />
    </template>

    <template #unCheckedChildren>
      <svg-icon name="moon" />
    </template>
  </a-switch>
</template>

<script setup>
import { ref } from 'vue'
import { useSystemStore } from '@/store/modules/system'
import { useTheme } from '@/hooks/useTheme'

const isDark = ref(useSystemStore().isDark)

function onDarkChange(checked) {
  useTheme().changeDark(checked)
}
</script>
