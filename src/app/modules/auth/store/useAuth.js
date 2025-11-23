

import { ref, computed } from 'vue'

const accessToken = ref(localStorage.getItem('access_token') || null)
const twoFADone = ref(false)

export function useAuth() {
  const isLoggedIn = computed(() => !!accessToken.value)
  const is2FADone = computed(() => twoFADone.value)

  const setToken = token => {
    accessToken.value = token
    if (token) {
      localStorage.setItem('access_token', token)
    } else {
      localStorage.removeItem('access_token')
    }
  }

  const set2FADone = value => {
    twoFADone.value = value
  }

  const logout = () => {
    setToken(null)
    twoFADone.value = false
  }

  return {
    accessToken,
    isLoggedIn,
    is2FADone,
    setToken,
    set2FADone,
    logout,
  }
}
