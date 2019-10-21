import axios from 'axios'
import { IBasicPost, ILike, IPost } from '@cc98/api'
import { IPostParams, ITopicParams } from 'src/service/topic'
import { stringify } from 'query-string'
import LIKE_STATE from 'src/constants/LikeState'

export const getPostLikeState = (postId: number) => {
  return axios({
    url: `/post/${postId}/like`,
    needAuth: true,
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
    needAuth: true,
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
    needAuth: true,
    silent: true,
    method: 'POST',
    data: userNames,
  }) as Promise<void>
}

export const getPost = (postId: string) => {
  return axios({
    url: `/post/${postId}/original`,
    needAuth: true,
  }) as Promise<IPost>
}

export const editPost = (postId: string, post: IPostParams | ITopicParams) => {
  return axios({
    url: `/post/${postId}`,
    method: 'PUT',
    needAuth: true,
    data: post,
  }) as Promise<void>
}

export const getBasicPosts = (postIds: number[]) => {
  if (!postIds.length) {
    return Promise.resolve([])
  }

  return axios({
    url: `/post/basic?${stringify({ id: postIds })}`,
    needAuth: true,
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
    needAuth: true,
    silent: true,
  })
}
