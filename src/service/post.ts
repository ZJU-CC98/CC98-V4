import axios from 'axios'
import { ILike } from '@cc98/api'

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
