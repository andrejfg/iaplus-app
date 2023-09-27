import { useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import { setToken } from './useAuth'
import googleToken from '@/api/google/googleToken'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export const useGoogleAuth = () => {
  const [isAuth, setIsAuth] = useState(false)

  const [, response, signInWithGoogle] = Google.useAuthRequest({
    androidClientId:
      '944252748541-mq0tmbc5jl9toes68u0ltssg6ivdbnce.apps.googleusercontent.com',
    iosClientId:
      '944252748541-9iru6ore1c1d1q1npob9f07573qncg15.apps.googleusercontent.com',
    webClientId:
      '944252748541-904qvd3k7egsclvmkbrjcb2v3cs7gg6m.apps.googleusercontent.com',
  })

  async function handleGoogleOAuthCode(accessToken: string) {
    const { token } = await googleToken({ accessToken })
    setToken(token)
    setIsAuth(true)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication) {
      handleGoogleOAuthCode(response.authentication.accessToken)
    }
  }, [response])

  return { isAuth, signInWithGoogle }
}
