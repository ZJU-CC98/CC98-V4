import React from 'react'
import { IUser } from '@cc98/api'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import Button from 'src/components/Button'
import { followUser, unFollowUser } from 'src/service/user'

import s from './UserItem.m.scss'

interface IUserItemProps {
  user: IUser
}

const UserItem: React.FC<IUserItemProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = React.useState(user.isFollowing)
  const [buttonText, setButtonText] = React.useState(user.isFollowing ? '已关注' : '关注')

  const handleFollowButtonClick = async () => {
    if (isFollowing) {
      await unFollowUser(user.id)
      setButtonText('重新关注')
      setIsFollowing(false)
    } else {
      await followUser(user.id)
      setButtonText('已关注')
      setIsFollowing(true)
    }
  }

  const handleFollowButtonMouseEnter = () => {
    if (isFollowing) {
      setButtonText('取消关注')
    }
  }

  const handleFollowButtonMouseLeave = () => {
    if (isFollowing) {
      setButtonText('已关注')
    }
  }

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
      <Button
        primary
        className={cn(s.button, {
          [s.follow]: isFollowing,
        })}
        onClick={handleFollowButtonClick}
        onMouseEnter={handleFollowButtonMouseEnter}
        onFocus={handleFollowButtonMouseEnter}
        onMouseLeave={handleFollowButtonMouseLeave}
        onBlur={handleFollowButtonMouseLeave}
      >
        {buttonText}
      </Button>
      <Button primary className={s.button}>
        私信
      </Button>
    </div>
  )
}

export default UserItem
