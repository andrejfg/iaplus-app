import { View, Text } from 'react-native'

import tw from '@/lib/tailwind'

export default function ModalScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Modal</Text>
      <View style={tw`my-7 h-0.5 w-4/5`} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
    </View>
  )
}
