import { api } from './api'
interface deleteConversaByIDProps {
  id: string
}

export default async function deleteConversaByID({
  id,
}: deleteConversaByIDProps) {
  await api.put(`/conversas/${id}`, { ativo: false })
}
