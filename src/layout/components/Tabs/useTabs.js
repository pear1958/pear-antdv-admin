import { nextTick } from 'vue'
import Sortable from 'sortablejs'
import { useSystemStore } from '@/store/modules/system'

export async function useTabsDrag() {
  await nextTick()

  // 被拖动元素的父级元素
  const el = document.querySelectorAll('.tabs-box .ant-tabs-nav-list')?.[0]

  if (!el) return

  Sortable.create(el, {
    onEnd: event => {
      const { oldIndex, newIndex } = event

      if (oldIndex === newIndex) return

      useSystemStore().sortTabs(oldIndex, newIndex)
    }
  })
}
