import axios from 'axios'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Add a request interceptor to include the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the JWT from localStorage
    const token = localStorage.getItem('jwt')

    if (token) {
      // If the token exists, set the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
