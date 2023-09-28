import FormAssistente from '@/components/FormAssistente/FormAssistente'
import Header from '@/components/Header'
import { HomeContext } from '@/contexts/HomeContext'
import tw from '@/lib/tailwind'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import { router, useGlobalSearchParams } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDeviceContext } from 'twrnc'

export default function EditAssistente() {
  const { id }: { id: string } = useGlobalSearchParams()
  const [assistenteVirtual, setAssistenteVirtual] =
    useState<AssistenteVirtual>()
  useDeviceContext(tw)
  const { assistentes } = useContext(HomeContext)

  useEffect(() => {
    const assistente = assistentes.find((assistente) => assistente.id === id)
    if (assistente) {
      setAssistenteVirtual(assistente)
    } else {
      router.replace('/assistentes')
    }
  }, [])
  return (
    <View style={tw`flex-1`}>
      <Header>
        <View style={tw`flex-1 justify-center`}>
          <Text style={tw`text-base font-semibold`}>Editar Assistente</Text>
        </View>
      </Header>
      <ScrollView style={tw`flex-1`}>
        {assistenteVirtual ? (
          <FormAssistente assistente={assistenteVirtual} />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  )
}
