import React from 'react'
import { Link } from 'react-router-dom'
import { IBoard } from '@cc98/api'
import BoardImg from 'src/components/BoardImg'
import Button from 'src/components/Button'
import { followBoard, unFollowBoard } from 'src/service/board'

import s from './BoardItem.m.scss'

interface IBoardItemProps {
  board: IBoard
}

const BoardItem: React.FC<IBoardItemProps> = ({ board }) => {
  const [isFollowing, setIsFollowing] = React.useState(true)

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (isFollowing) {
      await unFollowBoard(board.id)
      setIsFollowing(false)
    } else {
      await followBoard(board.id)
      setIsFollowing(true)
    }
  }

  return (
    <div className={s.root}>
      <Link to={`/board/${board.id}`}>
        <BoardImg board={board} size={112} />
      </Link>
      <div className={s.info}>
        <h3>
          <Link to={`/board/${board.id}`}>{board.name}</Link>
        </h3>
        <p>
          <span>版主：{board.boardMasters.join(' ')} </span>
          <span>今日主题</span>
          <span> {board.todayCount} </span>
          <span> / </span>
          <span>总主题</span>
          <span> {board.topicCount} </span>
        </p>
      </div>
      <Button onClick={handleButtonClick}>{isFollowing ? '取消关注' : '重新关注'}</Button>
    </div>
  )
}

export default BoardItem
