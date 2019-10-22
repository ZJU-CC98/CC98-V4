import axios, { CancelToken } from 'axios'
import { IBasicTopic, IPost, ITopic, ITopicIP, IVoteInfo } from '@cc98/api'
import EDITOR_MODE from 'src/constants/EditorMode'
import TOPIC_TYPE from 'src/constants/TopicType'
import { stringify } from 'query-string'

export const getTopicInfo = (topicId: string | number) => {
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

export interface IPostParams {
  /**
   * 标题
   */
  title: string
  /**
   * 回帖内容
   */
  content: string
  /**
   * 回帖格式
   */
  contentType: EDITOR_MODE

  // 所引用的 postId
  parentId?: number
}

export interface ITopicParams extends IPostParams {
  /**
   * 帖子类型
   */
  type: TOPIC_TYPE
  /**
   * 收到回复是否通知发帖人
   */
  notifyPoster: boolean
  isVote?: boolean
  tag1?: number
  tag2?: number
  voteInfo?: IVoteInfo
}

export const postTopic = (boardId: string, topic: ITopicParams) => {
  return axios({
    url: `/board/${boardId}/topic`,
    method: 'POST',
    data: topic,
    needAuth: true,
  }) as Promise<string>
}

export const replyTopic = (topicId: string, post: IPostParams) => {
  return axios({
    url: `/topic/${topicId}/post`,
    method: 'POST',
    needAuth: true,
    data: post,
    silent: true,
  }) as Promise<string>
}

export const getBasicTopics = (topicIds: number[]) => {
  if (!topicIds.length) {
    return Promise.resolve([])
  }

  return axios({
    url: `/topic/basic?${stringify({ id: topicIds })}`,
    needAuth: true,
  }) as Promise<IBasicTopic[]>
}

export const lockTopics = (id: number[], reason: string, value: number) => {
  return axios({
    url: `/topic/multi-lock?${stringify({ id })}`,
    method: 'PUT',
    data: {
      reason,
      value,
    },
    needAuth: true,
  }) as Promise<void>
}

export const deleteTopics = (id: number[], reason: string) => {
  return axios({
    url: `/topic/multi-lock?${stringify({ id })}`,
    method: 'PUT',
    needAuth: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const getTopicIPInfo = (topicId: string | number) => {
  return axios({
    url: `/topic/${topicId}/look-ip`,
    needAuth: true,
  }) as Promise<ITopicIP[]>
}
