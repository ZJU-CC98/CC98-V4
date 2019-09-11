import axios from 'axios'
import { IBoardGroup } from '@cc98/api'

export function getAllBoard() {
  return axios('/Board/all') as Promise<IBoardGroup[]>
}
