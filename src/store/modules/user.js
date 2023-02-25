import { defineStore } from 'pinia'
import { getUserInfoApi } from '@/api/modules/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
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
    }
    // async login(params) {
    // }
  }
})
