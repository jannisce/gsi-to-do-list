import axiosInstance from './axiosInstance'

// Function to get all to-do items with pagination and sorting
export const getTasks = async ({ limit, page, order }) => {
  try {
    const response = await axiosInstance.get('/tasks', {
      params: {
        limit,
        page,
        order
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

// Function to create a new to-do item
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('/tasks/create', taskData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Function to update an existing to-do item
export const updateTask = async (todoId) => {
  try {
    const response = await axiosInstance.patch(`/tasks/update/${todoId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Function to delete a to-do item
export const deleteTask = async (todoId) => {
  try {
    const response = await axiosInstance.delete(`/tasks/delete/${todoId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
