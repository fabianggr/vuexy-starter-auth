

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  // Aquí luego llamaremos al servicio de auth
  console.log('Login submit', { email: email.value, password: password.value })
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<template>
  <section class="p-4">
    <h1 class="mb-4 text-2xl font-bold">Sign in</h1>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-1">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          class="border rounded px-2 py-1"
          placeholder="you@example.com"
          required
        >
      </div>

      <div class="flex flex-col gap-1">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="border rounded px-2 py-1"
          placeholder="••••••••"
          required
        >
      </div>

      <button
        type="submit"
        class="px-4 py-2 rounded bg-primary text-white"
        :disabled="loading"
      >
        {{ loading ? 'Processing...' : 'Continue' }}
      </button>
    </form>
  </section>
</template>
