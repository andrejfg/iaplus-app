import Profile from '@/components/Profile'
import { removeToken } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import tw from '@/lib/tailwind'
import { User, getUserInfo } from '@/utils/getUserInfo'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeviceContext } from 'twrnc'

export default function ConfiguracaoScreen() {
  useDeviceContext(tw)
  const { loading: loadingLogout, startLoading: startLoadingLogout } =
    useLoading()
  const {
    loading: loadingUserInfo,
    startLoading: startLoadingUserInfo,
    stopLoading: stopLoadingUserInfo,
  } = useLoading()
  const [user, setUser] = useState<User | null>(null)

  async function handleLogout() {
    startLoadingLogout()
    await removeToken()
    router.replace('/')
  }

  function printUser() {
    console.log(user)
  }

  useEffect(() => {
    async function setUserInfo() {
      setUser(await getUserInfo())
    }
    startLoadingUserInfo()
    setUserInfo()
    stopLoadingUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={tw`flex-1 items-center justify-center gap-8  pt-14`}>
      <Profile user={user}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={tw`h-10 w-24 items-center justify-center rounded-full border border-light-c10 px-8 dark:border-dark-c10`}
        >
          {!loadingLogout ? (
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
