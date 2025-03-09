import React from 'react'

const TaskItem = ({ task, toggleComplete, handleDelete }) => {
  return (
    <li className='flex justify-between items-start p-4 bg-gray-100 rounded-lg shadow-md'>
      <div className='flex items-start space-x-4 flex-1'>
        {/* Circle indicating completion status */}
        <button
          onClick={() => toggleComplete(task.id, task.is_completed)}
          className={`w-6 h-6 rounded-full border-2 ${
            task.is_completed
              ? 'bg-indigo-600 border-indigo-600'
              : 'bg-transparent border-gray-500'
          }`}
        />
        
        <div className='flex flex-col'>
          {/* Task Title */}
          <span
            className={`text-lg ${task.is_completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </span>
          {/* Task creation date */}
          <span className="text-sm text-gray-500 mt-1">
            {new Date(task.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Delete Button aligned to the right */}
      <button
        onClick={() => handleDelete(task.id)}
        className='text-red-600 hover:text-red-800 focus:outline-none'
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
