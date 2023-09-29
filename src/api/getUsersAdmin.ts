import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import { api } from './api'

export default async function getUsersAdmin(): Promise<PessoaFisicaAdmin[]> {
  return (await api.get('/Admin/Users')).data
}
