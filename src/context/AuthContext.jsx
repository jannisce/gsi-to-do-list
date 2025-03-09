import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Store authenticated user info
  const [loading, setLoading] = useState(true) // Manage loading state

  useEffect(() => {
    const token = localStorage.getItem('jwt') // Check if JWT token is in localStorage
    if (token) {
      const decodedToken = decodeJwt(token) // Decode JWT token to get user info
      setUser(decodedToken)
    }
    setLoading(false) // Set loading to false after checking token
  }, [])

  // Helper function to decode JWT token
  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const decodedData = JSON.parse(atob(base64))
    return decodedData // Returns decoded user data
  }

  // Login function that makes the API call and stores token and user info
  const login = async (email) => {
    try {
      // Call login API to get the JWT token
      const response = await axiosInstance.post('/login', { email })
      const token = response.data.data.token

      const decodedUser = decodeJwt(token) // Decode token to get user info

      // Store JWT token and user info in localStorage
      localStorage.setItem('jwt', token)
      localStorage.setItem('user', JSON.stringify(decodedUser))

      // Set the user state
      setUser(decodedUser)
    } catch (error) {
      console.log(error)
      throw error // Handle errors here
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('jwt') // Remove JWT token from localStorage
    localStorage.removeItem('user') // Remove user info from localStorage
    setUser(null) // Clear the user state
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
