import axios from 'axios'
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

export const getTopicPostList = (topicId: string | number, from: number, size: number) => {
  return axios({
    url: `/Topic/${topicId}/post`,
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<IPost[]>
}

export const getTopicTopPostList = (topicId: string | number) => {
  return axios({
    url: `/Topic/${topicId}/hot-post`,
    needAuth: true,
  }) as Promise<IPost[]>
}

export const getTopicTrackPostList = (
  topicid: string | number,
  postid: string | number,
  from: number,
  size: number
) => {
  return axios({
    url: `/post/topic/specific-user`,
    params: {
      topicid,
      postid,
      from,
      size,
    },
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
