import { useEffect, useContext, useState } from 'react'
import { router } from 'expo-router'
import { useDeviceContext } from 'twrnc'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LogoIAPlus from '@/assets/images/LogoIAPLUS.png'
import Fundo from '@/assets/images/fundoLogin.png'
import { getToken } from '@/hooks/useAuth'
import tw from '@/lib/tailwind'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import useLoading from '@/hooks/useLoading'
import { HomeContext } from '@/contexts/HomeContext'
import { api } from '@/api/api'
import Toast from 'react-native-root-toast'
import getUserInfo from '@/utils/getUserInfo'
import getUserConversas from '@/api/getUserConversas'
import getAssistentesVirtuais from '@/api/getAssistentesVirtuais'

export default function LoginScreen() {
  useDeviceContext(tw)
  const { setAssistentes, setConversas, setUser } = useContext(HomeContext)
  const { isAuth, signInWithGoogle } = useGoogleAuth()
  const [serverWorking, setServerWorking] = useState(false)
  const { loading, startLoading, stopLoading } = useLoading()
  async function handleIsAuth() {
    startLoading()
    setUser(await getUserInfo())
    setConversas(await getUserConversas())
    setAssistentes(await getAssistentesVirtuais())
    stopLoading()
    router.replace('/(tabs)/conversas')
  }
  useEffect(() => {
    api
      .get('/server')
      .then((response) => {
        if (response.status === 200) {
          getToken().then(async (token) => {
            setServerWorking(true)
            if (token) handleIsAuth()
          })
        }
      })
      .catch(() => {
        setServerWorking(false)
        Toast.show('Erro ao conectar com servidor.', {
          position: 50,
          backgroundColor: 'red',
          duration: Toast.durations.SHORT,
        })
      })
  }, [])

  useEffect(() => {
    if (isAuth) {
      handleIsAuth()
    }
  }, [isAuth])

  async function handleLoginGoogle() {
    startLoading()
    await signInWithGoogle()
    stopLoading()
  }

  return (
    <View style={tw`flex-1 bg-[#06062c]`}>
      <Image style={tw`absolute right-0 h-full w-full`} source={Fundo} alt="" />
      <View style={tw`flex-1 items-center justify-between gap-8 py-8`}>
        <Image source={LogoIAPlus} alt="" />
        <View style={tw`relative w-full flex-1 items-center justify-center`}>
          <View
            style={tw`w-5/6 flex-1 items-center justify-center self-start rounded-2xl p-4`}
          >
            <Text style={tw`text-4xl font-bold text-white`}>
              IA Desenvolvida com a Tecnologia do ChatGPT 4.0
            </Text>
          </View>
          <View style={tw`w-full flex-row justify-evenly gap-8 px-8`}>
            <View style={tw`h-18 w-18 flex-1 rounded-full bg-light-c10_alt`} />
            <View style={tw`h-18 w-18 flex-1 rounded-full bg-light-c10_alt`} />
            <View style={tw`h-18 w-18 flex-1 rounded-full bg-light-c10_alt`} />
          </View>
        </View>
        <View style={tw`items-center justify-center gap-8`}>
          <Text style={tw`text-3xl font-semibold text-white`}>Faça Login:</Text>
          <View style={tw` w-full flex-row items-center justify-evenly`}>
            <TouchableOpacity
              onPress={handleLoginGoogle}
              disabled={loading || !serverWorking}
              style={tw`h-14 w-14 items-center justify-center rounded-full border border-dark-c10`}
            >
              <FontAwesome name="google" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
