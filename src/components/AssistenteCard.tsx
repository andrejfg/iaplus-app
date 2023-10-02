import tw from '@/lib/tailwind'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { useDeviceContext } from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useContext, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { HomeContext } from '@/contexts/HomeContext'
import { router } from 'expo-router'

interface AssistenteCardProps {
  assistente: AssistenteVirtual
  handleCardClick: (virtualId: string) => void
  disable: boolean
  handleDelete: () => void
}

export default function AssistenteCard({
  assistente,
  disable,
  handleCardClick,
  handleDelete,
}: AssistenteCardProps) {
  const [cardVisible, setCardVisible] = useState(true)
  useDeviceContext(tw)
  const { user, setConversas, setAssistentes } = useContext(HomeContext)

  function handleEdit() {
    router.push(`/editAssistente/${assistente.id}`)
  }

  function handleDeleteCard() {
    setCardVisible(false)
    setConversas((prev) =>
      prev.filter((conversa) => conversa.virtualId !== assistente.id),
    )
    setAssistentes((prev) =>
      prev.filter((assistenteGeral) => assistenteGeral.id !== assistente.id),
    )
    handleDelete()
  }

  return (
    cardVisible && (
      <View style={tw`mb-0.5 h-20 w-full flex-row justify-between bg-slate-50`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCardClick(assistente.id)}
          disabled={disable}
          style={tw`flex-1 flex-row items-center gap-4  px-4`}
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
          <View style={[user?.administrador && tw`w-3/4`]}>
            <Text
              style={tw`text-lg font-bold text-light-c10 dark:text-dark-c10`}
            >
              {assistente.nome}
            </Text>
            <Text style={tw`text-sm text-light-c10 dark:text-dark-c10`}>
              {assistente.profissao}
            </Text>
          </View>
        </TouchableOpacity>
        {user?.administrador && (
          <View
            style={tw`absolute right-0 w-1/4 flex-row items-center justify-center`}
          >
            <View style={tw`h-10 w-10`}>
              <TouchableOpacity
                onPress={handleEdit}
                activeOpacity={0.7}
                style={tw`h-full w-full items-center justify-center `}
              >
                <FontAwesome style={tw`text-xl`} name="pencil" />
              </TouchableOpacity>
            </View>
            <View style={tw`h-16 w-16`}>
              <TouchableOpacity
                onPress={handleDeleteCard}
                activeOpacity={0.7}
                style={tw`h-full w-full items-center justify-center `}
              >
                <FontAwesome
                  style={tw`text-xl text-custom-red-50`}
                  name="trash"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  )
}
