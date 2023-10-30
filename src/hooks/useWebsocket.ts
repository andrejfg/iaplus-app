import { useEffect, useRef } from 'react'
import { getToken } from './useAuth'
import { api } from '@/api/api'
import AssistenteVirtual from '@/types/AssistenteVirtual'
import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import User from '@/types/User'

interface useWebSocketProps {
  setAssistentes: React.Dispatch<React.SetStateAction<AssistenteVirtual[]>>
  setUsers: React.Dispatch<React.SetStateAction<PessoaFisicaAdmin[]>>
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const useWebSocket = ({
  setAssistentes,
  setUser,
  setUsers,
}: useWebSocketProps) => {
  const socket = useRef<WebSocket | null>(null)
  const webSocketUri = api.getUri().replace('http', 'ws') + '/websocket'
  // Função para abrir a conexão WebSocket
  const openWebSocket = async () => {
    const token = await getToken()

    if (token) {
      closeWebSocket() // Feche a conexão WebSocket existente, se houver

      const newSocket = new WebSocket(webSocketUri, [], {
        headers: { Authorization: `Bearer ${token}` },
      })

      newSocket.onopen = () => {
        console.log('Conexão WebSocket aberta')
      }

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data) {
          if (data.assistentes) setAssistentes(data.assistentes)
          if (data.user) setUser(data.user)
          if (data.users) setUsers(data.users)
        }
      }
      const mensagem = {
        tipo: 'chat',
        conteudo: 'Olá, servidor WebSocket!',
      }

      newSocket.send(JSON.stringify(mensagem))

      socket.current = newSocket
    }
  }

  // Função para fechar a conexão WebSocket
  const closeWebSocket = () => {
    if (socket.current) {
      socket.current.close()
      socket.current = null
    }
  }

  // Use useEffect para garantir que a conexão WebSocket seja fechada quando o componente for desmontado
  useEffect(() => {
    return () => {
      closeWebSocket()
    }
  }, [])

  return { socket, openWebSocket, closeWebSocket }
}

export default useWebSocket
