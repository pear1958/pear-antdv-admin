import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    appLoading: false
  }),
  actions: {
    setLoading(val) {
      this.appLoading = val
    }
  }
})
