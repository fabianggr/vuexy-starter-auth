<script setup>


import { computed } from 'vue'
import { useRouter } from 'vue-router'
import avatar1 from '@images/avatars/avatar-1.png'

// [PERSONALIZACION-FG] Servicios propios (backend real + sesión local)
import { authService } from '@/app/modules/auth/services/authService'
import { useSessionStore } from '@/app/modules/auth/store/sessionStore'

/**
 * [PERSONALIZACION-FG]
 * AppUserMenu (Centro de control de sesión)
 *
 * Este componente reemplaza al UserProfile de la plantilla para:
 * - Mantener máxima portabilidad (código propio, migrable en upgrades)
 * - Centralizar: logout, datos básicos de sesión, accesos futuros a perfil/configuración
 *
 * Nota:
 * - Hoy solo tenemos token persistido (access_token).
 * - En próximos pasos guardaremos también userData (nombre, rol, etc.) desde backend.
 */

const router = useRouter()
const sessionStore = useSessionStore()

// Nombre y rol a partir del perfil cargado desde backend.
// No persistimos userData en localStorage: se rehidrata vía /users/me.
const displayName = computed(() => sessionStore.user?.name || 'Usuario')

// Si el usuario tiene varios roles, por ahora mostramos el primero.
// Más adelante podremos decidir “rol activo”.
const displayRole = computed(() => sessionStore.user?.roles?.[0]?.name || '—')

// [PERSONALIZACION-FG] Logout real: API + limpieza local + redirección.
// - Se usa router.replace para evitar volver atrás con el botón "Back".
const handleLogout = async () => {
  try {
    await authService.logout()
  } finally {
    // Defensa extra: si por alguna razón logout no limpió, lo aseguramos aquí.
    sessionStore.clear()
  }

  router.replace('/app/auth/login')
}

</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- [PERSONALIZACION-FG] Menú de sesión -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- User-->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ displayName }}
            </VListItemTitle>
            <VListItemSubtitle>{{ displayRole }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- Accesos futuros (sin implementar aún) -->

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>

            <VListItemTitle>Mi perfil</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-settings"
                size="22"
              />
            </template>

            <VListItemTitle>Configuración</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- Logout -->
          <VListItem @click="handleLogout" class="cursor-pointer">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Cerrar sesión</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- /[PERSONALIZACION-FG] -->

    </VAvatar>
  </VBadge>
</template>
