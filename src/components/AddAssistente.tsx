import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function AddAssistente() {
  function goToNewAssistente() {
    router.push('/newAssistente')
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goToNewAssistente}
      style={tw`absolute bottom-4 right-4 h-14 w-14 items-center justify-center rounded-full bg-chat-send-button shadow-lg`}
    >
      <FontAwesome name="plus" style={tw`text-base text-chat-send-icon`} />
    </TouchableOpacity>
  )
}
