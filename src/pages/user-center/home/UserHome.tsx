import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IUser } from '@cc98/api'
import { getUserById } from 'src/service/user'
import UserHomeContent from 'src/pages/user-center/home/components/UserHomeContent'

interface IUserHomeRouteMatch {
  id?: string
}

const UserHome: React.FC<RouteComponentProps<IUserHomeRouteMatch>> = ({ match }) => {
  const { id } = match.params
  const [user, setUser] = React.useState<IUser>()

  React.useEffect(() => {
    if (!id) return

    getUserById(id).then(res => {
      setUser(res)
    })
  }, [id])

  if (!id || !user) {
    return null
  }

  return <UserHomeContent user={user} />
}

export default UserHome
