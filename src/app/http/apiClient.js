


import axios from 'axios'

// ⚠️ Por ahora algo simple: luego añadimos interceptores
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9000/api',
  timeout: 20000,
})

export default apiClient
