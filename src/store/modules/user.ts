import { defineStore } from 'pinia'
import { getUserInfoApi } from '@/api/modules/user'
import { userState } from '../types'

export const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    token: null,
    userInfo: null
  }),
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
          .then(res => {
            this.userInfo = res.data
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },
    setToken(token: null | string) {
      this.token = token
    }
  }
})
