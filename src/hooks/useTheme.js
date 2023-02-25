import { generate } from '@ant-design/colors'
import { useSystemStore } from '@/store/modules/system'

export function useTheme() {
  const systemStore = useSystemStore()

  // 切换暗黑模式
  const changeDark = isDark => {
    // document.documentElement.classList[isDark ? 'add' : 'remove']('v-dark')

    // 添加暗黑模式的类名
    document.body.classList[isDark ? 'add' : 'remove']('v-dark')

    systemStore.setDark(isDark)

    changeTheme(systemStore.themeColor)
  }

  const changeTheme = color => {
    // console.log('systemStore.isDark', systemStore.isDark)

    // 删除原来的style标签
    const themeEle = document.querySelector('#theme-var')

    if (themeEle && themeEle.parentNode) {
      themeEle.parentNode.removeChild(themeEle)
    }

    // 生成暗黑模式下的颜色数组
    const colors = generate(color, systemStore.isDark ? { theme: 'dark' } : {})

    // body的类名
    const rootClass = systemStore.isDark ? `.v-dark` : ':root'

    // 创建style标签
    const styleTag = document.createElement('style')
    styleTag.id = 'theme-var'
    styleTag.setAttribute('type', 'text/css')

    systemStore.setThemeColor(color)

    styleTag.innerHTML = `${rootClass}{${colors
      .map((item, index) => {
        return `--primary-${index + 1}:${item};`
      })
      .concat([`--primary-color:${color};`])
      .join('')}}`

    document.head.appendChild(styleTag)
  }

  // 页面初始化时, 还原 主题 & 暗黑模式
  const initThemeAndDark = () => {
    changeDark(systemStore.isDark)
    changeTheme(systemStore.themeColor)
  }

  return {
    changeDark,
    changeTheme,
    initThemeAndDark
  }
}
