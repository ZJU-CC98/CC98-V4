import React from 'react'
import { IBoardGroup } from '@cc98/api'
import { getAllBoard } from 'src/service/board'

import useBreadcrumb from 'src/hooks/useBreadcrumb'
import BoardGroupList from './BoardGroupItem'

const simpleBoardIds = [2, 29, 35, 37, 33, 604]
const defaultHideBoardIds = [2, 37]

const BoardList: React.FC = () => {
  const [data, setData] = React.useState<IBoardGroup[]>([])

  React.useEffect(() => {
    getAllBoard().then(setData)
  }, [])

  useBreadcrumb([])

  return (
    <>
      {data.map(boardGroup => (
        <BoardGroupList
          key={boardGroup.id}
          simple={simpleBoardIds.includes(boardGroup.id)}
          initShow={!defaultHideBoardIds.includes(boardGroup.id)}
          data={boardGroup}
        />
      ))}
    </>
  )
}

export default BoardList
