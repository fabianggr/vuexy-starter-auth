

<script setup>
import { ref } from 'vue'

const code = ref(['', '', '', '', '', ''])
const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  const token = code.value.join('')
  console.log('Verify submit, token:', token)
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<template>
  <section class="p-4">
    <h1 class="mb-4 text-2xl font-bold">Verify code</h1>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <p class="text-sm text-muted">
        Enter the 6-digit code we sent to your email.
      </p>

      <div class="flex gap-2">
        <input
          v-for="(digit, index) in code"
          :key="index"
          v-model="code[index]"
          maxlength="1"
          inputmode="numeric"
          pattern="[0-9]*"
          class="w-10 h-10 text-center border rounded"
        >
      </div>

      <button
        type="submit"
        class="px-4 py-2 rounded bg-primary text-white"
        :disabled="loading"
      >
        {{ loading ? 'Verifying...' : 'Verify' }}
      </button>
    </form>
  </section>
</template>
