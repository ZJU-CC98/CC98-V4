import React from 'react'
import { RootStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import Button from 'src/components/Button'
import { getCustomBoardTopics } from 'src/service/topic'
import { getBoardTopicList } from 'src/service/board'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'

import s from './FocusBoard.m.scss'

function selector(state: RootStore) {
  return {
    customBoards: state.global.currentUser ? state.global.currentUser.customBoards : [],
  }
}

const ALL_BOARD = 0
const PAGE_SIZE = 20

const FocusBoard: React.FC = () => {
  const { customBoards } = useSelector(selector)
  const dispatch = useDispatch()

  const [currentBoardId, setCurrentBoardId] = React.useState(ALL_BOARD)

  const service =
    currentBoardId === ALL_BOARD
      ? (from: number) => getCustomBoardTopics(from, PAGE_SIZE)
      : (from: number) => getBoardTopicList(currentBoardId, PAGE_SIZE, from)

  const [props, { setData }] = useInfTopicModel(service)
  const { data, boardMap } = props

  React.useEffect(() => {
    setData([])
  }, [currentBoardId])

  return (
    <>
      <div className={s.title}>
        <Button
          className={s.button}
          primary
          border={currentBoardId !== ALL_BOARD}
          onClick={() => setCurrentBoardId(ALL_BOARD)}
        >
          全部帖子
        </Button>
        {customBoards.map(item => (
          <Button
            className={s.button}
            key={item}
            primary
            border={item !== currentBoardId}
            onClick={() => setCurrentBoardId(item)}
            onDoubleClick={() => {
              dispatch(push(`/board/${item}`))
            }}
          >
            {boardMap[item]}
          </Button>
        ))}
        <p className={s.info}>提示：单击版面标签可切换下方展示内容，双击可直接进入版面</p>
      </div>
      <InfinityTopicList {...props} isLoaded={data.length >= 100} showNoMore />
    </>
  )
}

export default FocusBoard
