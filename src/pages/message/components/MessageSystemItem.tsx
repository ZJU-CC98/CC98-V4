import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cn from 'classnames'
import { ISystemMessageItem } from 'src/pages/message/utils'
import { EVENT, eventBus } from 'src/utils/event'

import s from './MessageSystemItem.m.scss'

interface IMessageSystemItemProps {
  item: ISystemMessageItem
}

const MessageSystemItem: React.FC<IMessageSystemItemProps> = ({ item }) => {
  const { content, title, time, url } = item
  const [isRead, setIsRead] = React.useState(item.isRead)

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
        <span className={s.board}>{title}</span>
        <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
      </p>
      <p className={cn(s.row, { [s.unread]: !isRead })}>
        {url ? <Link to={url}>{content}</Link> : content}
      </p>
    </div>
  )
}

export default MessageSystemItem
