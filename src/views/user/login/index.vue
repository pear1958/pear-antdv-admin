<template>
  <div class="login">
    <div class="login-form">
      <h2 class="title">V-Admin</h2>

      <a-form :model="formState" name="normal_login" :rules="rules" @finish="handleLogin">
        <a-form-item name="username">
          <a-input v-model:value="formState.username" placeholder="账号" size="large">
            <template #prefix>
              <UserOutlined class="icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="formState.password" placeholder="密码" size="large">
            <template #prefix>
              <LockOutlined class="icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="code">
          <a-row :gutter="8">
            <a-col :span="17">
              <a-input v-model:value="formState.code" placeholder="验证码" size="large">
                <template #prefix>
                  <verified-outlined class="icon" />
                </template>
              </a-input>
            </a-col>
            <a-col :span="7">
              <img src="./code.png" class="code-img" />
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>

          <a-button type="link" class="forgot">忘记密码?</a-button>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" :loading="loading" style="width: 100%" size="large" html-type="submit"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>

    <div class="copyright-wrap">
      <p class="en">copyright@2023 v-admin All Rights Reserved</p>
      <p class="cn">v-admin 版权所有</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted,ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useTheme } from '@/hooks/useTheme'
// import { getUserInfo } from '@/api/modules/user'

const router = useRouter()

// 页面初始化时, 还原 主题 & 暗黑模式
useTheme().initThemeAndDark()

// login({
//   username: 'admin',
//   password: '123qwe',
//   code: ''
// })

// getUserInfo().then(res => {
//   console.log('res', res)
// })

const loading = ref(false)

const formState = reactive({
  username: 'Admin',
  password: '123456',
  remember: true,
  code: 'phfp'
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  code: [{ required: true, message: '请输入验证码' }]
}

function handleLogin(loginForm) {
  if (formState.username == 'Admin' && (formState.password == '123456') & (formState.code == 'phfp')) {
    loading.value = true

    setTimeout(() => {
      // console.log('loginForm', loginForm)
      loading.value = false
      localStorage.setItem('token', 'test-token')
      router.push('/home')
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url(/src/assets/imgs/login-bg-5.png) no-repeat;
  background-size: 100% 100%;
  .flex();

  .login-form {
    width: 400px;
    background-color: #ffffff;
    box-shadow: 0px 6px 8px rgba(39, 106, 188, 0.05);
    border-radius: 8px;
    padding: 24px;

    .title {
      font-size: 20px;
      color: rgba(50, 65, 82, 1);
      margin-bottom: 30px;
    }

    .forgot {
      float: right;
    }

    .icon {
      color: rgba(0, 0, 0, 0.25);
    }

    .code-img {
      border: 1px solid var(--border-color-split);
      cursor: pointer;
      width: 100%;
      height: 40px;
    }

    :deep(.ant-input-lg) {
      font-size: 14px;
    }
  }

  .copyright-wrap {
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 42px;

    p {
      text-align: center;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.75);
    }

    .cn {
      margin-top: 12px;
    }
  }
}
</style>
