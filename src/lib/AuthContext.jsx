import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [mechanic, setMechanic] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('mechanic_token')
    const user = localStorage.getItem('mechanic_user')
    if (token && user) {
      setMechanic(JSON.parse(user))
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('mechanic_token', token)
    localStorage.setItem('mechanic_user', JSON.stringify(userData))
    setMechanic(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('mechanic_token')
    localStorage.removeItem('mechanic_user')
    setMechanic(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ mechanic, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
