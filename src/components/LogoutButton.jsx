import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout() // Call the logout function to log the user out
      navigate('/') // Redirect to the home page after logout
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <Link
      onClick={handleLogout}
      className='px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white mt-4'
    >
      Log out
    </Link>
  )
}

export default LogoutButton
