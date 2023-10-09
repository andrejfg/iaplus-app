import { View } from 'react-native'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import { useContext, useState } from 'react'
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
import deleteAssistenteVirtual from '@/api/deleteAssistenteVirtual'
import handleLogout from '@/utils/handleLogout'
import CustomSearchBar from '@/components/CustomSearchBar'
import removerAcentos from '@/utils/removerAcentosString'

export default function AssistentesScreen() {
  useDeviceContext(tw)
  const context = useContext(HomeContext)
  const { user: userInfo, assistentes, setAssistentes, setConversas } = context
  const { loading, startLoading, stopLoading } = useLoading()
  const [refreshing, setRefreshing] = useState(false)
  const [textFilter, setTextFilter] = useState('')

  async function getAssistentes() {
    setRefreshing(true)
    const assistentes = await getAssistentesVirtuais()
    if (assistentes) {
      setAssistentes(assistentes)
    } else {
      await handleLogout(context)
      router.replace('/')
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
    setConversas((prev) => [...prev, newChat])
    stopLoading()
    router.push(`/chat/${newChat.id}`)
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getAssistentes()
  //   }, 15000)
  //   return () => clearInterval(interval)
  // }, [])

  async function handleDelete(id: string) {
    await deleteAssistenteVirtual(id)
    getAssistentes()
  }

  function filtrarAssistentes() {
    if (!textFilter) {
      return assistentes // Retorna todos os usuários se a pesquisa estiver vazia
    }

    const pesquisaMinuscula = removerAcentos(textFilter).toLowerCase()

    return assistentes.filter((assistente) => {
      const nomeMinusculo = removerAcentos(assistente.nome).toLowerCase()
      const profissaoMinusculo = assistente.profissao.toLowerCase()

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
        placeholder="Buscar assistente"
      />
      <ScrollView
        style={tw`flex-1 `}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAssistentes} />
        }
      >
        <View style={tw`flex-1  pb-14 `}>
          {assistentes &&
            filtrarAssistentes()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((assistente) => (
                <AssistenteCard
                  handleDelete={() => handleDelete(assistente.id)}
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
