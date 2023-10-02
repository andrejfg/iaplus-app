import toogleAdminPermission from '@/api/toogleAdminPermission'
import Header from '@/components/Header'
import ProfileUserDetails from '@/components/ProfileUserDetails'
import { HomeContext } from '@/contexts/HomeContext'
import tw from '@/lib/tailwind'
import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import { router, useGlobalSearchParams } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Toast from 'react-native-root-toast'
import { useDeviceContext } from 'twrnc'

export default function UsersDetailsScreen() {
  const { id }: { id: string } = useGlobalSearchParams()
  const { users, user: selfUser } = useContext(HomeContext)
  const [user, setUser] = useState<PessoaFisicaAdmin>()
  useDeviceContext(tw)
  useEffect(() => {
    if (users && selfUser && selfUser.administrador) {
      const user = users.find((user) => user.id === id)
      // console.log(user)
      setUser(user)
    } else {
      Toast.show('Precisa estar autenticado.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
      router.replace('/')
    }
  }, [])

  async function handleChangeAdminPermission() {
    if (user) {
      const newUser = await toogleAdminPermission({
        id: user.id,
      })
      setUser((prev) => {
        return {
          ...prev,
          ...newUser,
        }
      })
    }
  }
  return (
    <View style={tw`flex-1 items-center justify-center gap-8`}>
      {user ? (
        <>
          <Header style={tw`z-10`}>
            <Text style={tw`text-lg font-semibold`}>{`Detalhes do ${
              user.nome.split(' ')[0]
            }`}</Text>
          </Header>
          <ProfileUserDetails user={user} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleChangeAdminPermission}
            style={tw`my-4 rounded-full bg-light-c30 px-4 py-2 dark:bg-dark-c30`}
          >
            <Text style={tw`text-base text-light-c10_alt`}>
              {user.administrador
                ? 'Tornar Usuário Teste'
                : 'Tornar Administrador'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}
