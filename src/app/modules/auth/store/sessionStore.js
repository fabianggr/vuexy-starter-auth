import { defineStore } from 'pinia'

const STORAGE_KEY = 'access_token'

export const useSessionStore = defineStore('app-session', {
  state: () => ({
    token: null,
    loaded: false,
  }),

  actions: {
    load() {
      if (this.loaded) return
      this.token = localStorage.getItem(STORAGE_KEY)
      this.loaded = true
    },

    setToken(token) {
      this.token = token
      localStorage.setItem(STORAGE_KEY, token)
      this.loaded = true
    },

    clear() {
      this.token = null
      localStorage.removeItem(STORAGE_KEY)
      this.loaded = true
    },
  },
})
