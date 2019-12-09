import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { IUser } from '@cc98/api'
import { getUserById, getUserRecentTopics } from 'src/service/user'
import UserHomeContent from 'src/pages/user-center/home/components/UserHomeContent'
import Button from 'src/components/Button'
import s from 'src/pages/user-center/home/Home.m.scss'
import { RECENT_TOPIC_PAGE_SIZE } from 'src/pages/user-center/home/constants'
import FollowButton from 'src/pages/user-center/components/FollowButton'

interface IUserHomeRouteMatch {
  id?: string
}

const UserHome: React.FC<RouteComponentProps<IUserHomeRouteMatch>> = ({ match }) => {
  const { id } = match.params
  const [user, setUser] = React.useState<IUser>()
  const { push } = useHistory()

  React.useEffect(() => {
    if (!id) return

    getUserById(id).then(setUser)
  }, [id])

  if (!id || !user) {
    return null
  }

  const topicService = (from: number) => getUserRecentTopics(id, from, RECENT_TOPIC_PAGE_SIZE)

  return (
    <UserHomeContent
      service={topicService}
      user={user}
      buttons={
        <>
          <span className={s.tag}>
            <span className={s.label}>收到的赞</span>
            <span className={s.info}>{user.receivedLikeCount}</span>
          </span>
          <Button
            className={s.button}
            style={{ marginRight: 32 }}
            primary
            onClick={() => push(`/message/message?name=${user.name}`)}
          >
            私信
          </Button>
          <FollowButton
            className={s.button}
            key={id}
            userId={id}
            initIsFollowing={user.isFollowing}
          />
        </>
      }
    />
  )
}

export default UserHome
