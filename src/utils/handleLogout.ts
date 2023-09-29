import { HomeContextProps } from '@/contexts/HomeContext'
import { removeToken } from '@/hooks/useAuth'

export default async function handleLogout(context: HomeContextProps) {
  context.setUser(undefined)
  context.setAssistentes([])
  context.setConversas([])
  await removeToken()
}
