import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import * as antIcons from '@ant-design/icons-vue'

import '@/style/index.less'

// 注册使用 svg icon
// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'

import { setupDirectives } from '@/directives'
import { registerGlobComp } from '@/components'

// 用于为应用内抛出的未捕获错误指定一个全局处理函数
import errorHandler from '@/utils/errorHandler'

const app = createApp(App)

app.config.globalProperties.$antIcons = antIcons

// 不会阻止页面渲染了, 控制台不会自动报错了
app.config.errorHandler = errorHandler

// Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
Object.keys(antIcons).forEach(key => {
  app.component(key, antIcons[key])
})

// 注册全局指令
setupDirectives(app)

// 注册全局组件
registerGlobComp(app)

app.use(store).use(router).use(Antd).mount('#app')
