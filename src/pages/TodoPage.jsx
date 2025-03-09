import React, { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks'
import { useAuth } from '../context/AuthContext'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'
import LogoutButton from '../components/LogoutButton'

const TodoPage = () => {
  const { user } = useAuth()

  const [tasks, setTasks] = useState([])

  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState()

  const [limit] = useState(4)
  const [order, setOrder] = useState('-created_at') // Default sort order: descending by created_at

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks({ limit, page, order }) // Fetch tasks with pagination and sorting
        setTasks(response.data) // Update tasks state
        setHasNextPage(response.meta.next ? true : false) // Update hasNextPage state
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }
    fetchTasks()
  }, [page, order, limit])

  const handleCreate = async (newTodo) => {
    try {
      const response = await createTask({
        user_email: user.email,
        title: newTodo,
      })

      const newTaskData = {
        id: response.data.id,
        title: newTodo,
        is_completed: false,
        created_at: Date.now(),
      }

      // Add the new task to the list of tasks
      setTasks((prevTasks) => {
        // Insert the new task, then sort the tasks based on the current order
        const updatedTasks = [...prevTasks, newTaskData]

        // Sort tasks based on the selected `order` (e.g., by `title`, `id`, etc.)
        updatedTasks.sort((a, b) => {
          if (order.includes('title')) {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()
            return order.startsWith('-')
              ? titleB.localeCompare(titleA) // Sort in descending order
              : titleA.localeCompare(titleB) // Sort in ascending order
          }

          if (order.includes('created_at')) {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return order.startsWith('-') ? dateB - dateA : dateA - dateB
          }

          if (order.includes('is_completed')) {
            return order.startsWith('-')
              ? b.is_completed - a.is_completed
              : a.is_completed - b.is_completed
          }

          return 0
        })

        if (updatedTasks.length > limit) {
          setHasNextPage(true)
        }
        // Now ensure we respect the page limit of 5 tasks
        return updatedTasks.slice(0, limit)
      })
    } catch (error) {
      console.error('Failed to create todo:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      // Delete the task
      await deleteTask(id)

      // Update the tasks list after deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))

      // If the last task on the page is deleted, move to the previous page
      if (tasks.length == 1) {
        setPage(setPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1)))
      } else {
        // Re-fetch tasks to ensure the pagination and task list are correct
        const response = await getTasks({ limit, page, order })
        setTasks(response.data) // Update tasks state
        setHasNextPage(response.meta.next ? true : false) // Update hasNextPage state
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const toggleComplete = async (id, is_completed) => {
    try {
      await updateTask(id) // Assuming this API call updates the task completion status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, is_completed: !is_completed } : task
        )
      )
    } catch (error) {
      console.error('Failed to toggle task completion:', error)
    }
  }

  const handleSortChange = (field) => {
    setOrder((prevOrder) =>
      prevOrder.startsWith('-') ? `${field}` : `-${field}`
    )
    setPage(1)
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center text-blue-600 mb-8'>
        {user.email.split('@')[0]} To-Do List
      </h1>

      {/* Add Task Component */}
      <AddTask handleCreate={handleCreate} />

      {/* Sorting Controls */}
      <div className='flex flex-wrap justify-center space-x-4 mb-6'>
        <button
          onClick={() => handleSortChange('title')}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md mb-2 sm:mb-0 ${
            order.includes('title') ? 'bg-blue-800' : ''
          }`}
        >
          Title
          {order.includes('title') && (
            <span className='ml-2'>{order.startsWith('-') ? '↓' : '↑'}</span>
          )}
        </button>
        <button
          onClick={() => handleSortChange('is_completed')}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md mb-2 sm:mb-0 ${
            order.includes('is_completed') ? 'bg-blue-800' : ''
          }`}
        >
          Completion
          {order.includes('is_completed') && (
            <span className='ml-2'>{order.startsWith('-') ? '↓' : '↑'}</span>
          )}
        </button>
        <button
          onClick={() => handleSortChange('created_at')}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md mb-2 sm:mb-0 ${
            order.includes('created_at') ? 'bg-blue-800' : ''
          }`}
        >
          Created At
          {order.includes('created_at') && (
            <span className='ml-2'>{order.startsWith('-') ? '↓' : '↑'}</span>
          )}
        </button>
      </div>

      {/* Task List Component or No Tasks Message */}
      <div className='overflow-auto' style={{ maxHeight: '400px' }}>
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
        />
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-between mt-4'>
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-md ${
            !hasNextPage
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
      <div className='flex justify-center'>
        <LogoutButton />
      </div>
    </div>
  )
}

export default TodoPage
