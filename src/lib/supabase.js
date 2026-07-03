// Supabase client configuration using the official SDK
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfig = {
  url: SUPABASE_URL,
  key: SUPABASE_KEY,
}

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})

// OTP authentication via Supabase Auth
export const supabaseAuth = {
  requestOtp: async (phone) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        shouldCreateUser: true,
      }
    })
    
    if (error) {
      throw new Error(error.message || 'Failed to send OTP')
    }
    
    return { success: true }
  },

  verifyOtp: async (phone, token) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })
    
    if (error) {
      throw new Error(error.message || 'Invalid OTP')
    }
    
    return {
      token: data.session?.access_token,
      user: data.user
    }
  }
}
