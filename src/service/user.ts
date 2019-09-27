import axios from 'axios'
import { IUser } from '@cc98/api'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'
import { stringify } from 'query-string'

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
