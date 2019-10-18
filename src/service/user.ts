import axios from 'axios'
import { ISignIn, ITopic, IUser } from '@cc98/api'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'
import { stringify } from 'query-string'
import THEME from 'src/constants/Theme'
import { getTomorrowDate } from 'src/utils/time'

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

export const getUserById = (id: string | number, ignoreCache?: boolean) => {
  return axios({
    url: `/user/${id}`,
    needAuth: true,
    ignoreCache,
  }) as Promise<IUser>
}

export const getUsersByIds = (id: number[], ignoreCache?: boolean) => {
  if (id.length === 0) {
    return Promise.resolve([])
  }

  return axios({
    url: `/user?${stringify({ id })}`,
    needAuth: true,
    ignoreCache,
  }) as Promise<IUser[]>
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

export const transferWealth = (userNames: string[], wealth: number, reason: string) => {
  return axios({
    url: '/me/transfer-wealth',
    method: 'PUT',
    data: {
      userNames,
      wealth,
      reason,
    },
    needAuth: true,
  }) as Promise<string[]>
}

// 获取我的粉丝
export const getMyFollower = (from: number, size: number) => {
  return axios({
    url: '/me/follower',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<number[]>
}

export const followUser = (userId: number | string) => {
  return axios({
    url: `/me/followee/${userId}`,
    method: 'PUT',
    needAuth: true,
  }) as Promise<void>
}

export const unFollowUser = (userId: number | string) => {
  return axios({
    url: `/me/followee/${userId}`,
    method: 'DELETE',
    needAuth: true,
  }) as Promise<void>
}

// 获取我的关注
export const getMyFollowee = (from: number, size: number) => {
  return axios({
    url: '/me/followee',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<number[]>
}

export const getMyFavoriteTopics = (from: number, size: number) => {
  return axios({
    url: '/topic/me/favorite',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<ITopic[]>
}

export const getMyRecentTopics = (from: number, size: number) => {
  return axios({
    url: '/me/recent-topic',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<ITopic[]>
}

export const getSignInInfo = async () => {
  let signInInfo = getLocalStorage<ISignIn>('signInInfo')

  if (signInInfo) {
    return signInInfo
  }

  signInInfo = (await axios({
    url: '/me/signin',
    needAuth: true,
  })) as ISignIn

  setLocalStorage('signInInfo', signInInfo, getTomorrowDate().getTime() / 1000)

  return signInInfo
}

export const signIn = (content: string) => {
  return axios({
    url: '/me/signin',
    needAuth: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: content,
  }) as Promise<void>
}
