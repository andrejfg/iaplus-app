import tw from '@/lib/tailwind'
import { Mensagem } from '@/types/Mensagem'
import formatDate from '@/utils/formatDate'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDeviceContext } from 'twrnc'
import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-root-toast'

interface BalaoMensagemProps {
  mensagem: Mensagem
}

export default function BalaoMensagem({ mensagem }: BalaoMensagemProps) {
  useDeviceContext(tw)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(mensagem.texto)
    Toast.show('Mensagem Copiada', {
      position: -75,
      backgroundColor: 'gray',
      duration: Toast.durations.SHORT,
    })
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={copyToClipboard}
      style={[
        tw`flex-row`,
        mensagem.role === 'user' && tw` self-end`,
        mensagem.role === 'system' && tw`self-start`,
      ]}
    >
      {mensagem.role === 'system' && (
        <View style={[tw`h-2 w-2 rounded-bl-full bg-balloon-system`]} />
      )}
      <View
        style={[
          tw`min-h-10 flex-row items-center justify-between p-1.5`,
          mensagem.role === 'user' &&
            tw`self-end rounded-l-lg rounded-br-lg bg-balloon-user`,
          mensagem.role === 'system' &&
            tw`self-start rounded-r-lg rounded-bl-lg bg-balloon-system`,
        ]}
      >
        <View
          style={[
            tw`max-w-4/5 min-w-8 p-1.5`,
            mensagem.role === 'user' && tw`self-end`,
            mensagem.role === 'system' && tw`self-start`,
          ]}
        >
          <Text style={[tw` text-light-c10_alt`]}>{mensagem.texto}</Text>
        </View>
        <View style={tw`self-end  p-1`}>
          <Text
            style={[
              tw` text-xs`,
              mensagem.role === 'user' && tw`text-balloon-date-user`,
              mensagem.role === 'system' && tw`text-balloon-date-system`,
            ]}
          >
            {formatDate(mensagem.dataHora)}
          </Text>
        </View>
      </View>
      {mensagem.role === 'user' && (
        <View style={[tw`h-2 w-2 rounded-br-full bg-balloon-user`]} />
      )}
    </TouchableOpacity>
  )
}
