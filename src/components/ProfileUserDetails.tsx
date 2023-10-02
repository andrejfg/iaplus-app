import PessoaFisicaAdmin from '@/types/PessoaFisicaAdmin'
import Profile from './Profile'
import { Text } from 'react-native'
interface ProfileUserDetailsProps {
  user: PessoaFisicaAdmin
}

export default function ProfileUserDetails({ user }: ProfileUserDetailsProps) {
  return (
    <Profile
      user={{
        ...user,
        name: user.nome,
        sub: user.id,
        googleEmail: user.googleEmail || '',
      }}
    >
      <>
        <Text>{`${user.conversasAtivas} conversas ativas`}</Text>
        {user.createdAt && (
          <Text>{`A conta foi criada em ${new Date(
            user.createdAt,
          ).toLocaleDateString()}`}</Text>
        )}
        {user.ultimaMensagem && (
          <Text>{`Última mensagem enviada foi ${new Date(
            user.ultimaMensagem,
          ).toLocaleDateString()}`}</Text>
        )}
      </>
    </Profile>
  )
}
