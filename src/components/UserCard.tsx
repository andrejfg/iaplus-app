import tw from '@/lib/tailwind'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { useDeviceContext } from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import { router } from 'expo-router'

interface UserCardProps {
  user: PessoaFisicaAdmin
}

export default function UserCard({ user }: UserCardProps) {
  useDeviceContext(tw)
  return (
    <View style={tw`mb-0.5 h-20 w-full flex-row justify-between bg-slate-50`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          router.push(`/usuarios/${user.id}`)
        }}
        style={tw`flex-1 flex-row items-center gap-4  px-4`}
      >
        {user.avatarUrl ? (
          <Image
            style={tw`h-12 w-12 rounded-full`}
            source={{ uri: user.avatarUrl }}
            alt={user.nome}
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
            {user.nome}
          </Text>
          <Text style={tw`text-sm text-light-c10 dark:text-dark-c10`}>
            {user.googleEmail}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
