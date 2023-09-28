import { z } from 'zod'

export const assistenteSchema = z.object({
  promptInicial: z.string().min(5, 'Prompt Inicial é Obrigatório'),
  promptSecreto: z.string().min(5, 'Prompt Secreto é Obrigatório'),
  nome: z.string().min(5, 'Nome é obrigatório'),
  profissao: z.string().min(1, 'Profissão é obrigatório'),
})

export type assistenteSchemaType = z.infer<typeof assistenteSchema>
