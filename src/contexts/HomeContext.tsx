import useWebSocket from '@/hooks/useWebsocket'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import Conversa from '@/types/Conversa'
import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import User from '@/types/User'
import { createContext, useState } from 'react'

export interface HomeContextProps {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  assistentes: AssistenteVirtual[]
  setAssistentes: React.Dispatch<React.SetStateAction<AssistenteVirtual[]>>
  conversas: Conversa[]
  setConversas: React.Dispatch<React.SetStateAction<Conversa[]>>
  users: PessoaFisicaAdmin[] | undefined
  setUsers: React.Dispatch<React.SetStateAction<PessoaFisicaAdmin[]>>
  socket: React.MutableRefObject<WebSocket | null>
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
  const [assistentes, setAssistentes] = useState<AssistenteVirtual[]>([])
  const [conversas, setConversas] = useState<Conversa[]>([])
  const [users, setUsers] = useState<PessoaFisicaAdmin[]>([])
  const [user, setUser] = useState<User>()
  const { socket, openWebSocket, closeWebSocket } = useWebSocket({
    setAssistentes,
    setUser,
    setUsers,
  })

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
        socket,
        openWebSocket,
        closeWebSocket,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
