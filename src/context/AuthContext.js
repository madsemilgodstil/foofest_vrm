'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  // Check login state on load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    const storedUserId = localStorage.getItem('user_id')
    setIsLoggedIn(loggedInStatus === 'true')
    setUserId(storedUserId)
  }, [])

  const login = id => {
    setIsLoggedIn(true)
    setUserId(id)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user_id', id) // Store the user ID
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserId(null)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user_id')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use the AuthContext in components
export const useAuth = () => useContext(AuthContext)
