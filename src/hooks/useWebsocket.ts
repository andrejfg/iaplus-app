import { useState, useEffect } from 'react'

const useWebSocket = (socketUrl: string, token: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)

  // Função para abrir a conexão WebSocket
  const openWebSocket = () => {
    const newSocket = new WebSocket(socketUrl)
    newSocket.onopen = () => {
      console.log('Conexão WebSocket aberta')
      // Defina o header de autorização
      newSocket.send(
        JSON.stringify({
          type: 'authorization',
          token,
        }),
      )
    }
    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)
    }
    setSocket(newSocket)
  }

  // Função para fechar a conexão WebSocket
  const closeWebSocket = () => {
    if (socket) {
      socket.close()
      setSocket(null)
    }
  }

  useEffect(() => {
    // Chame a função openWebSocket quando o token for definido
    if (token) {
      openWebSocket()
    }

    // Certifique-se de fechar a conexão quando o componente for desmontado
    return () => {
      closeWebSocket()
    }
  }, [token])

  return { socket, openWebSocket, closeWebSocket }
}

export default useWebSocket
