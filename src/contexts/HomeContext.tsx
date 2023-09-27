import getAssistentesVirtuais from '@/api/getAssistentesVirtuais'
import getUserConversas from '@/api/getUserConversas'
import { getToken } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import tw from '@/lib/tailwind'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import Conversa from '@/types/Conversa'
import User from '@/types/User'
import getUserInfo from '@/utils/getUserInfo'
import { createContext, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

interface HomeContextProps {
  user: User | undefined
  assistentes: AssistenteVirtual[]
  setAssistentes: React.Dispatch<React.SetStateAction<AssistenteVirtual[]>>
  conversas: Conversa[]
  setConversas: React.Dispatch<React.SetStateAction<Conversa[]>>
}

export const HomeContext = createContext<HomeContextProps>(
  {} as HomeContextProps,
)

interface HomeContextProviderProps {
  children?: React.ReactNode
}

export const HomeContextProvider = ({ children }: HomeContextProviderProps) => {
  const [assistentes, setAssistentes] = useState<AssistenteVirtual[]>([])
  const [conversas, setConversas] = useState<Conversa[]>([])
  const { loading, startLoading, stopLoading } = useLoading()
  const [user, setUser] = useState<User | undefined>()

  async function getFirstData() {
    startLoading()
    const token = await getToken()
    if (token) {
      setUser(await getUserInfo())
      setAssistentes(await getAssistentesVirtuais())
      setConversas(await getUserConversas())
    }
    stopLoading()
  }

  useEffect(() => {
    getFirstData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!loading ? (
        <HomeContext.Provider
          value={{ user, assistentes, setAssistentes, conversas, setConversas }}
        >
          {children}
        </HomeContext.Provider>
      ) : (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator />
        </View>
      )}
    </>
  )
}
