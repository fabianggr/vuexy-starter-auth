


import axios from 'axios'
import { useSessionStore } from "@/app/modules/auth/store/sessionStore.js"

/**
 * [PERSONALIZACION-FG]
 * Cliente HTTP centralizado para la aplicación.
 *
 * Objetivos:
 * - Un solo lugar para configurar baseURL, timeout e interceptores.
 * - Adjuntar automáticamente el token Bearer a cada request.
 * - Mantener portabilidad: la fuente única del token es sessionStore.
 *
 * Nota:
 * - La plantilla Vuexy puede manejar cookies internas (accessToken, userData, etc.).
 * - Esta app NO depende de esas cookies: usa su propio sessionStore (localStorage 'access_token').
 */



const apiClient = axios.create({
  // baseURL configurable por entorno (recomendado)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9000/api',
  // timeout razonable para dev (ajustable en producción)
  timeout: 20000,
})

/**
 * [PERSONALIZACION-FG]
 * Interceptor: adjunta Authorization: Bearer <token> si existe sesión.
 *
 * - sessionStore.load() hidrata token desde localStorage una sola vez por sesión.
 * - Si token existe, se añade al header de manera transparente.
 */
apiClient.interceptors.request.use( config => {

  const sessionStore = useSessionStore()
  sessionStore.load()

  const token = sessionStore.token
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config

})

export default apiClient
