

<script setup>
import { onMounted } from 'vue'
import apiClient from '@/app/http/apiClient' // <- nuestra capa

onMounted(() => {
  console.log('Test API page montada')
  console.log('BaseURL apiClient:', apiClient.defaults.baseURL)
})
</script>

<template>
  <section class="p-4">
    <h1 class="mb-2 text-xl font-bold">Test API</h1>
    <p class="text-sm text-disabled">
      Esta página solo verifica que apiClient se importa correctamente.
    </p>
    <p class="mt-4">
      Revisa la consola del navegador para ver el log de <code>apiClient.defaults.baseURL</code>.
    </p>
  </section>
</template>
