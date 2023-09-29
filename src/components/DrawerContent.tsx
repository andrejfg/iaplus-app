import { HomeContext } from '@/contexts/HomeContext'
import { removeToken } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import tw from '@/lib/tailwind'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { router } from 'expo-router'
import { useContext } from 'react'
import { ActivityIndicator, TouchableOpacity, Text, View } from 'react-native'
import { useDeviceContext } from 'twrnc'
import Profile from './Profile'

export default function DrawerContent({
  navigation,
}: DrawerContentComponentProps) {
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
        <View style={tw`mt-8 flex-1 gap-8`}>
          {user && user.administrador && (
            <TouchableOpacity
              onPress={() => {
                navigation.closeDrawer()
                router.push('/users')
              }}
              style={tw`items-center justify-center rounded-full border bg-light-c10 px-4 py-1.5 dark:bg-dark-c10`}
            >
              <Text
                style={tw`text-center text-lg font-semibold text-light-c10_alt dark:text-dark-c10`}
              >
                Usuários
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLogout}
            style={tw`items-center justify-center rounded-full border border-light-c10 px-4 py-1.5 dark:border-dark-c10`}
          >
            {!loading ? (
              <Text
                style={tw`text-center text-lg font-semibold text-light-c10 dark:text-dark-c10`}
              >
                Sair
              </Text>
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
        </View>
      </Profile>
    </DrawerContentScrollView>
  )
}
