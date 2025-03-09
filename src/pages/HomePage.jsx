import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-white p-8 sm:p-6 lg:p-6'>
      {/* First Section */}
      <section className='min-h-svh flex flex-col justify-center items-center text-center'>
        <img
          src='https://png.pngtree.com/png-clipart/20191120/original/pngtree-to-do-list-icon-cartoon-style-png-image_5080528.jpg'
          alt='Todo List App'
          className='w-40 h-40 sm:w-64 sm:h-64 mb-8 object-contain mix-blend-multiply bg-transparent'
        />
        <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>
          Welcome to Your To-Do List App
        </h1>
        <p className='text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl'>
          A simple and powerful tool to manage your tasks and stay organized.
          With just a few clicks, you can add, remove, and track your daily
          tasks effortlessly.
        </p>
        <Link
          to='/login'
          className='bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-200'
        >
          Get Started
        </Link>
      </section>

      {/* Second Section */}
      <section className='min-h-svh flex flex-col justify-center items-center text-center'>
        <div className='w-40 h-40 sm:w-64 sm:h-64 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-600'>
          <img
            src='/me.png'
            alt='Your Photo'
            className='w-full h-full object-cover'
          />
        </div>
        <p className='text-xl sm:text-2xl text-gray-700 max-w-2xl'>
          Hi, I'm Javier! I'm passionate about creating apps that help people
          stay organized and productive. Feel free to explore my To-Do List app
          and make it part of your daily routine!
        </p>
      </section>
    </div>
  )
}

export default HomePage
