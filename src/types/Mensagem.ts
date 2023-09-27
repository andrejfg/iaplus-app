import AssistenteVirtual from './AssistenteVirtual'

export interface Mensagem {
  id: string
  conversaId: string
  dataHora: Date
  role: string
  texto: string
}

export interface MensagemResponse {
  Mensagem: Mensagem[]
  pessoaVirtual: AssistenteVirtual
}
