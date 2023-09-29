import Conversa from '@/types/Conversa'
import { api } from './api'

export default async function getUserConversas(): Promise<
  Conversa[] | undefined
> {
  const data: Conversa[] = await api
    .get('/conversas/')
    .then((response) => response.data)
  return data
}
