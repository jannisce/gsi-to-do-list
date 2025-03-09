import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('javierjlace@gmail.com')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email)
      navigate('/todo')
    } catch (err) {
      setError('Login failed, please try again')
    }
  }

  return (
    <div className='bg-gradient-to-b from-blue-50 to-white flex justify-center items-center min-h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Login
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value) & setError('')}
              placeholder='Enter your email'
              required
              className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <button
              type='submit'
              className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200'
            >
              Login
            </button>
          </div>

          {error && (
            <div className='text-center text-red-600 mt-2'>
              <p>{error}</p>
            </div>
          )}
        </form>

        <div className='text-center mt-6'>
          <p className='text-sm text-gray-600'>
            No account required, just enter your email to get started!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
