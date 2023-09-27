import tw from '@/lib/tailwind'
import Conversa from '@/types/Conversa'
import { useState } from 'react'
import { View, Text, LayoutChangeEvent } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'expo-image'
import { useDeviceContext } from 'twrnc'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import compareDate from '@/utils/compareDate'

interface ConversaCardProps {
  conversa: Conversa
  loading: boolean
  startLoading: () => void
  stopLoading: () => void
}

export default function ConversaCard({
  conversa,
  loading,
  startLoading,
  stopLoading,
}: ConversaCardProps) {
  useDeviceContext(tw)
  const lastMessage = conversa.Mensagem.sort((a, b) =>
    compareDate(b.dataHora, a.dataHora),
  )[0].texto

  const [messageFormated, setMessageFormated] = useState<string>('')

  function formatText(e: LayoutChangeEvent) {
    const { width } = e.nativeEvent.layout
    setMessageFormated(() => {
      const medida = 7.5
      if (lastMessage.length > width / medida)
        return lastMessage.substring(0, width / medida) + '...'
      else return lastMessage
    })
  }

  function goToChat() {
    startLoading()
    router.push(`/chat/${conversa.id}`)
    stopLoading()
  }

  return (
    <TouchableOpacity
      onPress={goToChat}
      disabled={loading}
      style={tw`mb-0.5 h-20 w-full flex-row items-center gap-4 bg-light-c60 px-4 dark:bg-dark-c60`}
    >
      {conversa.pessoaVirtual.avatarUrl ? (
        <Image
          style={tw`h-12 w-12 rounded-full`}
          source={{ uri: conversa.pessoaVirtual.avatarUrl }}
          alt={conversa.pessoaVirtual.nome}
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
      <View onLayout={formatText} style={tw`w-full`}>
        <Text style={tw`text-lg font-bold text-light-c10 dark:text-dark-c10`}>
          {conversa.pessoaVirtual.nome}
        </Text>
        <Text style={tw`text-sm text-light-c10 dark:text-dark-c10`}>
          {messageFormated}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
