import { defineStore } from 'pinia'
import { authService } from "@/app/modules/auth/services/authService"

const STORAGE_KEY = 'access_token'

export const useSessionStore = defineStore('app-session', {
  state: () => ({
    token: null,
    user: null,
    loaded: false,
    userLoaded: false,
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

    setUser(user) {
      this.user = user
      this.userLoaded = true
    },


    clear() {
      this.token = null
      this.user = null
      this.userLoaded = false
      localStorage.removeItem(STORAGE_KEY)
      this.loaded = true
    },

    /**
     * control de sesión:
     * - si hay token, carga userData desde backend (una sola vez)
     * - si backend responde 401/403, limpia sesión local
     */
    async loadUserProfile() {

      this.load()

      if ( !this.token || this.userLoaded )
        return

      try {

        const user = await authService.me()
        this.setUser(user)

      } catch (e) {

        const status = e?.response?.status

        // Si el token ya no es válido, limpiamos sesión (producción real)
        if (status === 401 || status === 403)
          this.clear()

        throw e

      }

    },



  },
})
