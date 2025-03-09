import React from 'react'
import TaskItem from './TaskItem'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TaskList = ({ tasks, toggleComplete, handleDelete }) => {
  const [parent] = useAutoAnimate()

  return (
    <div className='space-y-4' ref={parent}>
      {tasks.length === 0 ? (
        <p className='text-center text-gray-500'>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
