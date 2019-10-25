import axios from 'axios'
import { IBoard, IBoardEvent, IBoardGroup, IBoardStopPostUser, ITagGroup, ITopic } from '@cc98/api'

export function getAllBoard(ignoreCache?: boolean) {
  return axios({
    url: '/Board/all',
    ignoreCache,
  }) as Promise<IBoardGroup[]>
}

export function getBoardInfo(boardId: string | number, ignoreCache?: boolean) {
  return axios({ needAuth: true, url: `/board/${boardId}`, ignoreCache }) as Promise<IBoard>
}

export function searchBoard(keyword: string) {
  return axios({
    url: '/board/search',
    params: {
      keyword,
    },
  }) as Promise<IBoard[]>
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

export const searchBoardTopics = (boardId: string, keyword: string, from: number, size: number) => {
  return axios({
    url: `/topic/search/board/${boardId}`,
    params: {
      keyword,
      from,
      size,
    },
    needAuth: true,
  })
}

export const getBoardEvents = (boardId: string, from: number, size: number) => {
  return axios({
    url: `/board/${boardId}/events`,
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<{
    boardEvents: IBoardEvent[]
    count: number
  }>
}

export const getBoardStopPostUsers = (boardId: string, from: number, size: number) => {
  return axios({
    url: `/board/${boardId}/stop-post-user`,
    params: {
      from,
      size,
    },
    needAuth: true,
  }) as Promise<IBoardStopPostUser[]>
}

// 解除 tp
export const cancelBoardStopPostUser = (boardId: string | number, userId: number) => {
  return axios({
    url: `/board/${boardId}/stop-post-user/${userId}`,
    method: 'DETELE',
    needAuth: true,
  }) as Promise<void>
}

export const editBoardBigPaper = (boardId: string | number, bigPaper: string) => {
  return axios({
    url: `/board/${boardId}/big-paper`,
    method: 'PUT',
    needAuth: true,
    data: {
      content: bigPaper,
    },
  }) as Promise<void>
}
