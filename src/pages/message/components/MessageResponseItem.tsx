import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cn from 'classnames'
import { IBoard } from '@cc98/api'
import { IMessageItem } from 'src/pages/message/utils'
import { getNotificationTypeDesc } from 'src/constants/NotificationType'
import { EVENT, eventBus } from 'src/utils/event'

import s from './MessageResponseItem.m.scss'

interface IMessageResponseItemProps {
  item: IMessageItem
  boardMap: Record<number, IBoard>
}

const MessageResponseItem: React.FC<IMessageResponseItemProps> = ({ item, boardMap }) => {
  const { boardId, time, userId, userName, url, topicTitle, type } = item
  const [isRead, setIsRead] = React.useState(item.isRead)
  const boardName = (boardMap || {})[boardId].name || ''

  React.useEffect(() => {
    function setRead() {
      setIsRead(true)
    }

    eventBus.on(EVENT.SET_MESSAGE_READ, setRead)

    return () => {
      eventBus.off(EVENT.SET_MESSAGE_READ, setRead)
    }
  }, [])

  return (
    <div className={s.root}>
      <p className={s.row}>
        <Link className={s.board} to={`/board/${boardId}`}>
          {boardName}
        </Link>
        <span className={s.time}>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
      </p>
      <p className={cn(s.row, { [s.unread]: !isRead })}>
        <Link to={`/user/${userId}`}>{userName}</Link>
        在《
        <Link to={url}>{topicTitle}</Link>
        》中
        <span>{getNotificationTypeDesc(type)}</span>
        了你。
      </p>
    </div>
  )
}

export default MessageResponseItem
