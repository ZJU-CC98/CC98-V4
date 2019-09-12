import axios from 'axios'
import { IBoard, IBoardGroup } from '@cc98/api'
import { stringify } from 'query-string'

export function getAllBoard() {
  return axios('/Board/all') as Promise<IBoardGroup[]>
}

export function getBoardInfo(boardId: string | number) {
  return axios(`/board/${boardId}`) as Promise<IBoard>
}

export function getBoardTopTopicList(boardid: string | number) {
  return axios(`/topic/toptopics?${stringify({ boardid })}`)
}

export function getBoardTopicList(boardId: string | number, size: number, from: number) {
  return axios(`/board/${boardId}/topic?${stringify({ size, from })}`)
}

export function getBoardTagData(boardId: string | number) {
  return axios(`/board/${boardId}/tag`)
}

export function followBoard(boardId: number) {
  return axios({
    url: `/me/custom-board/${boardId}`,
    method: 'PUT',
    needAuth: true,
  })
}

export function unFollowBoard(boardId: number) {
  return axios({
    url: `/me/custom-board/${boardId}`,
    method: 'DELETE',
    needAuth: true,
  })
}
