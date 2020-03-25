import React from 'react'
import { followUser, unFollowUser } from 'src/service/user'
import Button, { IButtonProps } from 'src/components/Button'
import cn from 'classnames'
import s from './FollowButton.m.scss'

interface IFollowButtonProps {
  className?: string
  userId: string | number
  initIsFollowing: boolean
  buttonProps?: IButtonProps

  // 已关注时显示
  followingText?: string
  // 已关注且按钮 hover 时显示
  followingHoverText?: string
  // 未关注时显示
  notFollowingText?: string
  // 取关后显示
  reFollowingText?: string
}

const FollowButton: React.FC<IFollowButtonProps> = ({
  userId,
  initIsFollowing,
  className,
  buttonProps = {},
  followingText = '已关注',
  followingHoverText = '取消关注',
  notFollowingText = '关注',
  reFollowingText = '重新关注',
}) => {
  const [isFollowing, setIsFollowing] = React.useState(initIsFollowing)
  const [buttonText, setButtonText] = React.useState(
    initIsFollowing ? followingText : notFollowingText
  )

  const handleFollowButtonClick = async () => {
    if (isFollowing) {
      await unFollowUser(userId)
      setButtonText(reFollowingText)
      setIsFollowing(false)
    } else {
      await followUser(userId)
      setButtonText(followingText)
      setIsFollowing(true)
    }
  }

  const handleFollowButtonMouseEnter = () => {
    if (isFollowing) {
      setButtonText(followingHoverText)
    }
  }

  const handleFollowButtonMouseLeave = () => {
    if (isFollowing) {
      setButtonText(followingText)
    }
  }

  return (
    <Button
      {...buttonProps}
      primary
      className={cn(
        {
          [s.follow]: isFollowing,
        },
        className,
        buttonProps.className
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
