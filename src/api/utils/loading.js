import { useSystemStore } from '@/store/modules/system'

// 全局 Loading
const startLoading = () => {
  useSystemStore().showLoading()
}

const endLoading = () => {
  useSystemStore().closeLoaidng()
}

// 为了避免多个http请求同时 显示全局loading

let loadingCount = 0

export function showLoading() {
  if (loadingCount === 0) startLoading()
  loadingCount++
}

export function tryCloseLoading() {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) endLoading()
}
