import AssistenteVirtual from './AssistenteVirtual'
import { Mensagem } from './Mensagem'

interface Conversa {
  id: string
  virtualId: string
  fisicaId: string
  DataInicio: Date
  ativo: boolean
  Mensagem: Mensagem[]
  pessoaVirtual: AssistenteVirtual
}

export default Conversa
