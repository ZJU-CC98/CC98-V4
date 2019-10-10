import React from 'react'
import { IUser } from '@cc98/api'
import { getAvatarBoxImgUrl } from './config'

interface IUserAvatarProps {
  user: Pick<IUser, 'portraitUrl' | 'displayTitleId'>
  size: number
  showAvatarBox?: boolean
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ user, size, showAvatarBox = true }) => {
  const avatarBoxUrl = getAvatarBoxImgUrl(user)

  const imgStyle: React.CSSProperties = {
    width: size,
    height: size,
    position: 'relative',
    borderRadius: '50%',
    zIndex: 2,
  }

  const baseSize =
    user.displayTitleId === 82
      ? size * 1.3 // 吉祥物特供
      : size * 1.1

  const imgBoxStyle: React.CSSProperties = {
    position: 'absolute',
    width: baseSize,
    height: baseSize,
    top: -(baseSize - size) / 2,
    left: -(baseSize - size) / 2,
  }

  return (
    <div style={imgStyle}>
      <img style={imgStyle} src={user.portraitUrl} />
      {showAvatarBox && !!avatarBoxUrl && <img style={imgBoxStyle} src={avatarBoxUrl} />}
    </div>
  )
}

export default UserAvatar
