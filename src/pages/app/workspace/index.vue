<script setup>
// Fachada: ruta /app/workspace (auto-router)
import WorkspaceHomePage from '@/app/modules/app/pages/workspace/Home.vue'

definePage({
  meta: {
    layout: 'default',
  },
})
</script>

<template>
  <WorkspaceHomePage />
</template>
