import React from 'react'
import { uniqBy } from 'lodash'
import cn from 'classnames'
import { IRecentMessage, IUser } from '@cc98/api'
import { getRecentContact } from 'src/service/message'
import { getUsersByIds } from 'src/service/user'
import { Waypoint } from 'react-waypoint'
import Spin from 'src/components/Spin'

import s from './RecentContact.m.scss'

const PAGE_SIZE = 7

interface IRecentContactProps {
  initUser?: IUser
  initUserName?: string
  targetUser?: IUser
  onUserChange: (user: IUser) => void
}

interface IRecentItem extends IUser, IRecentMessage {}

const renderItem = (
  { portraitUrl, name, lastContent, id, isRead = true }: IUser & Partial<IRecentMessage>,
  isActive: boolean,
  onClick: () => void
) => (
  <div
    className={cn(s.item, { [s.active]: isActive, [s.unread]: !isRead })}
    key={id}
    onClick={onClick}
  >
    <img src={portraitUrl} />
    <div>
      <p className={s.name}>{name}</p>
      {lastContent && <p className={s.content}>{lastContent}</p>}
    </div>
  </div>
)

const RecentContact: React.FC<IRecentContactProps> = ({
  initUserName,
  initUser,
  onUserChange,
  targetUser,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const [data, setData] = React.useState<IRecentItem[]>([])

  const handleLoadMore = async () => {
    if (loading) return
    setLoading(true)

    const res = await getRecentContact(data.length, PAGE_SIZE)
    const users = await getUsersByIds(res.map(item => item.userId))
    const userMap = users.reduce((prev, curr) => {
      prev[curr.id] = curr
      return prev
    }, {} as { [key: number]: IUser })

    if (data.length === 0 && !initUserName && res.length) {
      onUserChange(userMap[res[0].userId])
    }

    setData(
      uniqBy(
        [
          ...data,
          ...res.map(item => ({
            ...item,
            ...(userMap[item.userId] || {}),
          })),
        ],
        'id'
      ).filter(item => item.id !== initUser?.id)
    )
    setLoading(false)
    if (res.length < PAGE_SIZE) setIsLoaded(true)
  }

  return (
    <div className={s.root}>
      <h3 className={s.title}>近期私信</h3>
      {initUser &&
        renderItem(initUser, initUser.id === targetUser?.id, () => onUserChange(initUser))}
      {data.map(item => renderItem(item, item.id === targetUser?.id, () => onUserChange(item)))}
      {!isLoaded && !loading && <Waypoint onEnter={handleLoadMore} />}
      {loading && <Spin />}
    </div>
  )
}

export default RecentContact
