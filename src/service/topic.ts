import axios, { CancelToken } from 'axios'
import { IBasicTopic, IPost, ITopic, ITopicIP, IVoteInfo, IVoteResult } from '@cc98/api'
import EDITOR_MODE from 'src/constants/EditorMode'
import TOPIC_TYPE from 'src/constants/TopicType'
import { stringify } from 'query-string'

export const getTopicInfo = (topicId: string | number) => {
  return axios({
    url: `/topic/${topicId}`,
    withToken: true,
  }) as Promise<ITopic>
}

export const getTopicIsFavorite = (topicId: string | number) => {
  return axios({
    url: `/topic/${topicId}/isfavorite`,
    withToken: true,
  }) as Promise<boolean>
}

export const setTopicFavorite = (topicId: string | number) => {
  return axios({
    url: `/me/favorite/${topicId}`,
    withToken: true,
    method: 'PUT',
  }) as Promise<void>
}

export const removeTopicFavorite = (topicId: string | number) => {
  return axios({
    url: `/me/favorite/${topicId}`,
    withToken: true,
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
    withToken: true,
    cancelToken,
  }) as Promise<IPost[]>
}

export const getTopicTopPostList = (topicId: string | number, cancelToken?: CancelToken) => {
  return axios({
    url: `/Topic/${topicId}/hot-post`,
    withToken: true,
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
    withToken: true,
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
    withToken: true,
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
    withToken: true,
  }) as Promise<string>
}

export const replyTopic = (topicId: string, post: IPostParams) => {
  return axios({
    url: `/topic/${topicId}/post`,
    method: 'POST',
    withToken: true,
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
    withToken: true,
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
    withToken: true,
  }) as Promise<void>
}

export const deleteTopics = (id: number[], reason: string) => {
  return axios({
    url: `/topic/multi-lock?${stringify({ id })}`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const getTopicIPInfo = (topicId: string | number) => {
  return axios({
    url: `/topic/${topicId}/look-ip`,
    withToken: true,
  }) as Promise<ITopicIP[]>
}

export const lockTopic = (topicId: string | number, reason: string, days: number) => {
  return axios({
    url: `/topic/${topicId}/lock`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
      value: days,
    },
  }) as Promise<void>
}

export const unlockTopic = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/lock`,
    method: 'DELETE',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const setTopicDisableHot = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/not-hot`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const cancelTopicDisableHot = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/not-hot`,
    method: 'DELETE',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const deleteTopic = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}`,
    method: 'DELETE',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const moveTopic = (
  topicId: string | number,
  targetBoardId: string | number,
  reason: string
) => {
  return axios({
    url: `/topic/${topicId}/moveto/${targetBoardId}`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const setTopicUp = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/up`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const setTopicToBoardTop = (topicId: string | number, reason: string, days: number) => {
  return axios({
    url: `/topic/${topicId}/top`,
    method: 'PUT',
    withToken: true,
    data: {
      topState: 2,
      reason,
      duration: days,
    },
  }) as Promise<void>
}

export const setTopicToSiteTop = (topicId: string | number, reason: string, days: number) => {
  return axios({
    url: `/topic/${topicId}/top`,
    method: 'PUT',
    withToken: true,
    data: {
      topState: 4,
      reason,
      duration: days,
    },
  }) as Promise<void>
}

export const cancelTopicTop = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/top`,
    method: 'DELETE',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const setTopicBest = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/best`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const cancelTopicBest = (topicId: string | number, reason: string) => {
  return axios({
    url: `/topic/${topicId}/best`,
    method: 'DELETE',
    withToken: true,
    data: {
      reason,
    },
  }) as Promise<void>
}

export const setTopicHighLight = (
  topicId: string | number,
  reason: string,
  days: number,
  isBold: boolean,
  isItalic: boolean,
  color: string
) => {
  return axios({
    url: `/topic/${topicId}/highlight`,
    method: 'PUT',
    withToken: true,
    data: {
      reason,
      duration: days,
      isBold,
      isItalic,
      color,
    },
  }) as Promise<void>
}

export const getVoteResult = (topicId: string | number) => {
  return axios({
    url: `/topic/${topicId}/vote`,
    withToken: true,
  }) as Promise<IVoteResult>
}

export const voteTopic = (topicId: string | number, items: number[]) => {
  return axios({
    url: `/topic/${topicId}/vote`,
    method: 'POST',
    withToken: true,
    data: {
      items,
    },
  }) as Promise<void>
}
