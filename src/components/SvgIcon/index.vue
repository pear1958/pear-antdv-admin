<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: { type: String, default: 'icon' },
  name: { type: String, default: '' }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
}
</style>
