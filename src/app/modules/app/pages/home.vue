<script setup>

import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useSessionStore } from "@/app/modules/auth/store/sessionStore"

/**
 * Resolver principal de /app.
 * - No muestra dashboard directamente.
 * - Decide destino inicial según rol del usuario.
 * - Director/User pasan por Workspace (contexto).
 */

const router = useRouter()
const sessionStore = useSessionStore()

const resolveHome = () => {

  const roles = sessionStore.user?.roles || []
  const roleNames = roles.map( rol => rol.name )

  // admin / superadmin: home administrativo
  if ( roleNames.includes('admin') || roleNames.includes('superadmin') ) {
    router.replace('/app/admin')
    return
  }

  // director / user: selector de contexto
  router.replace('/app/workspace')

}

onMounted( () => {
  resolveHome()
})


</script>

<template>
  <div class="pa-6">
    <h2 class="text-h5 mb-2">Cargando...</h2>
    <p class="text-body-2">Redirigiendo según tu perfil.</p>
  </div>
</template>
