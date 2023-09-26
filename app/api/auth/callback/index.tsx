import googleToken from '@/api/google/googleToken'
import { setToken } from '@/hooks/useAuth'
import tw from '@/lib/tailwind'
import { redirect_uri } from '@/utils/getGoogleOAuthURL'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function GoogleAuth() {
  const [carregando, setCarregando] = useState(true)
  const { code }: { code: string } = useLocalSearchParams()

  useEffect(() => {
    if (code) {
      async function getGoogleToken() {
        try {
          const { token } = await googleToken({ code, redirect_uri })
          setToken(token)
          router.replace('/')
        } catch (e) {
          router.replace('/')
        }
      }
      getGoogleToken()
    }
  }, [code])
  return (
    carregando && (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size={70} />
      </View>
    )
  )
}
