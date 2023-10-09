import { useEffect, useRef, useContext } from 'react'
import { getToken } from './useAuth'
import { api } from '@/api/api'
import { HomeContext } from '@/contexts/HomeContext'
// import { w3cwebsocket as WebSocket } from 'websocket'
const useWebSocket = () => {
  const socketRef = useRef(null)
  const webSocketUri = api.getUri().replace('http', 'ws') + '/websocket'
  const { setAssistentes, setConversas, setUser, setUsers } =
    useContext(HomeContext)
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
        console.log(data)
        setAssistentes(data.assistentes)
        setConversas(data.conversas)
        setUser(data.user)
        setUsers(data.users)
      }

      socketRef.current = newSocket
    }
  }

  // Função para fechar a conexão WebSocket
  const closeWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }
  }

  // Use useEffect para garantir que a conexão WebSocket seja fechada quando o componente for desmontado
  useEffect(() => {
    return () => {
      closeWebSocket()
    }
  }, [])

  return { socketRef, openWebSocket, closeWebSocket }
}

export default useWebSocket
