import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import * as antIcons from '@ant-design/icons-vue'

import '@/styles/index.less'

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/styles/index.scss整体css文件导致热更新慢的问题
import '@/styles/tailwind.css'

// 注册使用 svg icon
// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'

import { getSystemConfig } from '@/config'

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

getSystemConfig(app).then(config => {
  app.use(router).use(store).use(Antd)
  app.mount('#app')
})
