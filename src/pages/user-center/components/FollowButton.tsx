import React from 'react'
import { followUser, unFollowUser } from 'src/service/user'
import Button from 'src/components/Button'
import cn from 'classnames'
import s from './FollowButton.m.scss'

interface IFollowButtonProps {
  className?: string
  userId: string | number
  initIsFollowing: boolean
}

const FollowButton: React.FC<IFollowButtonProps> = ({ userId, initIsFollowing, className }) => {
  const [isFollowing, setIsFollowing] = React.useState(initIsFollowing)
  const [buttonText, setButtonText] = React.useState(initIsFollowing ? '已关注' : '关注')

  const handleFollowButtonClick = async () => {
    if (isFollowing) {
      await unFollowUser(userId)
      setButtonText('重新关注')
      setIsFollowing(false)
    } else {
      await followUser(userId)
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
    <Button
      primary
      className={cn(
        {
          [s.follow]: isFollowing,
        },
        className
      )}
      onClick={handleFollowButtonClick}
      onMouseEnter={handleFollowButtonMouseEnter}
      onFocus={handleFollowButtonMouseEnter}
      onMouseLeave={handleFollowButtonMouseLeave}
      onBlur={handleFollowButtonMouseLeave}
    >
      {buttonText}
    </Button>
  )
}

export default FollowButton
