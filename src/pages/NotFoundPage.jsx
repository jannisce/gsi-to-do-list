import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-white flex justify-center items-center min-h-screen'>
      <div className='text-center px-6 sm:px-8 md:px-12'>
        <h1 className='text-4xl sm:text-5xl font-bold text-red-600 mb-6'>
          404 - Page Not Found
        </h1>
        <p className='text-lg sm:text-xl mb-6'>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to='/'
          className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
