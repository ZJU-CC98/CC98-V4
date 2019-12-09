import React from 'react'
import { IMessageContent, IUser } from '@cc98/api'
import { Waypoint } from 'react-waypoint'
import Button from 'src/components/Button'

import s from './RecentMessage.m.scss'

interface IRecentMessageProps {
  currentUser: IUser
  targetUser: IUser
}

const RecentMessage: React.FC<IRecentMessageProps> = ({ targetUser }) => {
  const contentRef = React.useRef<HTMLDivElement>(null)

  const [data, setData] = React.useState<IMessageContent[]>([])
  const [needScrollToBottom, setNeedScrollBottom] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    setNeedScrollBottom(true)
    setData([])
    setLoading(false)
    setIsLoaded(false)
  }, [targetUser.id])

  React.useEffect(() => {
    if (needScrollToBottom && contentRef.current) {
      setNeedScrollBottom(false)
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [needScrollToBottom])

  return (
    <div className={s.root}>
      <h3 className={s.title}>与 {targetUser.name} 的私信</h3>
      <div ref={contentRef}>
        {!loading && !isLoaded && <Waypoint />}
        {data.map(() => null)}
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
