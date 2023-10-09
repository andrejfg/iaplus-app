import { getToken } from '@/hooks/useAuth'
import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://api.iaplus.io',
  baseURL: 'http://192.168.15.12:3333',
})

api.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = await getToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)
