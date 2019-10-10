import React from 'react'
import { IUser } from '@cc98/api'
import UserAvatar from 'src/components/UserAvatar'

interface IUserHomeContentProps {
  user: IUser
  buttons?: React.ReactNode
}

const UserHomeContent: React.FC<IUserHomeContentProps> = ({ user }) => {
  return (
    <div>
      <div>
        <UserAvatar user={user} size={160} />
      </div>
    </div>
  )
}

export default UserHomeContent
