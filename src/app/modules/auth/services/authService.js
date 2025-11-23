

import apiClient from '@/app/http/apiClient'

// Aquí solo definimos la forma; luego conectamos con tu Laravel 12
export async function loginRequest(payload) {
  // payload: { email, password }
  console.log('[authService] loginRequest', payload)

  // Luego será algo tipo:
  // const { data } = await apiClient.post('/auth/login', payload)
  // return data

  return { ok: true } // dummy temporal
}

export async function verifyCodeRequest(payload) {
  // payload: { token }
  console.log('[authService] verifyCodeRequest', payload)

  // Luego:
  // const { data } = await apiClient.post('/auth/verify', payload)
  // return data

  return { ok: true, access_token: 'dummy-token' } // dummy temporal
}
