
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
  router.beforeEach(to => {

    // [PERSONALIZACION-FG] Sesión actual (fuente única)
    const sessionStore = useSessionStore()
    sessionStore.load()
    const isLoggedIn = Boolean(sessionStore.token)

    console.log("access_token", isLoggedIn)

    const isRootRoute = to.path === '/'
    const isAuthRoute = to.path.startsWith('/app/auth')
    const isPrivateRoute = to.path.startsWith('/app')

    // [PERSONALIZACION-FG] App privada: nunca mostrar "/" (demo/landing)
    if (isRootRoute) {
      return isLoggedIn ? APP_HOME_ROUTE : LOGIN_ROUTE
    }

    // [PERSONALIZACION-FG] Si ya está logueado, evitar volver a login/verify
    if (isAuthRoute && isLoggedIn) {
      return APP_HOME_ROUTE
    }

    // [PERSONALIZACION-FG] Proteger todo /app excepto /app/auth
    if (isPrivateRoute && !isAuthRoute && !isLoggedIn) {
      return LOGIN_ROUTE
    }

    return true

  })
}
