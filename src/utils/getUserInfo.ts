import { getToken } from '@/hooks/useAuth'
import User from '@/types/User'
import decode from 'jwt-decode'

export default async function getUserInfo() {
  const token = await getToken()
  const user: User = decode(token ?? '')
  return user
}
