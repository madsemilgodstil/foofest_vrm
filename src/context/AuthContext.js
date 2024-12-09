'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null) // Store the full user object

  // Check login state on load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('user') // Retrieve the full user object
    setIsLoggedIn(loggedInStatus === 'true')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [])

  const login = userData => {
    setIsLoggedIn(true)
    setUser(userData) // Store the full user object
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify(userData)) // Store user object in localStorage
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use the AuthContext in components
export const useAuth = () => useContext(AuthContext)
