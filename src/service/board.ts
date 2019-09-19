import axios from 'axios'
import { IBoard, IBoardGroup, ITagGroup, ITopic } from '@cc98/api'

export function getAllBoard() {
  return axios('/Board/all') as Promise<IBoardGroup[]>
}

export function getBoardInfo(boardId: string | number) {
  return axios({ needAuth: true, url: `/board/${boardId}` }) as Promise<IBoard>
}

export function getBoardTopTopicList(boardid: string | number) {
  return axios({ url: '/topic/toptopics', params: { boardid }, needAuth: true }) as Promise<
    ITopic[]
  >
}

export function getBoardTopicList(boardId: string | number, size: number, from: number) {
  return axios({
    url: `/board/${boardId}/topic`,
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<ITopic[]>
}

export function getBoardBestTopicList(boardId: string | number, size: number, from: number) {
  return axios({
    url: `/topic/best/board/${boardId}`,
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<{
    count: number
    topics: ITopic[]
  }>
}

export function getBoardSaveTopicList(boardId: string | number, size: number, from: number) {
  return axios({
    url: `/topic/save/board/${boardId}`,
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<{
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
  return axios({
    url: `/topic/search/board/${boardId}/tag`,
    params: {
      size,
      from,
      tag1,
      tag2,
    },
    needAuth: true,
  }) as Promise<{
    count: number
    topics: ITopic[]
  }>
}

export function getBoardTagData(boardId: string | number) {
  return axios({ url: `/board/${boardId}/tag`, needAuth: true }) as Promise<ITagGroup[]>
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
