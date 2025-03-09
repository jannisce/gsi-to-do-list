import React, { useState } from 'react'

const AddTask = ({ handleCreate }) => {
  const [newTodo, setNewTodo] = useState('')
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setNewTodo(e.target.value)
    if (error) {
      setError('')
    }
  }

  const onAddTask = () => {
    if (newTodo) {
      handleCreate(newTodo)
      setNewTodo('') // Reset the input after adding the task
    } else {
      setError('Please enter a title for a new task')
    }
  }

  // Handle Enter key press
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAddTask()
    }
  }

  return (
    <>
      <div className='flex items-center space-x-4 mb-2'>
        <input
          type='text'
          value={newTodo}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder='Add a new task'
          className='w-3/4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={onAddTask}
          className='w-1/3 p-3 border-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Add Task
        </button>
      </div>
      <div className='flex items-center'>
        {error && (
          <div className='text-center text-red-600'>
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default AddTask
