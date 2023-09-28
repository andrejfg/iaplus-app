import { api } from './api'
import FormData from 'form-data'

export default async function uploadImage(fileUri?: string) {
  if (!fileUri) {
    return ''
  }

  const form = new FormData()

  form.append('file', {
    uri: fileUri,
    name: 'image.jpeg',
    type: 'image/jpeg',
  } as any)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } as any
  options.body = form
  const url = api.getUri() + '/upload'

  const response = await fetch(url, options).then((response: any) =>
    response.json(),
  )

  return response.fileUrl
}
