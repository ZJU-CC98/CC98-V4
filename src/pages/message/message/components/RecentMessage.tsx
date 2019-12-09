import React from 'react'
import { IMessageContent, IUser } from '@cc98/api'
import dayjs from 'dayjs'
import cn from 'classnames'
import Button from 'src/components/Button'
import { getRecentMessageByUserId } from 'src/service/message'
import { IMessageContentGroup, transformMessageToGroup } from 'src/pages/message/message/utils'
import UbbContainer from 'src/ubb'

import s from './RecentMessage.m.scss'

const PAGE_SIZE = 10

interface IRecentMessageProps {
  currentUser: IUser
  targetUser: IUser
}

const renderMessageItem = (
  { senderId, id, content }: IMessageContent,
  currentUser: IUser,
  targetUser: IUser
) => {
  // 这条消息是当前登录用户发送的
  const isCurrentUser = senderId === currentUser.id

  return (
    <div
      className={cn(s.item, { [s.sender]: isCurrentUser, [s.receiver]: !isCurrentUser })}
      key={id}
    >
      {isCurrentUser && (
        <div className={s.message}>
          <UbbContainer text={content} />
        </div>
      )}
      <img
        className={s.avatar}
        src={isCurrentUser ? currentUser.portraitUrl : targetUser.portraitUrl}
      />
      {!isCurrentUser && (
        <div className={s.message}>
          <UbbContainer text={content} />
        </div>
      )}
    </div>
  )
}

const RecentMessage: React.FC<IRecentMessageProps> = ({ targetUser, currentUser }) => {
  const contentRef = React.useRef<HTMLDivElement>(null)

  const [data, setData] = React.useState<IMessageContentGroup[]>([])
  const [needScrollToBottom, setNeedScrollBottom] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const [value, setValue] = React.useState('')

  const handleLoad = (init?: boolean) => {
    setLoading(true)
    const { scrollHeight = 0, scrollTop = 0 } = contentRef.current || {}
    const scrollBottom = scrollHeight - scrollTop

    getRecentMessageByUserId(
      targetUser.id,
      init ? 0 : data.reduce((length, { message }) => length + message.length, 0),
      PAGE_SIZE
    ).then(res => {
      setData(prevData => [...transformMessageToGroup(res), ...prevData])
      setLoading(false)

      if (res.length < PAGE_SIZE) {
        setIsLoaded(true)
      }

      if (contentRef.current) {
        if (needScrollToBottom) {
          setNeedScrollBottom(false)
          contentRef.current.scrollTop = contentRef.current.scrollHeight
        } else {
          contentRef.current.scrollTop = contentRef.current.scrollHeight - scrollBottom
        }
      }
    })
  }

  React.useEffect(() => {
    setNeedScrollBottom(true)
    setData([])
    setLoading(false)
    setIsLoaded(false)
    handleLoad(true)
  }, [targetUser.id])

  return (
    <div className={s.root}>
      <h3 className={s.title}>与 {targetUser.name} 的私信</h3>
      <div className={s.contentWrapper}>
        <div className={s.content} ref={contentRef}>
          {!loading && !isLoaded && (
            <div className={s.loadMore} onClick={() => handleLoad()}>
              点击加载更多
            </div>
          )}
          {loading && <div className={s.loading}>加载中</div>}
          {data.map(({ time, message }) => (
            <React.Fragment key={time}>
              <p className={s.time}>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</p>
              {message.map(item => renderMessageItem(item, currentUser, targetUser))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={s.editor}>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="请输入要发送的私信内容"
        />
        <Button primary>发送</Button>
      </div>
    </div>
  )
}

export default RecentMessage
