import { redirect, type RequestHandler } from '@sveltejs/kit'
import { SPOTIFY_APP_CLIENT_ID, BASE_URL } from '$env/static/private'

const generateRandomString = (length: number) => {
  let randomString = ''
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
  }
  return randomString
}

const scope = 'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read'

const state = generateRandomString(16)

export const GET: RequestHandler = () => {
  throw redirect(307, `https://accounts.spotify.com/authorize?${
    new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_APP_CLIENT_ID,
      scope,
      redirect_url: `${BASE_URL}/api/auth/callback`,
      state,
      code_challenge_method: 'S256',
    })
  }`)
}