<script setup>
// Fachada: ruta /app/admin (auto-router)
import AdminHomePage from '@/app/modules/app/pages/admin/Home.vue'

definePage({
  meta: {
    layout: 'default',
  },
})
</script>

<template>
  <AdminHomePage />
</template>
