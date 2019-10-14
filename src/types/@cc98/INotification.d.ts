declare module '@cc98/api' {
  import NOTIFICATION_TYPE from 'src/constants/NotificationType'

  interface INotificationReply {
    id: number
    isRead: boolean
    postId: number
    time: string
    topicId: number
    type: NOTIFICATION_TYPE
  }

  interface INotificationAt {
    id: number
    isRead: boolean
    postId: number
    time: string
    topicId: number
    type: NOTIFICATION_TYPE
  }

  interface INotificationSystem {
    content: string
    id: number
    isRead: boolean
    postId: number | null
    time: string
    title: string
    topicId: number | null
    type: NOTIFICATION_TYPE
  }
}
