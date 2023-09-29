import { HomeContext } from '@/contexts/HomeContext'
import { removeToken } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import tw from '@/lib/tailwind'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { router } from 'expo-router'
import { useContext } from 'react'
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import { useDeviceContext } from 'twrnc'
import Profile from './Profile'

export default function DrawerContent() {
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
    <DrawerContentScrollView>
      <Profile user={user}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={tw`mt-8 h-10 w-24 items-center justify-center rounded-full border border-light-c10 px-8 dark:border-dark-c10`}
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
    </DrawerContentScrollView>
  )
}
