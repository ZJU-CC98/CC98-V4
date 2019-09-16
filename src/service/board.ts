import axios from 'axios'
import { IBoard, IBoardGroup, ITagGroup, ITopic } from '@cc98/api'
import { stringify } from 'query-string'

export function getAllBoard() {
  return axios('/Board/all') as Promise<IBoardGroup[]>
}

export function getBoardInfo(boardId: string | number) {
  return axios(`/board/${boardId}`) as Promise<IBoard>
}

export function getBoardTopTopicList(boardid: string | number) {
  return axios(`/topic/toptopics?${stringify({ boardid })}`) as Promise<ITopic[]>
}

export function getBoardTopicList(boardId: string | number, size: number, from: number) {
  return axios(`/board/${boardId}/topic?${stringify({ size, from })}`) as Promise<ITopic[]>
}

export function getBoardBestTopicList(boardId: string | number, size: number, from: number) {
  return axios(`/topic/best/board/${boardId}?${stringify({ size, from })}`) as Promise<{
    count: number
    topics: ITopic[]
  }>
}

export function getBoardSaveTopicList(boardId: string | number, size: number, from: number) {
  return axios(`/topic/save/board/${boardId}?${stringify({ size, from })}`) as Promise<{
    count: number
    topics: ITopic[]
  }>
}

export function getBoardTopicByTag(
  boardId: string | number,
  size: number,
  from: number,
  tag1?: number,
  tag2?: number
) {
  return axios(
    `/topic/search/board/${boardId}/tag?${stringify({ size, from, tag1, tag2 })}`
  ) as Promise<{
    count: number
    topics: ITopic[]
  }>
}

export function getBoardTagData(boardId: string | number) {
  return axios(`/board/${boardId}/tag`) as Promise<ITagGroup[]>
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
