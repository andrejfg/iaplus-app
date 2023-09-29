interface PessoaFisicaAdmin {
  id: string
  githubId?: string
  gitHubEmail?: string
  googleId?: string
  googleEmail?: string
  createdAt: Date
  nome: string
  avatarUrl: string
  job: string
  organization?: string
  administrador: boolean
  conversasAtivas: number
  ultimaMensagem?: Date
}

export default PessoaFisicaAdmin
