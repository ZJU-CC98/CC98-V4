import { IBoard, IUser } from '@cc98/api'
import PRIVILEGE from 'src/constants/Privilege'

export function checkIsBoardMaster(boardInfo: IBoard | null, user: IUser | null) {
  if (!user) {
    return false
  }

  if (user.privilege === PRIVILEGE.ADMIN || user.privilege === PRIVILEGE.SUPER_BOARD_MASTER) {
    return true
  }

  if (!boardInfo) {
    return false
  }

  return boardInfo.boardMasters.includes(user.name)
}
