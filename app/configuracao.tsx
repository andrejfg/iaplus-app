import tw from '@/lib/tailwind'
import { View, Text } from 'react-native'

export default function ConfiguracaoScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl`}>CONFIGURAÇÕES</Text>
    </View>
  )
}
