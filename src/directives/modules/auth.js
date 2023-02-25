import { usePermissionStore } from '@/store/modules/permission'

// 后端返回按钮权限数据如 @/assets/buttonData 所示
// Key 不一定要是routeName, 也可以是routePath, 只要保证每个页面唯一 & 可以区分即可

// 按钮权限指令
export function setupAuthDirective(app) {
  app.directive('auth', {
    mounted(el, binding) {
      const { value } = binding
      const { curRouteName, buttonData } = usePermissionStore()

      const currentPageAuths = buttonData[curRouteName] || []

      // 使用方式: v-auth="'xxx按钮'" || v-auth="['yyy按钮']" || v-auth="['xxx按钮', 'yyy按钮']"
      const bindData = Array.isArray(value) ? value : [value]

      const hasPermission = bindData.every(item => currentPageAuths.includes(item))

      if (!hasPermission) el.remove()
    }
  })
}
