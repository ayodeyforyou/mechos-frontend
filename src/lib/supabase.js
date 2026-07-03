// Supabase client configuration
// This provides direct access to Supabase for real-time features and auth

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfig = {
  url: SUPABASE_URL,
  key: SUPABASE_KEY,
}

// Helper to build Supabase REST API URLs
export const supabaseRest = (endpoint) => {
  return `${SUPABASE_URL}/rest/v1${endpoint}`
}

// Get authorization header for Supabase API calls
export const getSupabaseHeaders = (token) => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${token || SUPABASE_KEY}`,
  'Content-Type': 'application/json',
})

// OTP endpoints via Supabase Auth
export const supabaseAuth = {
  requestOtp: async (phone) => {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: 'POST',
      headers: getSupabaseHeaders(),
      body: JSON.stringify({
        phone,
        data: {}
      })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error_description || 'Failed to send OTP')
    }
    return response.json()
  },

  verifyOtp: async (phone, token) => {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method: 'POST',
      headers: getSupabaseHeaders(),
      body: JSON.stringify({
        type: 'sms',
        phone,
        token
      })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error_description || 'Invalid OTP')
    }
    return response.json()
  }
}
