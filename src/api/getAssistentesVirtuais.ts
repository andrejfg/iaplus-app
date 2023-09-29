import AssistenteVirtual from '@/types/AssistenteVirtual'
import { api } from './api'

export default async function getAssistentesVirtuais(): Promise<
  AssistenteVirtual[] | undefined
> {
  const data = await api
    .get('/pessoasvirtuais')
    .then((response) => response.data)
  return data
}
