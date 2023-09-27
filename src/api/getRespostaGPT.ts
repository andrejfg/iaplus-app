import { Mensagem } from '@/types/Mensagem'
import { api } from './api'

export default async function getRespostaGPT(body: Mensagem[]) {
  const data = await api.post(`/chat`, body).then((response) => response.data)
  return data.at(-1)
}
