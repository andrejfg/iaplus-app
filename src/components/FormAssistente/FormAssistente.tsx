import tw from '@/lib/tailwind'
import { View, Text, ActivityIndicator } from 'react-native'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import ImageSelector from '@/components/ImageSelector'
import { zodResolver } from '@hookform/resolvers/zod'
import { assistenteSchema, assistenteSchemaType } from './formAssistenteSchema'
import TextInputCustom from '../TextInputCustom'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useLoading from '@/hooks/useLoading'
import React, { useState, useContext } from 'react'
import addNewAssistenteVirtual from '@/api/addNewAssistenteVirtual'
import { HomeContext } from '@/contexts/HomeContext'
import updateAssistenteVirtual from '@/api/updateAssistenteVirtual'
import { router } from 'expo-router'
import Toast from 'react-native-root-toast'
import uploadImage from '@/api/uploadImage'

interface FormAssistenteProps {
  assistente?: AssistenteVirtual
}

export default function FormAssistente({ assistente }: FormAssistenteProps) {
  const { setAssistentes } = useContext(HomeContext)
  const { loading, startLoading, stopLoading } = useLoading()
  const avatarLoading = useLoading()
  const [avatarUri, setAvatarUri] = useState<string>()
  const methods = useForm<assistenteSchemaType>({
    resolver: zodResolver(assistenteSchema),
    defaultValues: assistente || {},
  })

  const onSubmit: SubmitHandler<assistenteSchemaType> = async (data) => {
    startLoading()
    const avatarUrl = await uploadImage(avatarUri).catch(() => {
      Toast.show('Erro ao enviar imagem.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
    })

    const body = { ...data, avatarUrl }
    if (!assistente) {
      const newAssistente = await addNewAssistenteVirtual(body).catch(() => {
        Toast.show('Erro ao criar novo assistente.', {
          position: 50,
          backgroundColor: 'red',
          duration: Toast.durations.SHORT,
        })
      })
      if (newAssistente) setAssistentes((prev) => [...prev, newAssistente])
    } else {
      const newAssistente = await updateAssistenteVirtual({
        id: assistente.id,
        body,
      }).catch(() => {
        Toast.show('Erro ao atualizar assistente.', {
          position: 50,
          backgroundColor: 'red',
          duration: Toast.durations.SHORT,
        })
      })
      if (newAssistente)
        setAssistentes((prev) => [
          ...prev.filter((olds) => olds.id !== assistente.id, newAssistente),
        ])
    }
    router.replace('/(tabs)/assistentes')
    stopLoading()
  }

  return (
    <View style={tw`flex-1 items-center justify-center gap-8 px-4 py-8`}>
      <ImageSelector
        avatarLoading={avatarLoading}
        defaultImage={assistente?.avatarUrl}
        onAvatarSelect={setAvatarUri}
      />
      <View style={tw`w-full flex-1 `}>
        <FormProvider {...methods}>
          <View style={tw`w-full flex-1 items-center gap-4`}>
            <TextInputCustom
              name="nome"
              label="Nome"
              placeholder="Digite o nome"
            />
            <TextInputCustom
              name="profissao"
              label="Profissão"
              placeholder="Digite a profissão"
            />
            <TextInputCustom
              name="promptInicial"
              label="Prompt Inicial"
              styleInput={tw`h-24`}
              multiline
              placeholder="Digite o prompt inicial"
            />
            <TextInputCustom
              name="promptSecreto"
              label="Prompt Secreto"
              styleInput={tw`h-24`}
              multiline
              placeholder="Digite o prompt secreto"
            />

            <TouchableOpacity
              style={tw`h-12 w-24 items-center justify-center rounded-2xl bg-chat-send-button`}
              disabled={loading}
              activeOpacity={0.7}
              onPress={methods.handleSubmit(onSubmit)}
            >
              {!loading && !avatarLoading.loading ? (
                <Text style={tw`text-base font-semibold text-white`}>
                  Confirmar
                </Text>
              ) : (
                <ActivityIndicator color="white" />
              )}
            </TouchableOpacity>
          </View>
        </FormProvider>
      </View>
    </View>
  )
}
