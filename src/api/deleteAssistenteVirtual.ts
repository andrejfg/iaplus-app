import { getToken } from '@/hooks/useAuth'
import { api } from './api'

export default async function deleteAssistenteVirtual(id: string) {
  const token = await getToken()
  const response = await fetch(`${api.getUri()}/pessoasvirtuais/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
  console.log(response)
}
