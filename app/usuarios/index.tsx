import getUsersAdmin from '@/api/getUsersAdmin'
import CustomSearchBar from '@/components/CustomSearchBar'
import Header from '@/components/Header'
import UserCard from '@/components/UserCard'
import { HomeContext } from '@/contexts/HomeContext'
import tw from '@/lib/tailwind'
import compareDate from '@/utils/compareDate'
import handleLogout from '@/utils/handleLogout'
import removerAcentos from '@/utils/removerAcentosString'
import { router } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import Toast from 'react-native-root-toast'
import { useDeviceContext } from 'twrnc'

export default function ConfiguracaoScreen() {
  useDeviceContext(tw)
  const context = useContext(HomeContext)
  const user = context.user
  const { users, setUsers } = context
  const [refreshing, setRefreshing] = useState(false)
  const [filtroPesquisa, setFiltroPesquisa] = useState<string>('')

  async function getUsers() {
    setRefreshing(true)
    if (user && user.administrador) {
      setUsers(await getUsersAdmin())
    } else {
      Toast.show('Acesso não autorizado.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })

      await handleLogout(context)
      router.replace('/')
    }
    setRefreshing(false)
  }
  // useEffect(() => {
  //   getUsers()
  //   const interval = setInterval(() => {
  //     getUsers()
  //   }, 15000)
  //   return () => clearInterval(interval)
  // }, [])

  function filtrarUsuarios() {
    if (!filtroPesquisa) {
      return users || [] // Retorna todos os usuários se a pesquisa estiver vazia
    }

    const pesquisaMinuscula = removerAcentos(filtroPesquisa).toLowerCase()

    if (users)
      return users.filter((user) => {
        const nomeMinusculo = removerAcentos(user.nome).toLowerCase()
        const googleEmailMinusculo = user.googleEmail?.toLowerCase() || ''

        // Verifica se o texto de pesquisa está incluído no nome ou no googleEmail
        return (
          nomeMinusculo.includes(pesquisaMinuscula) ||
          googleEmailMinusculo.includes(pesquisaMinuscula)
        )
      })
    else return []
  }

  return (
    <View style={tw`flex-1 bg-light-c60 dark:bg-dark-c60`}>
      <Header
        style={tw`bg-light-c30 dark:bg-dark-c30`}
        iconStyle={tw`text-2xl text-light-c10_alt`}
      >
        <View style={tw`flex-1 justify-center`}>
          <Text
            style={tw`text-xl font-semibold text-light-c10_alt dark:text-dark-c10`}
          >
            Usuários
          </Text>
        </View>
      </Header>
      <CustomSearchBar
        text={filtroPesquisa}
        setText={setFiltroPesquisa}
        placeholder="Buscar usuário"
      />
      <ScrollView
        style={tw`flex-1 `}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getUsers} />
        }
      >
        <View style={tw`flex-1`}>
          {users && users.length > 0 ? (
            filtrarUsuarios()
              .sort((userA, userB) =>
                compareDate(userA.createdAt, userB.createdAt),
              )
              .map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </View>
  )
}
