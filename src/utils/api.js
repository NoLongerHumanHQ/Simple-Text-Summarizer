import axios from 'axios'

/**
 * Create an API client with default configuration
 */
export const createClient = (baseURL, options = {}) => {
  const client = axios.create({
    baseURL,
    timeout: options.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  // Add request interceptor
  client.interceptors.request.use(
    (config) => {
      // You can add request transformation here
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Add response interceptor
  client.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle API errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error Response:', error.response.data)
        return Promise.reject(
          new Error(error.response.data.message || 'An error occurred with the API')
        )
      } else if (error.request) {
        // The request was made but no response was received
        console.error('API No Response:', error.request)
        return Promise.reject(
          new Error('No response received from the server. Please check your internet connection.')
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('API Request Error:', error.message)
        return Promise.reject(new Error('Error setting up the request. Please try again.'))
      }
    }
  )

  return client
}

/**
 * Create a throttled function that limits API calls
 */
export const createThrottledFunction = (fn, limit = 5, interval = 60000) => {
  let calls = 0
  let lastReset = Date.now()
  
  return async (...args) => {
    const now = Date.now()
    
    if (now - lastReset > interval) {
      calls = 0
      lastReset = now
    }
    
    if (calls >= limit) {
      throw new Error(`Rate limit exceeded. Try again in ${Math.ceil((lastReset + interval - now) / 1000)} seconds.`)
    }
    
    calls++
    return await fn(...args)
  }
} 