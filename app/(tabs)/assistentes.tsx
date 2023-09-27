import { View } from 'react-native'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import AssistenteCard from '@/components/AssistenteCard'
import { useDeviceContext } from 'twrnc'
import Conversa from '@/types/Conversa'
import useLoading from '@/hooks/useLoading'
import Toast from 'react-native-root-toast'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { api } from '@/api/api'
import getAssistentesVirtuais from '@/api/getAssistentesVirtuais'
import AddAssistente from '@/components/AddAssistente'
import { HomeContext } from '@/contexts/HomeContext'

export default function AssistentesScreen() {
  useDeviceContext(tw)
  const {
    user: userInfo,
    assistentes,
    setAssistentes,
    setConversas,
  } = useContext(HomeContext)
  const { loading, startLoading, stopLoading } = useLoading()
  const [refreshing, setRefreshing] = useState(false)

  async function getAssistentes() {
    setRefreshing(true)
    const assistentes = await getAssistentesVirtuais().catch(() => {
      Toast.show('Erro ao recuperar a lista de assistentes.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
    })
    if (assistentes) {
      setAssistentes(assistentes)
    }
    setRefreshing(false)
  }
  async function getNewChat(virtualId: string) {
    startLoading()
    const newChat: Conversa = await api
      .post('/conversas', { virtualId })
      .then((response) => response.data)
      .catch(() => {
        Toast.show('Erro ao criar nova conversa.', {
          position: 50,
          backgroundColor: 'red',
          duration: Toast.durations.SHORT,
        })
        stopLoading()
      })
    console.log(newChat)
    setConversas((prev) => [...prev, newChat])
    stopLoading()
    router.push(`/chat/${newChat.id}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getAssistentes()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={tw`flex-1`}>
      <ScrollView
        style={tw`flex-1 bg-light-c60  pt-14 dark:bg-dark-c60`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAssistentes} />
        }
      >
        <View style={tw`flex-1  pb-14 `}>
          {assistentes &&
            assistentes.map((assistente) => (
              <AssistenteCard
                assistente={assistente}
                handleCardClick={getNewChat}
                disable={loading || refreshing}
                key={assistente.id}
              />
            ))}
        </View>
      </ScrollView>
      {userInfo && userInfo.administrador && <AddAssistente />}
    </View>
  )
}
