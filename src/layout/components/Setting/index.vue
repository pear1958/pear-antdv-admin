<template>
  <a-drawer v-model:visible="showDrawer" title="项目设置" placement="right" :bodyStyle="{ paddingTop: 0 }">
    <a-divider>暗黑模式</a-divider>

    <div class="flex-center">
      <dark-icon />
    </div>

    <a-divider>其它功能</a-divider>

    <div class="theme-item">
      <span>主题颜色</span>
      <div class="color-picker"></div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import Pickr from '@simonwep/pickr'
import '@simonwep/pickr/dist/themes/nano.min.css'
import DarkIcon from '@/components/DarkIcon/index.vue'
import { useSystemStore } from '@/store/modules/system'
import { useTheme } from '@/hooks/useTheme'
import emitter from '@/utils/mitt'

const showDrawer = ref(false)
let picker = null

emitter.on('openSetDrawer', () => {
  showDrawer.value = true
})

// 页面初始化时, 还原 主题 & 暗黑模式
useTheme().initThemeAndDark()

watch(showDrawer, async newVal => {
  if (newVal && !picker) {
    await nextTick()
    initColorPicker()
  }
})

function initColorPicker() {
  picker = Pickr.create({
    el: '.color-picker',
    theme: 'nano',
    default: useSystemStore().themeColor,
    swatches: [
      '#1890FF',
      '#F44336',
      '#DF1E60',
      '#9026A2',
      '#5C35A0',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
    ],
    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,
      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        // hsla: true,
        // hsva: true,
        // cmyk: true,
        input: true,
        save: true,
        cancel: true
      }
    },
    i18n: {
      'btn:save': '保存',
      'btn:cancel': '取消'
    }
  })

  picker.on('save', (color, instance) => {
    const themeColor = '#' + color.toHEXA().join('')
    useTheme().changeTheme(themeColor)
    picker.hide()
  })

  picker.on('cancel', () => {
    picker.hide()
  })
}
</script>

<style lang="less" scoped>
.theme-item {
  .flex(space-between);
  margin: 14px 0;

  span {
    font-size: 14px;
  }
}
</style>
