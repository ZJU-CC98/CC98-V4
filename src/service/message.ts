import axios from 'axios'
import { IMessageCount } from '@cc98/api'

export function getAllMessageCount() {
  return axios({
    url: '/me/unread-count',
    needAuth: true,
  }) as Promise<IMessageCount>
}
