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

export const getUsersByIds = (userIds: number[]) => {
  return axios({
    url: `/user?${stringify({ id: userIds })}`,
    needAuth: true,
  }) as Promise<IUser[]>
}

export const getUsersByNames = (name: string[]) => {
  return axios({
    url: `/user/name?${stringify({ name })}`,
    needAuth: true,
  }) as Promise<IUser[]>
}
