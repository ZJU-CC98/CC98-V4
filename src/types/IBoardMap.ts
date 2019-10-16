import { IBoard } from '@cc98/api'

export default interface IBoardMap {
  [boardId: number]: Pick<
    IBoard,
    'boardMasters' | 'description' | 'id' | 'name' | 'postCount' | 'todayCount' | 'topicCount'
  >
}
