import tw from '@/lib/tailwind'
import User from '@/types/User'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { View, Text } from 'react-native'
import { useDeviceContext } from 'twrnc'

interface ProfileProps {
  user: User | undefined
  children?: React.JSX.Element
}

export default function Profile({ user, children }: ProfileProps) {
  useDeviceContext(tw)
  return (
    <View
      style={tw`w-full flex-1 items-center gap-8 bg-light-c60 pb-8 pt-28 dark:bg-dark-c60`}
    >
      <View
        style={tw`absolute top-0 h-48 w-full bg-light-c30 dark:bg-dark-c30`}
      />
      <View style={tw`w-full flex-1 items-center gap-8`}>
        <View
          style={tw`h-32 w-32 rounded-full bg-gray-200 bg-opacity-50 shadow-lg`}
        >
          {user && user.avatarUrl ? (
            <Image
              style={tw`flex-1  rounded-full`}
              source={{ uri: user.avatarUrl }}
              alt="Profile"
            />
          ) : (
            <FontAwesome
              style={tw`flex-1 text-3xl text-light-c10 dark:text-dark-c10`}
              name="user"
            />
          )}
        </View>
        <View style={tw`gap-2`}>
          <View
            style={tw`min-w-48 min-h-10 mx-8 items-center gap-2 rounded-lg px-4`}
          >
            <Text
              style={tw`text-3xl font-bold text-light-c10 dark:text-dark-c10`}
            >
              {user?.name}
            </Text>
            <Text style={tw`text-xl text-light-c10 dark:text-dark-c10`}>
              {user?.googleEmail}
            </Text>
            <Text style={tw`text-lg text-light-c10 dark:text-dark-c10`}>
              {user?.administrador ? 'Administrador' : 'Usuário teste'}
            </Text>
          </View>
        </View>
      </View>

      {children}
    </View>
  )
}
