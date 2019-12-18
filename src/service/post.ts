import axios from 'axios'
import { IBasicPost, ILike, IPost } from '@cc98/api'
import { IPostParams, ITopicParams } from 'src/service/topic'
import { stringify } from 'query-string'
import LIKE_STATE from 'src/constants/LikeState'

export const getPostLikeState = (postId: number) => {
  return axios({
    url: `/post/${postId}/like`,
    withToken: true,
  }) as Promise<ILike>
}

export const setPostLikeState = (postId: number, likeState: LIKE_STATE) => {
  return axios({
    url: `/post/${postId}/like`,
    method: 'PUT',
    data: `${likeState}`,
    headers: {
      'Content-Type': 'application/json',
    },
    withToken: true,
  }) as Promise<void>
}

export const atUsersInPost = (
  topicId: string | number,
  postId: string | number,
  userNames: string[]
) => {
  return axios({
    url: '/notification/at',
    params: {
      topicid: topicId,
      postid: postId,
    },
    withToken: true,
    silent: true,
    method: 'POST',
    data: userNames,
  }) as Promise<void>
}

export const getPost = (postId: string) => {
  return axios({
    url: `/post/${postId}/original`,
    withToken: true,
  }) as Promise<IPost>
}

export const editPost = (postId: string, post: IPostParams | ITopicParams) => {
  return axios({
    url: `/post/${postId}`,
    method: 'PUT',
    withToken: true,
    data: post,
  }) as Promise<void>
}

export const getBasicPosts = (postIds: number[]) => {
  if (!postIds.length) {
    return Promise.resolve([])
  }

  return axios({
    url: `/post/basic?${stringify({ id: postIds })}`,
    withToken: true,
  }) as Promise<IBasicPost[]>
}

export const ratePost = (postId: string | number, reason: string, value: number) => {
  return axios({
    url: `/post/${postId}/rating`,
    method: 'PUT',
    data: {
      reason,
      value,
    },
    withToken: true,
    silent: true,
  })
}

export const operatePost = (
  postId: number,
  content: {
    reason: string
    wealth?: number
    operationType: 0 | 1
    prestige?: number
    stopPostDays?: number
  }
) => {
  return axios({
    url: `/post/${postId}/operation`,
    method: 'POST',
    data: content,
    withToken: true,
    silent: true,
  }) as Promise<void>
}

export const deletePost = (postId: number, reason: string) => {
  return axios({
    url: `/post/${postId}`,
    method: 'DELETE',
    withToken: true,
    data: {
      reason,
    },
    silent: true,
  }) as Promise<void>
}
