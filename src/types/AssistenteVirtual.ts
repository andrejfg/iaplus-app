import Conversa from './Conversa'

interface AssistenteVirtual {
  id: string
  nome: string
  avatarUrl: string
  promptInicial: string
  profissao: string
  conversas: Conversa[]
}

export default AssistenteVirtual
