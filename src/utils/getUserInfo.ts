import { getToken } from '@/hooks/useAuth'
import decode from 'jwt-decode'

export interface User {
  sub: string
  name: string
  avatarUrl: string
  googleEmail: string
  administrador: boolean
}

export async function getUserInfo() {
  const token = await getToken()
  const user: User = decode(token ?? '')
  return user
}
