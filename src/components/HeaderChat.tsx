import tw from '@/lib/tailwind'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeviceContext } from 'twrnc'
import deleteConversaByID from '@/api/deleteConversaByID'
import useLoading from '@/hooks/useLoading'
import Toast from 'react-native-root-toast'
import React, { useContext } from 'react'
import Header from './Header'
import { HomeContext } from '@/contexts/HomeContext'

interface HeaderChatProps {
  assistente?: AssistenteVirtual
  conversaId?: string
  digitando: boolean
}
export default function HeaderChat({
  assistente,
  conversaId,
  digitando,
}: HeaderChatProps) {
  useDeviceContext(tw)
  const { loading, startLoading, stopLoading } = useLoading()
  const { setConversas } = useContext(HomeContext)
  async function removeChat() {
    if (conversaId) {
      startLoading()
      await deleteConversaByID({ id: conversaId }).catch(() => {
        Toast.show('Erro ao excluir conversa.', {
          position: 50,
          backgroundColor: 'red',
          duration: Toast.durations.SHORT,
        })
      })
      setConversas((prev) =>
        prev.filter((conversa) => conversa.id !== conversaId),
      )
      stopLoading()
    }
    router.replace('/conversas')
  }
  return (
    <Header>
      <View style={tw`flex-1 flex-row gap-4 `}>
        {assistente && assistente.avatarUrl ? (
          <Image
            style={tw`h-12 w-12 rounded-full`}
            source={{ uri: assistente.avatarUrl }}
            alt={assistente.nome}
          />
        ) : (
          <View
            style={tw`h-12 w-12 items-center justify-center rounded-full bg-slate-200`}
          >
            <FontAwesome
              style={tw`text-2xl text-light-c10 dark:text-dark-c10`}
              name="user"
            />
          </View>
        )}
        {assistente && (
          <View>
            <Text
              style={tw`text-lg font-bold text-light-c10 dark:text-dark-c10`}
            >
              {assistente.nome}
            </Text>
            <Text style={tw`text-sm text-light-c10 dark:text-dark-c10`}>
              {!digitando ? assistente.profissao : 'Digitando...'}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={tw`h-full w-10 items-center justify-center`}
        activeOpacity={0.7}
        disabled={loading}
        onPress={removeChat}
      >
        <FontAwesome
          style={tw`text-custom-red-100 dark:text-custom-red-50`}
          name="trash"
          size={20}
        />
      </TouchableOpacity>
    </Header>
  )
}
