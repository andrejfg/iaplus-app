import tw from '@/lib/tailwind'
import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import ImageSelector from '@/components/ImageSelector'
import { zodResolver } from '@hookform/resolvers/zod'
interface FormAssistenteProps {
  assistente?: AssistenteVirtual
}

export default function FormAssistente({ assistente }: FormAssistenteProps) {
  // const { handleSubmit, control } = useForm({
  //   resolver: zodResolver(),
  //   defaultValues: {},
  // })

  function onAvatarSelect(avatar: string) {
    console.log(avatar)
  }
  return (
    <View style={tw`flex-1 items-center justify-center px-4 py-8`}>
      <ImageSelector onAvatarSelect={onAvatarSelect} />
    </View>
  )
}
