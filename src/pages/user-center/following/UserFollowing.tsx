import React from 'react'
import { RouteComponentProps } from 'react-router'
import UserCenterContentList from 'src/pages/user-center/components/UserCenterContentList'
import { getMyFollowee, getUsersByIds } from 'src/service/user'
import UserItem from 'src/pages/user-center/components/UserCenterListItem/UserItem'
import { IUser } from '@cc98/api'
import { USER_CENTER_BASE_PATH } from 'src/pages/user-center/constants'

interface IUserFollowingRouteMatch {
  page?: string
}

const PAGE_SIZE = 10

// (...args) => Promise<IUser[]>
const service = (page: number, pageSize: number) =>
  getMyFollowee((page - 1) * PAGE_SIZE, pageSize).then(ids => {
    return getUsersByIds(ids, true).then(users => {
      // api 返回的用户信息是乱序的
      return ids // 换行
        .map(id => users.find(user => user.id === id))
        .filter(user => !!user) as IUser[]
    })
  })

const UserFollowing: React.FC<RouteComponentProps<IUserFollowingRouteMatch>> = ({
  match,
  history,
}) => {
  const { page = '1' } = match.params

  return (
    <UserCenterContentList
      emptyText="没有关注"
      currentPage={parseInt(page, 10)}
      pageSize={PAGE_SIZE}
      onPageChange={nextPage => {
        history.push(`${USER_CENTER_BASE_PATH}/following/${nextPage}`)
      }}
      service={service}
      renderItem={user => <UserItem user={user} />}
    />
  )
}

export default UserFollowing
