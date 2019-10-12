import { IPost, ITopic } from '@cc98/api'
import { CancelTokenSource } from 'axios'
import { getTopicPostList, getTopicTopPostList, getTopicTrackPostList } from 'src/service/topic'

const PAGE_SIZE = 10

export function getTotalPage(
  isTracking: boolean,
  currentPage: number,
  topicInfo?: ITopic,
  post?: IPost
) {
  switch (true) {
    case isTracking && !!post && !!post.count:
      return Math.floor(post!.count! / PAGE_SIZE) + 1
    case !isTracking && !!topicInfo:
      return Math.floor((topicInfo!.replyCount + 1) / PAGE_SIZE) + 1
    default:
      return currentPage
  }
}

// 之所以写的这么丑
// 是为了并行获取普通帖子内容和热帖后
// 同时获取用户信息
export function getPosts(
  topicId: string,
  currentPage: number,
  isTracking: boolean,
  setPosts: (posts: IPost[]) => void,
  setHotPosts: (posts: IPost[]) => void,
  source: CancelTokenSource,
  postId?: string
): [Promise<IPost[]>, Promise<IPost[]> | undefined] {
  const from = (currentPage - 1) * PAGE_SIZE

  if (isTracking) {
    return [
      getTopicTrackPostList(topicId, postId!, from, PAGE_SIZE, source.token).then(data => {
        setPosts(data)
        setHotPosts([])
        return data
      }),
      undefined,
    ]
  }

  if (currentPage === 1) {
    return [
      getTopicPostList(topicId, from, PAGE_SIZE, source.token).then(data => {
        setPosts(data)
        return data
      }),
      getTopicTopPostList(topicId, source.token).then(data => {
        setHotPosts(data)
        return data
      }),
    ]
  }

  return [
    getTopicPostList(topicId, from, PAGE_SIZE, source.token).then(data => {
      setPosts(data)
      setHotPosts([])
      return data
    }),
    undefined,
  ]
}
