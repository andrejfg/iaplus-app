import AssistenteVirtual from '@/types/AssistenteVirtual'
import { api } from './api'

interface updateAssistenteVirtualProps {
  body: {
    promptInicial: string
    promptSecreto: string
    nome: string
    avatarUrl?: string | void
    profissao?: string
    organizacao?: string
  }
  id: string
}

export default async function updateAssistenteVirtual({
  body,
  id,
}: updateAssistenteVirtualProps) {
  const data: AssistenteVirtual = await api
    .put(`/pessoasvirtuais/${id}`, body)
    .then((response) => response.data)
  return data
}
