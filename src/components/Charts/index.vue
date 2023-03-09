<template>
  <div :class="className" ref="chartRef"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  },
  className: {
    type: String,
    default: ''
  }
})

let chart = null
const chartRef = ref(null)

onMounted(() => {
  chart = echarts.init(chartRef.value)
  updateChart()
  window.addEventListener('resize', handleWindowResize)
})

watch(
  () => props.option,
  () => {
    updateChart()
  },
  { deep: true }
)

// 当窗口缩放时, echart动态调整自身大小
function handleWindowResize() {
  if (!chart) return
  chart.resize()
}

function updateChart() {
  if (!chart) return
  chart.clear()
  // https://echarts.apache.org/zh/api.html#echartsInstance.setOption
  chart.setOption(props.option, true)
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
