

import apiClient from '@/app/http/apiClient'
import { useSessionStore } from "@/app/modules/auth/store/sessionStore"



const LOGIN_ENDPOINT = '/v1/auth/login'
const VERIFY_2FA_ENDPOINT = '/v1/auth/verify-2fa'
const TWO_FA_EMAIL_KEY = 'pending_2fa_email'
const LOGOUT_ENDPOINT = '/v1/auth/logout'

/**
 * Servicio de Autenticación
 * Paso 4 — Stub sin backend real todavía.
 * Retorna un resultado simulado y estructura final correcta.
 */

export const authService = {

  /**
   * Paso 1: Login
   * Llama a POST /api/v1/auth/login con { email, password }.
   * Si todo va bien, el backend envía el código 2FA por correo y responde { two_factor: true }.
   */
  async login(credentials) {

    console.log('[authService.login] called with:', credentials)

    try {

      const response = await apiClient.post(LOGIN_ENDPOINT, {
        email: credentials.email,
        password: credentials.password,
      })

      const payload = response.data
      const data = payload?.data ?? {}

      const twoFactor = data.two_factor === true

      if (twoFactor) {
        // Guardamos el email para el paso de verify
        sessionStorage.setItem(TWO_FA_EMAIL_KEY, credentials.email)
      }

      return {
        ok: true,
        requires2FA: twoFactor,
        raw: payload,
      }

    } catch (e) {

      console.error('[authService.login][ERROR]', e)

      const status = e.response?.status
      const backend = e.response?.data

      // Devolvemos info estructurada para que login.vue pueda decidir qué hacer
      throw {
        ok: false,
        status,
        backend,
        message:
          backend?.detail ||
          backend?.message ||
          'Error al iniciar sesión. Revisa tus credenciales.',
      }

    }



  },


  /**
   * Paso 2: Verificar código 2FA
   * Llama a POST /api/v1/auth/verify-2fa con { email, two_factor_code }.
   * El backend devuelve un token (Passport).
   */
  async verify(code) {
    console.log('[authService.verify] called with code:', code)

    const email = sessionStorage.getItem(TWO_FA_EMAIL_KEY)

    if (!email) {
      throw new Error('No hay email pendiente para 2FA. Vuelve a iniciar sesión.')
    }

    try {

      const response = await apiClient.post(VERIFY_2FA_ENDPOINT, {
        email,
        two_factor_code: code,
      })

      const payload = response.data
      const data = payload?.data ?? {}

      const token = data.token

      //persistir token
      const sessionStore = useSessionStore()
      sessionStore.setToken(token)

      // TODO: aquí más adelante:
      // - guardar token en cookie/localStorage
      // - guardar userData cuando el backend también lo envíe
      // - limpiar TWO_FA_EMAIL_KEY si ya no hace falta
      sessionStorage.removeItem(TWO_FA_EMAIL_KEY)

      return {
        ok: true,
        token,
        raw: payload,
      }

    } catch (e) {
      console.error('[authService.verify][ERROR]', e)

      const status = e.response?.status
      const backend = e.response?.data

      throw {
        ok: false,
        status,
        backend,
        message:
          backend?.detail ||
          backend?.message ||
          'Error al verificar el código 2FA.',
      }
    }




  },

  /*

   */
  async logout() {
    try {
      // Si hay token, apiClient ya lo enviará por interceptor
      await apiClient.post(LOGOUT_ENDPOINT)
    } catch (e) {
      // [PERSONALIZACION-FG] En logout, si falla la API igual limpiamos sesión local.
      console.warn('[authService.logout] fallo API, se limpia sesión local igual', e?.response?.status)
    } finally {
      // Limpieza local (fuente única)
      const sessionStore = useSessionStore()
      sessionStore.clear()

      // Limpieza extra (flujo 2FA pendiente, por si quedó algo)
      sessionStorage.removeItem(TWO_FA_EMAIL_KEY)
    }

    return { ok: true }
  }
}
