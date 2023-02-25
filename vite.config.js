import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Less2CssVariablePlugin from 'antd-less-to-css-variable'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    open: true, // 自动开启窗口
    // 端口号
    port: 6580,
    host: '0.0.0.0',
    proxy: {
      // easy-mock 官网 https://mock.mengxuegu.com   github地址: https://github.com/easy-mock/easy-mock
      '/api': {
        // target: 'https://mock.mengxuegu.com/mock/6396dc5c2e0f396e51a5c50f', // easymock
        // target: 'http://10.10.10.185:9501',
        target: 'http://10.10.10.49/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "@/style/variable.less";
          @import "@/style/mixin.less";
        `,
        plugins: [new Less2CssVariablePlugin()]
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    // 加载SVG文件作为Vue组件
    svgLoader()
  ],
  // 解决 Vite 启动完之后首页加载慢的问题
  optimizeDeps: {
    // 启动时 预加载这些包
    include: ['pinia', 'ant-design-vue/es/locale/zh_CN', 'dayjs']
  },
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4000,
    // esbuild 打包更快, 但是不能去除 console.log
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // 静态资源分类和打包
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
