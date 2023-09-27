import AssistenteVirtual from '@/types/AssistenteVirtual'
import { api } from './api'

export default async function getAssistentesVirtuais() {
  const data: AssistenteVirtual[] = await api
    .get('/pessoasvirtuais')
    .then((response) => response.data)
  return data
}
