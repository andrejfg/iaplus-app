import tw from '@/lib/tailwind'
import Conversa from '@/types/Conversa'
import { FontAwesome } from '@expo/vector-icons'
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputKeyPressEventData,
} from 'react-native'

interface ChatInputProps {
  disable: boolean
  userInput: string
  conversa: Conversa
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  sendMessage: (conversa: Conversa) => Promise<void>
  handleKeyDown: (e: TextInputKeyPressEventData, conversa: Conversa) => void
}

export default function ChatInput({
  disable,
  userInput,
  conversa,
  setUserInput,
  sendMessage,
  handleKeyDown,
}: ChatInputProps) {
  const regex = /^\s*$/
  return (
    <View
      style={tw`h-16 w-full flex-row items-center justify-center gap-2 rounded-full p-2`}
    >
      <View
        style={tw`h-full flex-1 justify-center rounded-full bg-white px-4 shadow-lg`}
      >
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          cursorColor={'#363636'}
          onKeyPress={(e) => handleKeyDown(e.nativeEvent, conversa)}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => sendMessage(conversa)}
        disabled={userInput === '' || regex.test(userInput) || disable}
        style={tw`h-12 w-12 items-center justify-center rounded-full bg-chat-send-button shadow-lg`}
      >
        <FontAwesome
          style={tw`-ml-1 text-xl text-chat-send-icon`}
          name="send"
        />
      </TouchableOpacity>
    </View>
  )
}
