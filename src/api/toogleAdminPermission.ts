import { api } from './api'

interface toogleAdminPermissionProps {
  id: string
}
export default async function toogleAdminPermission({
  id,
}: toogleAdminPermissionProps) {
  const data = (await api.put(`/updateAdmin/${id}`)).data
  console.log(data)
  return data
}
