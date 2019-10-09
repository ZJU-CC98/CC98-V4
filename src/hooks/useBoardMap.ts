import React from 'react'
import { flatten, fromPairs } from 'lodash'
import { compose, map, noop } from 'lodash/fp'
import { IBoard, IBoardGroup } from '@cc98/api'
import { getAllBoard } from 'src/service/board'
import IBoardMap from 'src/types/IBoardMap'

export default function useBoardMap() {
  const [boardMap, setBoardMap] = React.useState<IBoardMap>({})

  React.useEffect(() => {
    getAllBoard().then(
      compose(
        noop,
        setBoardMap,
        fromPairs,
        map((item: IBoard) => [item.id, item]),
        flatten,
        map((item: IBoardGroup) => item.boards)
      )
    )
  }, [])

  return boardMap
}
