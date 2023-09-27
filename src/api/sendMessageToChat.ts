import { Mensagem } from '@/types/Mensagem'
import { api } from './api'

interface sendMessageToChatProps {
  mensagem: string
  role: 'user' | 'system'
  conversaId: string
}
export default async function sendMessageToChat({
  mensagem,
  role,
  conversaId,
}: sendMessageToChatProps) {
  const data: Mensagem = await api
    .post(`/conversas/${conversaId}`, {
      role,
      texto: mensagem,
    })
    .then((response) => response.data)
  return data
}
