import { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'
import { useNavigate } from 'react-router-dom'
import { getAuthUrl } from '../utils/urlConfig'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
    
    // Set up periodic auth check every 5 minutes
    const authInterval = setInterval(() => {
      checkAuthStatus()
    }, 5 * 60 * 1000) // 5 minutes
    
    return () => clearInterval(authInterval)
  }, [])

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      console.log('Checking auth status...')
      const authData = await apiService.getAuthStatus()
      console.log('Auth data received:', authData)
      
      if (authData.authenticated) {
        setUser(authData.user)
        setIsAdmin(authData.isAdmin)
        console.log('User authenticated:', authData.user)
        console.log('Is admin:', authData.isAdmin)
      } else {
        setUser(null)
        setIsAdmin(false)
        console.log('User not authenticated')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setError(error.message)
      setUser(null)
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await apiService.logout()
      setUser(null)
      setIsAdmin(false)
      setError(null) // Clear any previous errors
      // Redirect to home page using React Router
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
      setError(error.message)
      // Even if logout fails on the server, clear local state and redirect
      setUser(null)
      setIsAdmin(false)
      navigate('/')
    }
  }

  const loginWithGoogle = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = getAuthUrl('google')
  }

  const value = {
    user,
    isAdmin,
    loading,
    error,
    loginWithGoogle,
    logout: handleLogout,
    checkAuthStatus,
    refreshAuth: checkAuthStatus, // Expose the checkAuthStatus function for manual refresh
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
