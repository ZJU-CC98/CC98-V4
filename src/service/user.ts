import axios from 'axios'
import { IUser } from '@cc98/api'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'
import { stringify } from 'query-string'
import THEME from 'src/constants/Theme'

export async function getMe(ignoreCache = false) {
  const storageUser = getLocalStorage('userInfo')

  if (storageUser && !ignoreCache) {
    return storageUser
  }

  const me: IUser = await axios({
    url: '/me',
    needAuth: true,
  })

  setLocalStorage('userInfo', me, 3600)

  return me
}

export const getUsersByNames = (name: string[]) => {
  if (name.length === 0) {
    return Promise.resolve([])
  }

  return axios({
    url: `/user/name?${stringify({ name })}`,
    needAuth: true,
  }) as Promise<IUser[]>
}

export const getUserByName = (name: string) => {
  return axios(`/user/name/${name}`) as Promise<IUser>
}

export async function setMyTheme(theme: THEME) {
  await axios({
    url: '/me/theme',
    method: 'PUT',
    params: {
      id: theme,
    },
    needAuth: true,
  })
}
