import AssistenteVirtual from '@/types/AssistenteVirtual'
import Conversa from '@/types/Conversa'
import User from '@/types/User'
import { createContext, useState } from 'react'

interface HomeContextProps {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
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
  const [user, setUser] = useState<User>()

  return (
    <HomeContext.Provider
      value={{
        user,
        setUser,
        assistentes,
        setAssistentes,
        conversas,
        setConversas,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
