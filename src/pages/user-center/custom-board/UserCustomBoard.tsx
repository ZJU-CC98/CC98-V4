import React from 'react'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'
import useBoardMap from 'src/hooks/useBoardMap'
import { IBoard } from '@cc98/api'
import BoardItem from 'src/pages/user-center/components/UserCenterListItem/BoardItem'

function selector(store: RootStore) {
  return {
    customBoardIds: store.global.currentUser?.customBoards || [],
  }
}

const UserCustomBoard: React.FC = () => {
  const { customBoardIds } = useSelector(selector)
  const boardMap = useBoardMap()

  if (customBoardIds.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: 14 }}>没有关注</p>
  }

  const boards = customBoardIds.map(id => boardMap[id]).filter(Boolean) as IBoard[]

  return (
    <>
      {boards.map(board => (
        <BoardItem key={board.id} board={board} />
      ))}
    </>
  )
}

export default UserCustomBoard
