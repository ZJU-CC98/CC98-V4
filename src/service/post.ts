import axios from 'axios'
import { ILike } from '@cc98/api'

export const getPostLikeState = (postId: number) => {
  return axios({
    url: `/post/${postId}/like`,
    needAuth: true,
  }) as Promise<ILike>
}
