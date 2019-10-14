// 渲染一条 response 所必要的信息
import { getNotificationAt, getNotificationReply, getNotificationSystem } from 'src/service/message'
import { getBasicPosts } from 'src/service/post'
import { getBasicTopics } from 'src/service/topic'
import NOTIFICATION_TYPE from 'src/constants/NotificationType'
import { IBasicPost, IBasicTopic, INotificationAt, INotificationReply } from '@cc98/api'

export interface IMessageItem {
  id: number
  isRead: boolean
  url: string
  boardId: number
  topicTitle: string
  time: string
  userName: string
  userId: number
  type: NOTIFICATION_TYPE
}

export interface ISystemMessageItem {
  id: number
  content: string
  title: string
  time: string
  url: string | null
  isRead: boolean
}

export const PAGE_SIZE = 10

function getPostUrl(topic?: IBasicTopic | null, post?: IBasicPost | null) {
  if (!topic) {
    return null
  }

  if (!post) {
    return `/topic/${topic.id}/1#1`
  }

  const postPage = Math.floor((post.floor - 1) / 10) + 1
  const floor = (post.floor || 10) - (postPage - 1) * 10

  return `/topic/${topic.id}/${postPage}#${floor}`
}

function formatNotification(
  items: INotificationReply[] | INotificationAt[],
  topics: IBasicTopic[],
  posts: IBasicPost[]
) {
  return items
    .map<IMessageItem | null>(item => {
      const topic = topics.find(it => it.id === item.topicId)
      const post = posts.find(it => it.id === item.postId)

      if (!topic || !post) {
        return null
      }

      return {
        id: item.id,
        isRead: item.isRead,
        url: getPostUrl(topic, post) as string,
        boardId: topic.boardId,
        time: item.time,
        userName: post.userName,
        userId: post.userId,
        type: item.type,
        topicTitle: topic.title,
      }
    })
    .filter((item): item is IMessageItem => !!item)
}
// 一个聚合过的 service
export const getMessageResponse = async (
  page: number,
  pageSize: number
): Promise<IMessageItem[]> => {
  const replies = await getNotificationReply((page - 1) * PAGE_SIZE, pageSize)
  const [posts, topics] = await Promise.all([
    getBasicPosts(replies.map(item => item.postId)),
    getBasicTopics(replies.map(item => item.topicId)),
  ])

  return formatNotification(replies, topics, posts)
}

export const getMessageAt = async (page: number, pageSize: number): Promise<IMessageItem[]> => {
  const ats = await getNotificationAt((page - 1) * PAGE_SIZE, pageSize)
  const [posts, topics] = await Promise.all([
    getBasicPosts(ats.map(item => item.postId)),
    getBasicTopics(ats.map(item => item.topicId)),
  ])

  return formatNotification(ats, topics, posts)
}

export const getMessageSystem = async (
  page: number,
  pageSize: number
): Promise<ISystemMessageItem[]> => {
  const systems = await getNotificationSystem((page - 1) * PAGE_SIZE, pageSize)
  const [posts, topics] = await Promise.all([
    getBasicPosts(systems.map(item => item.postId).filter(item => !!item) as number[]),
    getBasicTopics(systems.map(item => item.topicId).filter(item => !!item) as number[]),
  ])

  return systems.map(item => {
    const topic = topics.find(it => it.id === item.topicId)
    const post = posts.find(it => it.id === item.postId)

    return {
      id: item.id,
      content: item.content,
      title: item.title,
      time: item.time,
      url: getPostUrl(topic, post),
      isRead: item.isRead,
    }
  })
}
