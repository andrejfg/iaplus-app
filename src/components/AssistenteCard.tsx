import tw from '@/lib/tailwind'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { useDeviceContext } from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface AssistenteCardProps {
  assistente: AssistenteVirtual
  handleCardClick: (virtualId: string) => void
  disable: boolean
}

export default function AssistenteCard({
  assistente,
  disable,
  handleCardClick,
}: AssistenteCardProps) {
  useDeviceContext(tw)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleCardClick(assistente.id)}
      disabled={disable}
      style={tw`mb-0.5 h-20 w-full flex-row items-center gap-4 bg-slate-50 px-4`}
    >
      {assistente.avatarUrl ? (
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
      <View>
        <Text style={tw`text-lg font-bold text-light-c10 dark:text-dark-c10`}>
          {assistente.nome}
        </Text>
        <Text style={tw`text-sm text-light-c10 dark:text-dark-c10`}>
          {assistente.profissao}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
