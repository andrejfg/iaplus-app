import { useEffect, useContext, useState } from 'react'
import { router } from 'expo-router'
import { useDeviceContext } from 'twrnc'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'expo-image'
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
    const conversa = await getUserConversas()
    if (conversa) setConversas(conversa)
    const assistentes = await getAssistentesVirtuais()
    if (assistentes) setAssistentes(assistentes)
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
            console.log(token)
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
      <Image
        style={tw`absolute right-0 top-0 h-3/4 w-3/4`}
        source={Fundo}
        alt=""
      />
      <View style={tw`flex-1 items-center justify-between gap-8 py-8`}>
        <Image
          style={tw`h-52 w-52`}
          contentFit="contain"
          source={LogoIAPlus}
          alt=""
        />
        <View style={tw`relative w-full flex-1 items-center justify-center`}>
          <View
            style={tw`w-5/6 flex-1 items-center justify-center self-start rounded-2xl p-4`}
          >
            <Text style={tw`text-4xl font-bold text-white`}>
              IA Desenvolvida com a Tecnologia do ChatGPT 4.0
            </Text>
          </View>
        </View>
        <View style={tw`w-full items-center justify-center gap-8`}>
          <Text style={tw`text-3xl font-semibold text-white`}>Faça Login:</Text>
          {/* <View style={tw`h-1 w-5/6 rounded-full bg-light-c10_alt`} /> */}
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
