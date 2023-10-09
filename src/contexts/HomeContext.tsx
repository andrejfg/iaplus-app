import { api } from '@/api/api'
import { getToken } from '@/hooks/useAuth'
import useWebSocket from '@/hooks/useWebsocket'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import Conversa from '@/types/Conversa'
import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import User from '@/types/User'
import { createContext, useEffect, useState } from 'react'

export interface HomeContextProps {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  assistentes: AssistenteVirtual[]
  setAssistentes: React.Dispatch<React.SetStateAction<AssistenteVirtual[]>>
  conversas: Conversa[]
  setConversas: React.Dispatch<React.SetStateAction<Conversa[]>>
  users: PessoaFisicaAdmin[] | undefined
  setUsers: React.Dispatch<React.SetStateAction<PessoaFisicaAdmin[]>>
  token: string | null
  setToken: React.Dispatch<React.SetStateAction<string | null>>
  openWebSocket: () => void
  closeWebSocket: () => void
}

export const HomeContext = createContext<HomeContextProps>(
  {} as HomeContextProps,
)

interface HomeContextProviderProps {
  children?: React.ReactNode
}

export const HomeContextProvider = ({ children }: HomeContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [assistentes, setAssistentes] = useState<AssistenteVirtual[]>([])
  const [conversas, setConversas] = useState<Conversa[]>([])
  const [users, setUsers] = useState<PessoaFisicaAdmin[]>([])
  const [user, setUser] = useState<User>()
  const webSocketUri = api.getUri().replace('http', 'ws') + '/websocket'
  const { socket, openWebSocket, closeWebSocket } = useWebSocket(
    webSocketUri,
    token,
  )

  useEffect(() => {
    async function updateToken() {
      setToken(await getToken())
    }
    updateToken()
    openWebSocket()
  }, [])

  return (
    <HomeContext.Provider
      value={{
        user,
        setUser,
        assistentes,
        setAssistentes,
        conversas,
        setConversas,
        users,
        setUsers,
        token,
        setToken,
        openWebSocket,
        closeWebSocket,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
