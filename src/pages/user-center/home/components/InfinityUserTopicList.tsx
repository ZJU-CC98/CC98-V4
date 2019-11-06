import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { ITopic } from '@cc98/api'
import IBoardMap from 'src/types/IBoardMap'
import { Waypoint } from 'react-waypoint'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import { RECENT_TOPIC_PAGE_SIZE } from 'src/pages/user-center/home/constants'

import s from './InfinityUserTopicList.m.scss'

interface IInfinityUserTopicListProps {
  service: (offset: number) => Promise<ITopic[]>
}

const renderTopicItem = ({ boardId, time, title }: ITopic, boardMap: IBoardMap) => (
  <div className={s.topic}>
    <p className={s.topicInfo}>
      <Link className={s.boardName} to={`/board/${boardId}`}>
        {boardMap[boardId] && boardMap[boardId].name}
      </Link>
      <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
    </p>
    <p>{title}</p>
  </div>
)

const InfinityUserTopicList: React.FC<IInfinityUserTopicListProps> = ({ service }) => {
  const [{ data, boardMap, onLoadMore, isLoaded, isLoading }] = useInfTopicModel(
    service,
    res => res.length < RECENT_TOPIC_PAGE_SIZE
  )

  return (
    <div>
      <p className={s.title}>发表的主题</p>
      {data.map(topic => renderTopicItem(topic, boardMap))}
      {!isLoading && !isLoaded && <Waypoint onEnter={onLoadMore} />}
    </div>
  )
}

export default InfinityUserTopicList
