import { IBoard, IPost, ITopic, IUser } from '@cc98/api'
import PRIVILEGE from 'src/constants/Privilege'

const YI_LU_ZOU_LAI_BOARD_ID = 144

export function checkIsPrivilegeDog(user: IUser) {
  return user.privilege === PRIVILEGE.ADMIN || user.privilege === PRIVILEGE.SUPER_BOARD_MASTER
}

export function checkIsBoardMaster(boardInfo?: IBoard | null, user?: IUser | null) {
  if (!user) {
    return false
  }

  if (checkIsPrivilegeDog(user)) {
    return true
  }

  if (!boardInfo) {
    return false
  }

  return boardInfo.boardMasters.includes(user.name)
}

export function checkCanEditPost(post: IPost, currentUser?: IUser | null, boardInfo?: IBoard) {
  if (checkIsBoardMaster(boardInfo, currentUser)) {
    return true
  }

  return !!post.isMe
}

export function checkCanManagePost(
  boardInfo?: IBoard,
  topicInfo?: ITopic,
  currentUser?: IUser | null
) {
  if (checkIsBoardMaster(boardInfo, currentUser)) {
    return true
  }

  if (!topicInfo || !currentUser || !boardInfo) {
    return false
  }

  return boardInfo.id === YI_LU_ZOU_LAI_BOARD_ID && topicInfo.userId === currentUser.id
}
