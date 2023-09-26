import { makeRedirectUri } from 'expo-auth-session'

export const redirect_uri = makeRedirectUri({
  scheme: 'iaplus-app',
  path: '/api/auth/callback',
})

export default function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri,
    client_id:
      '944252748541-904qvd3k7egsclvmkbrjcb2v3cs7gg6m.apps.googleusercontent.com',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    include_granted_scopes: 'true',
  }

  const qs = new URLSearchParams(options)
  console.log(redirect_uri)
  return `${rootUrl}?${qs.toString()}`
}
