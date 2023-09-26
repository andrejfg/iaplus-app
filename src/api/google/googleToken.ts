import { TokenResponse } from 'expo-auth-session'
import { api } from '../api'
interface googleTokenProps {
  code?: string
  redirect_uri?: string
  accessToken?: string
}

export default async function googleToken({
  code,
  redirect_uri,
  accessToken,
}: googleTokenProps) {
  const registerResponse = await api.post('/auth/google', {
    code,
    redirect_uri,
    accessToken,
  })
  return registerResponse.data
}
