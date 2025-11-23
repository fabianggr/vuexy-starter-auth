

import apiClient from '@/app/http/apiClient'

/**
 * Servicio de Autenticación
 * Paso 4 — Stub sin backend real todavía.
 * Retorna un resultado simulado y estructura final correcta.
 */

export const authService = {

  /*
  *
   */
  async login(credentials) {
    console.log('[authService.login] called with:', credentials)

    // 🚨 OJO: Esto es temporal.
    // Luego se conectará a tu backend Laravel 12 con 2FA.
    await new Promise(resolve => setTimeout(resolve, 800))

    // Simulación temporal de respuesta
    return {
      status: 'OK',
      requires2FA: true, // tu backend real lo dirá más adelante
      message: 'Credentials accepted, waiting for 2FA code.',
    }
  },


  /**
   * Verificación del código 2FA (stub).
   * Más adelante aquí llamaremos al backend real y obtendremos el token.
   */
  async verify(code) {
    console.log('[authService.verify] called with code:', code)

    // Simulación de espera de red
    await new Promise(resolve => setTimeout(resolve, 800))

    // Simulación de respuesta de backend
    return {
      status: 'OK',
      accessToken: 'fake-token-123',
      user: {
        name: 'Demo User',
        email: 'demo@example.com',
      },
      message: 'Código verificado correctamente.',
    }
  },
}
