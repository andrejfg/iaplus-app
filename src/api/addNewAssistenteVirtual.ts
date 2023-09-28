import AssistenteVirtual from '@/types/AssistenteVirtual'
import { api } from './api'

interface addNewAssistenteVirtualProps {
  promptInicial: string
  promptSecreto: string
  nome: string
  avatarUrl?: string | null
  profissao?: string
  organizacao?: string
}

export default async function addNewAssistenteVirtual(
  body: addNewAssistenteVirtualProps,
) {
  const data: AssistenteVirtual = await api
    .post('/pessoasvirtuais', body)
    .then((response) => response.data)
  return data
}
