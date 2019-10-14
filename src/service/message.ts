import axios from 'axios'
import { IMessageCount, INotificationAt, INotificationReply, INotificationSystem } from '@cc98/api'

export function getAllMessageCount() {
  return axios({
    url: '/me/unread-count',
    needAuth: true,
  }) as Promise<IMessageCount>
}

export const getNotificationReply = (from: number, size: number) => {
  return axios({
    url: '/notification/reply',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<INotificationReply[]>
}

export const getNotificationAt = (from: number, size: number) => {
  return axios({
    url: '/notification/at',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<INotificationAt[]>
}

export const getNotificationSystem = (from: number, size: number) => {
  return axios({
    url: '/notification/system',
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<INotificationSystem[]>
}

export const clearResponseNotification = () => {
  return axios({
    url: '/notification/read-all-reply',
    method: 'PUT',
    needAuth: true,
  }) as Promise<void>
}

export const clearAtNotification = () => {
  return axios({
    url: '/notification/read-all-at',
    method: 'PUT',
    needAuth: true,
  }) as Promise<void>
}

export const clearSystemNotification = () => {
  return axios({
    url: '/notification/read-all-system',
    method: 'PUT',
    needAuth: true,
  }) as Promise<void>
}
