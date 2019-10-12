import axios from 'axios'
import { ILike, IPost } from '@cc98/api'
import { IPostParams, ITopicParams } from 'src/service/topic'

export const getPostLikeState = (postId: number) => {
  return axios({
    url: `/post/${postId}/like`,
    needAuth: true,
  }) as Promise<ILike>
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
