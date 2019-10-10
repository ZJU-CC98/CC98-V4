import React from 'react'
import { ITopic } from '@cc98/api'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import IBoardMap from 'src/types/IBoardMap'

import s from './TopicItem.m.scss'

interface ITopicItemProps {
  topic: ITopic
  boardMap: IBoardMap
}

const TopicItem: React.FC<ITopicItemProps> = ({ topic, boardMap }) => {
  return (
    <div className={s.root}>
      <p className={s.info}>
        <Link className={s.board} to={`/board/${topic.boardId}`}>
          {(boardMap[topic.boardId] || {}).name}
        </Link>
        <span>{dayjs(topic.time).format('YYYY-MM-DD HH:mm:ss')}</span>
      </p>
      <p>
        <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
      </p>
    </div>
  )
}

export default TopicItem
