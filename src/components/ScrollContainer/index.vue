<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot />
  </Scrollbar>
</template>

<script lang="ts">
import { ref, unref, nextTick } from 'vue'
import Scrollbar from './Scrollbar/index.vue'
import { useScrollTo } from './useScrollTo'

export default {
  name: 'ScrollContainer',
  components: {
    Scrollbar
  },
  setup() {
    const scrollbarRef = ref(null)

    // 滚动到指定位置
    function scrollTo(to, duration = 500) {
      const scrollbar = unref(scrollbarRef)

      if (!scrollbar) {
        return
      }

      nextTick(() => {
        const wrap = unref(scrollbar.wrap)

        if (!wrap) {
          return
        }

        const { start } = useScrollTo({
          el: wrap,
          to,
          duration
        })

        start()
      })
    }

    function getScrollWrap() {
      const scrollbar = unref(scrollbarRef)

      if (!scrollbar) {
        return null
      }

      return scrollbar.wrap
    }

    // 滚动到底部
    function scrollBottom() {
      const scrollbar = unref(scrollbarRef)

      if (!scrollbar) {
        return
      }

      nextTick(() => {
        const wrap = unref(scrollbar.wrap)

        if (!wrap) {
          return
        }

        const scrollHeight = wrap.scrollHeight

        const { start } = useScrollTo({
          el: wrap,
          to: scrollHeight
        })

        start()
      })
    }

    return {
      scrollbarRef,
      scrollTo,
      scrollBottom,
      getScrollWrap
    }
  }
}
</script>

<style lang="less">
.scroll-container {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 18px !important;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>
