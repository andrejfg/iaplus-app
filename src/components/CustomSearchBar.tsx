import tw from '@/lib/tailwind'
import { View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather'

interface CustomSearchBarProps {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

export default function CustomSearchBar({
  text,
  setText,
  placeholder,
}: CustomSearchBarProps) {
  return (
    <View
      style={tw`m-2 max-h-14 flex-1 flex-row items-center justify-center rounded-full border border-light-c10_alt bg-white shadow-md`}
    >
      <View style={tw`flex-1 p-2 pl-4`}>
        <TextInput
          placeholder={placeholder || 'Pesquisar'}
          value={text}
          onChangeText={setText}
          cursorColor={'#051752'}
          style={tw`flex-1 text-base`}
        />
      </View>
      {text !== '' && (
        <TouchableOpacity
          onPress={() => {
            setText('')
          }}
          style={[
            tw`h-full w-14 items-center justify-center rounded-r-full bg-slate-50`,
          ]}
        >
          <Feather style={tw`pr-1 text-lg`} name="x" />
        </TouchableOpacity>
      )}
    </View>
  )
}
