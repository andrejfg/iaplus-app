import { api } from './api'

interface getMensagemByIDProps {
  id: string
}

export default async function getMensagemByID({ id }: getMensagemByIDProps) {
  const mensagem = await api
    .get(`/conversas/${id}`)
    .then((response) => response.data)
  return mensagem
}
