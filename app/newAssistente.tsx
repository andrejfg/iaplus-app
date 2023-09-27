import FormAssistente from '@/components/FormAssistente/FormAssistente'
import Header from '@/components/Header'
import tw from '@/lib/tailwind'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDeviceContext } from 'twrnc'

export default function NewAssistente() {
  useDeviceContext(tw)
  return (
    <View style={tw`flex-1`}>
      <Header>
        <View style={tw`flex-1 justify-center`}>
          <Text style={tw`text-base font-semibold`}>Novo Assistente</Text>
        </View>
      </Header>
      <ScrollView style={tw`flex-1`}>
        <FormAssistente />
      </ScrollView>
    </View>
  )
}
