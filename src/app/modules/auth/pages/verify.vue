<script setup>
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import { authService } from "@/app/modules/auth/services/authService.js"

// ⚠️ IMPORTANTE:
// El definePage YA está en la fachada src/pages/app/auth/verify.vue
// Aquí no lo repetimos para evitar conflictos.

const router = useRouter()
const otp = ref('')
const isOtpInserted = ref(false)

const onFinish = async () => {

  isOtpInserted.value = true

  try {

    const result = await authService.verify(otp.value)

    console.log('[VERIFY RESULT]', result)

    // TODO: cuando el backend también envíe userData y abilityRules,
    // aquí guardaremos todo eso antes del redirect.
    router.push('/app')
  } catch (error) {
    console.error('[VERIFY ERROR]', error)
    // TODO: mostrar mensaje amigable si el código es incorrecto o expiró
  } finally {
    isOtpInserted.value = false
  }


}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Forma superior -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Forma inferior -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Tarjeta de verificación -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <VCardTitle>
            <RouterLink to="/">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title">
                  {{ themeConfig.app.title }}
                </h1>
              </div>
            </RouterLink>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Verificación en dos pasos 💬
          </h4>
          <p class="mb-1">
            Te hemos enviado un código de verificación. Ingresa el código de seguridad en el campo de abajo.
          </p>
          <h6 class="text-h6">
            ******1234
          </h6>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- código -->
              <VCol cols="12">
                <h6 class="text-body-1">
                  Escribe tu código de seguridad de 6 dígitos
                </h6>
                <VOtpInput
                  v-model="otp"
                  :disabled="isOtpInserted"
                  type="number"
                  class="pa-0"
                  @finish="onFinish"
                />
              </VCol>

              <!-- botón verificar -->
              <VCol cols="12">
                <VBtn
                  :loading="isOtpInserted"
                  :disabled="isOtpInserted"
                  block
                  type="submit"
                >
                  Verificar mi cuenta
                </VBtn>
              </VCol>

              <!-- reenviar -->
              <VCol cols="12">
                <div class="d-flex justify-center align-center flex-wrap">
                  <span class="me-1">¿No recibiste el código?</span>
                  <a href="#">Reenviar</a>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";

.v-otp-input {
  .v-otp-input__content {
    padding-inline: 0;
  }
}
</style>
