// src/lib/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [mechanic, setMechanic] = useState(() => {
    try {
      const stored = localStorage.getItem('mechos_mechanic')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  const login = useCallback((token, mechanicData) => {
    localStorage.setItem('mechos_token', token)
    localStorage.setItem('mechos_mechanic', JSON.stringify(mechanicData))
    setMechanic(mechanicData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('mechos_token')
    localStorage.removeItem('mechos_mechanic')
    setMechanic(null)
  }, [])

  // isLoggedIn is true whether using a real JWT or the dev skip token
  const isLoggedIn = Boolean(
    mechanic && localStorage.getItem('mechos_token')
  )

  // True when using the dev bypass — used by api.js to skip real API calls
  const isDevMode = localStorage.getItem('mechos_token') === 'dev-token-skip'

  return (
    <AuthContext.Provider value={{ mechanic, isLoggedIn, isDevMode, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)