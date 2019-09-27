import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import { replace } from 'connected-react-router'
import { IBoard } from '@cc98/api'
import { getBoardInfo } from 'src/service/board'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import BoardHeader from 'src/pages/board/components/BoardHeader'
import BoardTopButtons from 'src/pages/board/components/BoardTopButtons'
import BoardContent from 'src/pages/board/components/BoardContent'

interface IBoardUrlMatch {
  id?: string
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

const Board: React.FC<RouteComponentProps<IBoardUrlMatch>> = ({ match }) => {
  const boardId = match.params.id!
  const [boardInfo, setBoardInfo] = React.useState<IBoard | null>(null)
  const dispatch = useDispatch()
  const breadcrumb = [...baseBreadcrumb, boardInfo ? boardInfo.name : '']

  if (!boardId) {
    dispatch(replace('/'))
  }

  useBreadcrumb(breadcrumb)

  React.useEffect(() => {
    getBoardInfo(boardId).then(setBoardInfo)
  }, [boardId])

  if (!boardId) {
    return null
  }

  return (
    <div>
      {boardInfo && <BoardHeader data={boardInfo} />}
      {boardInfo && <BoardTopButtons data={boardInfo} />}
      <BoardContent boardInfo={boardInfo} boardId={boardId} />
    </div>
  )
}

export default Board
