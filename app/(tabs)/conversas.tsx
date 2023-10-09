import { View } from 'react-native'
import tw from '@/lib/tailwind'
import React, { useContext, useState } from 'react'
import { useDeviceContext } from 'twrnc'
import useLoading from '@/hooks/useLoading'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import ConversaCard from '@/components/ConversaCard'
import getUserConversas from '@/api/getUserConversas'
import compareDate from '@/utils/compareDate'
import { HomeContext } from '@/contexts/HomeContext'
import handleLogout from '@/utils/handleLogout'
import { router } from 'expo-router'
import CustomSearchBar from '@/components/CustomSearchBar'
import removerAcentos from '@/utils/removerAcentosString'

export default function ConversasScreen() {
  useDeviceContext(tw)
  const context = useContext(HomeContext)
  const { conversas, setConversas } = context
  const { loading, startLoading, stopLoading } = useLoading()
  const [refreshing, setRefreshing] = useState(false)
  const [textFilter, setTextFilter] = useState('')

  async function getConversas() {
    setRefreshing(true)
    const conversas = await getUserConversas()
    if (conversas) {
      setConversas(conversas)
    } else {
      await handleLogout(context)
      router.replace('/')
    }
    setRefreshing(false)
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getConversas()
  //   }, 15000)
  //   return () => clearInterval(interval)
  // }, [conversas])

  function filtrarConversas() {
    if (!textFilter) {
      return conversas // Retorna todos os usuários se a pesquisa estiver vazia
    }

    const pesquisaMinuscula = removerAcentos(textFilter).toLowerCase()

    return conversas.filter((conversa) => {
      const nomeMinusculo = removerAcentos(
        conversa.pessoaVirtual.nome,
      ).toLowerCase()
      const profissaoMinusculo = conversa.pessoaVirtual.profissao.toLowerCase()

      // Verifica se o texto de pesquisa está incluído no nome ou no googleEmail
      return (
        nomeMinusculo.includes(pesquisaMinuscula) ||
        profissaoMinusculo.includes(pesquisaMinuscula)
      )
    })
  }

  return (
    <View style={tw`flex-1 bg-light-c60 dark:bg-dark-c60`}>
      <CustomSearchBar
        text={textFilter}
        setText={setTextFilter}
        placeholder="Buscar conversa"
      />

      <ScrollView
        style={tw`flex-1 `}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getConversas} />
        }
      >
        <View style={tw`flex-1 pb-14`}>
          {conversas &&
            filtrarConversas()
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
    </View>
  )
}
