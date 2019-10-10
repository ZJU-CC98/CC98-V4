import axios, { CancelToken } from 'axios'
import { IPost, ITopic } from '@cc98/api'

export const getTopicInfo = (topicId: string) => {
  return axios({
    url: `/topic/${topicId}`,
    needAuth: true,
  }) as Promise<ITopic>
}

export const getTopicIsFavorite = (topicId: string | number) => {
  return axios({
    url: `/topic/${topicId}/isfavorite`,
    needAuth: true,
  }) as Promise<boolean>
}

export const setTopicFavorite = (topicId: string | number) => {
  return axios({
    url: `/me/favorite/${topicId}`,
    needAuth: true,
    method: 'PUT',
  }) as Promise<void>
}

export const removeTopicFavorite = (topicId: string | number) => {
  return axios({
    url: `/me/favorite/${topicId}`,
    needAuth: true,
    method: 'DELETE',
  }) as Promise<void>
}

export const getTopicPostList = (
  topicId: string | number,
  from: number,
  size: number,
  cancelToken?: CancelToken
) => {
  return axios({
    url: `/Topic/${topicId}/post`,
    params: {
      from,
      size,
    },
    needAuth: true,
    cancelToken,
  }) as Promise<IPost[]>
}

export const getTopicTopPostList = (topicId: string | number, cancelToken?: CancelToken) => {
  return axios({
    url: `/Topic/${topicId}/hot-post`,
    needAuth: true,
    cancelToken,
  }) as Promise<IPost[]>
}

export const getTopicTrackPostList = (
  topicid: string | number,
  postid: string | number,
  from: number,
  size: number,
  cancelToken?: CancelToken
) => {
  return axios({
    url: `/post/topic/specific-user`,
    params: {
      topicid,
      postid,
      from,
      size,
    },
    cancelToken,
  })
}

export const getNewTopics = (from: number, size: number) => {
  return axios({
    url: '/topic/new',
    params: {
      from,
      size,
    },
  }) as Promise<ITopic[]>
}

export const getHotWeekly = () => {
  return axios('/topic/hot-weekly') as Promise<ITopic[]>
}

export const getHotMonthly = () => {
  return axios('/topic/hot-monthly') as Promise<ITopic[]>
}

export const getHotHistory = () => {
  return axios('/topic/hot-history') as Promise<ITopic[]>
}

export const getFolloweeTopics = (from: number, size: number) => {
  return axios({
    url: '/me/followee/topic',
    params: {
      from,
      size,
    },
  })
}

export const getCustomBoardTopics = (from: number, size: number) => {
  return axios({
    url: '/me/custom-board/topic',
    params: {
      from,
      size,
    },
    needAuth: true,
  })
}

export const searchTopics = (from: number, size: number, keyword: string) => {
  return axios({
    url: '/topic/search',
    params: {
      keyword,
      from,
      size,
    },
    needAuth: true,
  })
}
