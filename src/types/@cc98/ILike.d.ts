declare module '@cc98/api' {
  import LIKE_STATE from 'src/constants/LikeState'

  export type ILikeState = LIKE_STATE

  export interface ILike {
    /**
     * 踩数量
     */
    dislikeCount: number
    /**
     * 赞数量
     */
    likeCount: number
    /**
     * 赞/踩状态
     */
    likeState: ILikeState
  }
}
