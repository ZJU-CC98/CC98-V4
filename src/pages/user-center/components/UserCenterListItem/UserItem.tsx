import React from 'react'
import { IUser } from '@cc98/api'
import { Link, useHistory } from 'react-router-dom'
import Button from 'src/components/Button'
import FollowButton from 'src/pages/user-center/components/FollowButton'

import s from './UserItem.m.scss'

interface IUserItemProps {
  user: IUser
}

const UserItem: React.FC<IUserItemProps> = ({ user }) => {
  const { push } = useHistory()

  return (
    <div className={s.item}>
      <img className={s.avatar} src={user.portraitUrl} />
      <p className={s.name}>
        <Link to={`/user/${user.id}`}>{user.name}</Link>
      </p>
      <p className={s.info}>
        <span>帖数</span>
        <span className={s.postCount}>{user.postCount}</span>
        <span>粉丝</span>
        <span className={s.fanCount}>{user.fanCount}</span>
      </p>
      <FollowButton className={s.button} userId={user.id} initIsFollowing={user.isFollowing} />
      <Button
        primary
        className={s.button}
        onClick={() => push(`/message/message?name=${user.name}`)}
      >
        私信
      </Button>
    </div>
  )
}

export default UserItem
