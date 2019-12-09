import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { IBoard } from '@cc98/api'
import { getBoardInfo } from 'src/service/board'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import BoardHeader from 'src/pages/board/components/BoardHeader'
import BoardTopButtons from 'src/pages/board/components/BoardTopButtons'
import BoardContent from 'src/pages/board/components/BoardContent'
import BoardEvent from 'src/pages/board/components/BoardManage/BoardEvent'
import BoardStopUser from 'src/pages/board/components/BoardManage/BoardStopUser'
import { checkIsBoardMaster } from 'src/utils/permission'
import { RootStore } from 'src/store'
import BoardBatchManage from 'src/pages/board/components/BoardManage/BoardBatchManage'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import ERROR from 'src/constants/Error'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

import s from './Board.m.scss'

interface IBoardUrlMatch {
  id: string
}

const baseBreadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  {
    name: '版面列表',
    url: '/board-list',
  },
]

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

const Board: React.FC<RouteComponentProps<IBoardUrlMatch>> = ({ match }) => {
  const boardId = match.params.id
  const [boardInfo, setBoardInfo] = React.useState<IBoard | null>(null)
  const [key, setKey] = React.useState(0)
  const { user } = useSelector(selector)
  const dispatch = useDispatch()
  const breadcrumb = [...baseBreadcrumb, boardInfo ? boardInfo.name : '']

  useBreadcrumb(breadcrumb)
  useDocumentTitle(boardInfo?.name)

  React.useEffect(() => {
    getBoardInfo(boardId, true).then(board => {
      if (!board.canEntry) {
        dispatch({
          type: GLOBAL_ACTION_TYPES.SET_ERROR,
          payload: ERROR.BOARD_NO_PERMISSION,
        } as GlobalActions)
        return
      }
      setBoardInfo(board)
    })
  }, [boardId, key])

  if (!boardId) {
    return null
  }

  const refreshBoardInfo = () => {
    setKey(key + 1)
  }

  return (
    <div>
      {boardInfo && <BoardHeader refreshBoardInfo={refreshBoardInfo} data={boardInfo} />}
      {boardInfo && <BoardTopButtons data={boardInfo} />}
      <BoardContent boardInfo={boardInfo} boardId={boardId} />
      <div className={s.footer}>
        <BoardEvent boardId={boardId} />
        <BoardStopUser boardId={boardId} boardInfo={boardInfo} />
        {checkIsBoardMaster(boardInfo, user) && <BoardBatchManage />}
      </div>
    </div>
  )
}

export default Board
