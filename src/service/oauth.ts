import axios from 'axios'
import { stringify } from 'query-string'
import envConfig from '../config/env'

const baseOAuthConfig = {
  client_id: '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
  client_secret: '8b53f727-08e2-4509-8857-e34bf92b27f2',
}

export interface ILoginResult {
  // eslint-disable-next-line camelcase
  access_token: string
  // eslint-disable-next-line camelcase
  expires_in: number
  // eslint-disable-next-line camelcase
  token_type: string
  // eslint-disable-next-line camelcase
  refresh_token: string
}

export function login(username: string, password: string) {
  const req = {
    ...baseOAuthConfig,
    grant_type: 'password',
    scope: 'cc98-api openid offline_access',
    username,
    password,
  }

  return axios({
    baseURL: envConfig.oauthAPIUrl,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: stringify(req),
  }) as Promise<ILoginResult>
}

export function refreshToken(token: string) {
  const req = {
    ...baseOAuthConfig,
    grant_type: 'refresh_token',
    refresh_token: token,
  }

  return axios({
    baseURL: envConfig.oauthAPIUrl,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: stringify(req),
  }) as Promise<ILoginResult>
}
