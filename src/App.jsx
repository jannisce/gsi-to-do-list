import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'

import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'

import NotFoundPage from './pages/NotFoundPage'

const App = () => {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />

      <Route path='/' element={<HomePage />} />

      <Route path='/todo' element={<TodoPage />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
