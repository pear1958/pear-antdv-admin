import { onMounted, ref, onUnmounted } from 'vue'

export function useScript(options) {
  const loading = ref(false)
  const success = ref(false)

  let script = null

  const promise = new Promise((resolve, reject) => {
    onMounted(() => {
      script = document.createElement('script')

      script.type = 'text/javascript'

      script.onload = () => {
        loading.value = false
        success.value = true
        resolve(true)
      }

      script.onerror = () => {
        loading.value = false
        success.value = false
        reject()
      }

      script.src = options.src

      document.head.appendChild(script)
    })

    onUnmounted(() => {
      script && script.remove()
    })
  })

  return {
    loading,
    success,
    toPromise: () => promise
  }
}

// 用法示例
// const { toPromise } = useScript({ src: 'xxx' })
// await toPromise() // 即 Js 脚本 加载完成
// do-something
