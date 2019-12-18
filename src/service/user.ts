import axios from 'axios'
import { IEditUserInfo, IPost, ISignIn, ITopic, IUser, IUserOperation } from '@cc98/api'
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
    withToken: true,
  })

  setLocalStorage('userInfo', me, 3600)

  return me
}

export const getUserById = (id: string | number, ignoreCache?: boolean) => {
  return axios({
    url: `/user/${id}`,
    withToken: true,
    ignoreCache,
  }) as Promise<IUser>
}

export const getUsersByIds = (id: number[], ignoreCache?: boolean) => {
  if (id.length === 0) {
    return Promise.resolve([])
  }

  return axios({
    url: `/user?${stringify({ id })}`,
    withToken: true,
    ignoreCache,
  }) as Promise<IUser[]>
}

export const getUsersByNames = (name: string[]) => {
  if (name.length === 0) {
    return Promise.resolve([])
  }

  return axios({
    url: `/user/name?${stringify({ name })}`,
    withToken: true,
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
    withToken: true,
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
    withToken: true,
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
    withToken: true,
  }) as Promise<number[]>
}

export const followUser = (userId: number | string) => {
  return axios({
    url: `/me/followee/${userId}`,
    method: 'PUT',
    withToken: true,
  }) as Promise<void>
}

export const unFollowUser = (userId: number | string) => {
  return axios({
    url: `/me/followee/${userId}`,
    method: 'DELETE',
    withToken: true,
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
    withToken: true,
  }) as Promise<number[]>
}

export const getMyFavoriteTopics = (from: number, size: number) => {
  return axios({
    url: '/topic/me/favorite',
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<ITopic[]>
}

export const getMyRecentTopics = (from: number, size: number) => {
  return axios({
    url: '/me/recent-topic',
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<ITopic[]>
}

export const getSignInInfo = async (ignoreCache = false) => {
  let signInInfo = getLocalStorage<ISignIn>('signInInfo')

  if (signInInfo && !ignoreCache) {
    return signInInfo
  }

  signInInfo = (await axios({
    url: '/me/signin',
    withToken: true,
  })) as ISignIn

  setLocalStorage('signInInfo', signInInfo, (getTomorrowDate().getTime() - Date.now()) / 1000)

  return signInInfo
}

export const signIn = (content: string) => {
  return axios({
    url: '/me/signin',
    withToken: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: content,
  }) as Promise<void>
}

export const getUserRecentTopics = (userId: string | number, from: number, size: number) => {
  return axios({
    url: `/user/${userId}/recent-topic`,
    withToken: true,
    params: {
      from,
      size,
    },
  }) as Promise<ITopic[]>
}

export const editMyInfo = (info: IEditUserInfo) => {
  return axios({
    url: '/me',
    method: 'PUT',
    withToken: true,
    data: info,
    silent: true,
  }) as Promise<void>
}

export const manageUser = (id: string | number, data: IUserOperation) => {
  return axios({
    url: `/user/${id}/operation`,
    method: 'PUT',
    withToken: true,
    data,
    silent: true,
  }) as Promise<void>
}

export const deleteUserTopicByDay = (id: string | number, day: string) => {
  return axios({
    url: `/user/${id}/topic?days=${day}`,
    withToken: true,
    method: 'DELETE',
    silent: true,
  }) as Promise<number>
}

export const deleteUserPostByDay = (id: string | number, day: string) => {
  return axios({
    url: `/user/${id}/post?days=${day}`,
    withToken: true,
    method: 'DELETE',
    silent: true,
  }) as Promise<number>
}

export const getUserRecentPostByDay = (
  id: string | number,
  days: number | string,
  from: number,
  size: number
) => {
  return (axios({
    url: `/User/${id}/post`,
    params: {
      days,
      from,
      size,
    },
    withToken: true,
  }) as Promise<{
    count: number
    postInfos: IPost[]
  }>).then(data => data.postInfos)
}

export const changeAvatar = (url: string) => {
  return axios({
    url: '/me/portrait',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: url,
    withToken: true,
  }) as Promise<void>
}
