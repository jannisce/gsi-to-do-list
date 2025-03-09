import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'

import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'

import NotFoundPage from './pages/NotFoundPage'

import { useAuth } from './context/AuthContext'

const App = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />

      <Route path='/' element={<HomePage />} />

      {user && 
      <Route path='/todo' element={<TodoPage />} />
      }

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
