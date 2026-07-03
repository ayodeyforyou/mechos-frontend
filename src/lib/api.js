import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const api = axios.create({
  baseURL,
  timeout: 10000,
})

// Add JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('mechanic_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // If calling Supabase directly, add API key
  if (config.url?.includes('supabase.co') && !config.headers.apikey) {
    config.headers.apikey = supabaseKey
  }
  return config
})

// Redirect to login on 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('mechanic_token')
      localStorage.removeItem('mechanic_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Separate auth API client (no token auto-attach, includes API key for Supabase)
export const authApi = axios.create({ baseURL })

authApi.interceptors.request.use(config => {
  if (supabaseUrl && supabaseKey) {
    config.headers.apikey = supabaseKey
  }
  return config
})

// Export Supabase config for direct access if needed
export { supabaseUrl, supabaseKey }

export default api
