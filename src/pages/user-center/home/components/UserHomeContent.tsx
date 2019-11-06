import React from 'react'
import { ITopic, IUser } from '@cc98/api'
import UserAvatar from 'src/components/UserAvatar'

import InfinityUserTopicList from 'src/pages/user-center/home/components/InfinityUserTopicList'
import UserDisplayTitles from './UserDisplayTitles'
import UserInfo from './UserInfo'

import s from './UserHomeContent.m.scss'

interface IUserHomeContentProps {
  user: IUser
  buttons?: React.ReactNode
  service: (offset: number) => Promise<ITopic[]>
}

const UserHomeContent: React.FC<IUserHomeContentProps> = ({ user, buttons, service }) => {
  return (
    <div className={s.root}>
      <div className={s.top}>
        <div className={s.avatar}>
          <UserAvatar user={user} size={160} />
          <UserDisplayTitles user={user} />
        </div>
        <UserInfo user={user} buttons={buttons} />
      </div>
      <InfinityUserTopicList key={user.id} service={service} />
    </div>
  )
}

export default UserHomeContent
