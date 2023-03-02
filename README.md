## V-Admin

## 简介

`v-admin` 是一款开源免费的中后台管理系统模版, 使用最新的 `Vue3`、`Vite`、`ant-design-vue`、`Pinia` 等主流技术开发

#### 在线预览地址
[点我预览](https://zhangzy56.github.io/V-Admin)

#### 登录相关

- 开发中...
- 账号: admin
- 密码: 123456

- 使用的Node版本: v16.14.2

#### 项目截图
- 正在开发中...
<p align="center">
  <img alt="V-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-1.png">
  <img alt="V-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-2.png">
  <img alt="V-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-3.png">
  <img alt="V-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-4.png">
  <img alt="V-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-5.png">
</p>

#### 版本相关

Mock 平台:
- https://mock.mengxuegu.com/
- Mock数据还在逐步完善中...

#### 项目功能
- 支持主题切换和暗黑模式
- 使用 Vue3.2 + Js 开发，单文件组件＜script setup＞
- 使用 Pinia 替代 Vuex，轻量、简单、易用
- 对 Axios 整个二次封装 （请求拦截、常用请求封装……）
- 支持 路由权限拦截、页面按钮权限配置、路由懒加载、菜单动态权限
- 支持路由嵌套, 点击Tab和面包屑进行跳转时, query不会丢失
- 支持输入错误url 打开404页面
- 使用 keepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 更多功能正在持续完善中...

## 安装使用

- 获取项目代码

```
git clone git@github.com:zhangzy56/V-Admin.git
```

- 安装依赖
```
cd V-Admin
pnpm install
```

- 运行
```
pnpm run dev
```

- 打包

```bash
pnpm run build:pro
```

#### todo-list

- [x] 暗黑模式
- [x] 菜单栏搜索
- [x] 面包屑 & Tab 支持 路由query参数
- [x] 按钮权限指令封装
- [x] 完善异常页
- [ ] 迁移websocket
- [ ] vite.config.js优化
- [ ] husky and Lint 等代码规范
- [ ] 锁屏功能
- [ ] 移动端兼容
- [ ] 大屏和gis Demo
- [ ] drag Modal And SearchTable
- [ ] 优化登录页
- [ ] 优化Tab组件
- [ ] Echarts组件

