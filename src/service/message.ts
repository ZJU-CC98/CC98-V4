import axios from 'axios'
import {
  IMessageContent,
  IMessageCount,
  INotificationAt,
  INotificationReply,
  INotificationSystem,
  IRecentMessage,
} from '@cc98/api'

export function getAllMessageCount() {
  return axios({
    url: '/me/unread-count',
    withToken: true,
  }) as Promise<IMessageCount>
}

export const getNotificationReply = (from: number, size: number) => {
  return axios({
    url: '/notification/reply',
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<INotificationReply[]>
}

export const getNotificationAt = (from: number, size: number) => {
  return axios({
    url: '/notification/at',
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<INotificationAt[]>
}

export const getNotificationSystem = (from: number, size: number) => {
  return axios({
    url: '/notification/system',
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<INotificationSystem[]>
}

export const clearResponseNotification = () => {
  return axios({
    url: '/notification/read-all-reply',
    method: 'PUT',
    withToken: true,
  }) as Promise<void>
}

export const clearAtNotification = () => {
  return axios({
    url: '/notification/read-all-at',
    method: 'PUT',
    withToken: true,
  }) as Promise<void>
}

export const clearSystemNotification = () => {
  return axios({
    url: '/notification/read-all-system',
    method: 'PUT',
    withToken: true,
  }) as Promise<void>
}

export const getRecentContact = (from: number, size: number) => {
  return axios({
    url: '/message/recent-contact-users',
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<IRecentMessage[]>
}

export const getRecentMessageByUserId = (userId: string | number, from: number, size: number) => {
  return axios({
    url: `/message/user/${userId}`,
    params: {
      from,
      size,
    },
    withToken: true,
  }) as Promise<IMessageContent[]>
}

export const sendMessage = (receiverId: number, content: string) => {
  return axios({
    url: '/message',
    method: 'POST',
    withToken: true,
    data: {
      receiverId,
      content,
    },
  }) as Promise<void>
}
