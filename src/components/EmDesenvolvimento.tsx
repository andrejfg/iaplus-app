import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { useDeviceContext } from 'twrnc'

export default function EmDesenvolvimento() {
  useDeviceContext(tw)
  return (
    <View style={tw`flex-1 items-center justify-center gap-8`}>
      <Text
        style={tw`text-2xl font-semibold text-light-c10 dark:text-dark-c10`}
      >
        Em desenvolvimento
      </Text>
      <FontAwesome
        style={tw`text-3xl text-light-c10 dark:text-dark-c10`}
        name="code"
      />
    </View>
  )
}
