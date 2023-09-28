import { View } from 'react-native'
import tw from '@/lib/tailwind'
import React, { useContext, useEffect, useState } from 'react'
import { useDeviceContext } from 'twrnc'
import useLoading from '@/hooks/useLoading'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import ConversaCard from '@/components/ConversaCard'
import getUserConversas from '@/api/getUserConversas'
import Toast from 'react-native-root-toast'
import compareDate from '@/utils/compareDate'
import { HomeContext } from '@/contexts/HomeContext'

export default function ConversasScreen() {
  useDeviceContext(tw)
  const { conversas, setConversas } = useContext(HomeContext)
  const { loading, startLoading, stopLoading } = useLoading()
  const [refreshing, setRefreshing] = useState(false)

  async function getConversas() {
    setRefreshing(true)
    const conversas = await getUserConversas().catch(() => {
      Toast.show('Erro ao recuperar a lista de conversas.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
    })
    if (conversas) {
      setConversas(conversas)
    }
    setRefreshing(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getConversas()
    }, 15000)
    return () => clearInterval(interval)
  }, [conversas])

  return (
    <ScrollView
      style={tw`flex-1 bg-light-c60 dark:bg-dark-c60`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getConversas} />
      }
    >
      <View style={tw`flex-1 pb-14`}>
        {conversas &&
          conversas
            .filter((conversa) => conversa.ativo)
            .sort((a, b) => compareDate(a.DataInicio, b.DataInicio))
            .map((conversa) => (
              <ConversaCard
                conversa={conversa}
                loading={loading || refreshing}
                startLoading={startLoading}
                stopLoading={stopLoading}
                key={conversa.id}
              />
            ))}
      </View>
    </ScrollView>
  )
}
