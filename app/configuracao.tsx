import Profile from '@/components/Profile'
import { HomeContext } from '@/contexts/HomeContext'
import { removeToken } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import { useContext } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeviceContext } from 'twrnc'

export default function ConfiguracaoScreen() {
  useDeviceContext(tw)
  const { loading, startLoading, stopLoading } = useLoading()
  const { user } = useContext(HomeContext)

  async function handleLogout() {
    startLoading()
    await removeToken()
    stopLoading()
    router.replace('/')
  }

  return (
    <View
      style={tw`flex-1 items-center justify-center gap-8 bg-light-c60 dark:bg-dark-c60`}
    >
      <Profile user={user}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={tw`h-10 w-24 items-center justify-center rounded-full border border-light-c10 px-8 dark:border-dark-c10`}
        >
          {!loading ? (
            <Text
              style={tw`text-center text-xl font-semibold text-light-c10 dark:text-dark-c10`}
            >
              Sair
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      </Profile>
    </View>
  )
}
