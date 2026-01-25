
/**
 * [PERSONALIZACION-FG]
 * Guards globales de la aplicación (proyecto personal).
 *
 * Objetivo:
 * - Aplicación privada: no existe vista pública.
 * - Evitar tocar páginas demo de la plantilla (ej: src/pages/index.vue).
 * - Centralizar decisiones de autenticación en código propio (/src/app).
 *
 * Fuente de verdad de sesión:
 * - Token en localStorage con key: "access_token"
 * - (Gestionado por Pinia sessionStore: src/app/modules/auth/store/sessionStore.js)
 *
 * Nota de portabilidad:
 * - Este archivo es 100% “copiar/pegar” en upgrades de Vuexy.
 * - Solo existe 1 punto de integración mínima en el plugin del router.
 */

import { useSessionStore } from "@/app/modules/auth/store/sessionStore.js"


const LOGIN_ROUTE = '/app/auth/login'
const APP_HOME_ROUTE = '/app'


/**
 * Registra guards de autenticación sobre el router.
 * @param {import('vue-router').Router} router
 */
export function setupAppGuards(router) {
  router.beforeEach(async to => {

    // [PERSONALIZACION-FG] Sesión actual (fuente única)
    const sessionStore = useSessionStore()
    sessionStore.load()


    const isLoggedIn = Boolean(sessionStore.token)

    if (import.meta.env.DEV)
      console.log('[GUARD] sesión activa:', isLoggedIn)

    const isRootRoute = to.path === '/'
    const isAuthRoute = to.path.startsWith('/app/auth')
    const isPrivateRoute = to.path.startsWith('/app')

    // App privada: nunca mostrar "/" (demo/landing)
    if (isRootRoute) {
      return isLoggedIn ? APP_HOME_ROUTE : LOGIN_ROUTE
    }

    // Si ya está logueado, evitar volver a login/verify
    if (isAuthRoute && isLoggedIn) {
      return APP_HOME_ROUTE
    }

    // Proteger /app excepto /app/auth
    if (isPrivateRoute && !isAuthRoute && !isLoggedIn) {
      return LOGIN_ROUTE
    }

    // si está logueado y entra a zona privada,
    // cargamos userData real una sola vez (Pinia).
    if (isPrivateRoute && isLoggedIn) {
      try {
        await sessionStore.loadUserProfile()
      } catch (e) {
        // Si el token expiró y el store lo limpió, redirigir a login
        if (!sessionStore.token)
          return LOGIN_ROUTE
      }
    }


    return true

  })
}
