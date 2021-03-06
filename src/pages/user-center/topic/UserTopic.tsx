import React from 'react'
import { getMyRecentTopics } from 'src/service/user'
import { RouteComponentProps } from 'react-router'
import List from 'src/components/List'
import { USER_CENTER_BASE_PATH } from 'src/pages/user-center/constants'
import TopicItem from 'src/pages/user-center/components/UserCenterListItem/TopicItem'
import useBoardMap from 'src/hooks/useBoardMap'

const PAGE_SIZE = 10

interface IUserTopicRouteMatch {
  page?: string
}

// (...args) => Promise<ITopic[]>
const service = (page: number, pageSize: number) =>
  getMyRecentTopics((page - 1) * PAGE_SIZE, pageSize)

const UserTopic: React.FC<RouteComponentProps<IUserTopicRouteMatch>> = ({ history, match }) => {
  const boardMap = useBoardMap()
  const { page = '1' } = match.params

  return (
    <List
      currentPage={parseInt(page, 10)}
      pageSize={PAGE_SIZE}
      onPageChange={nextPage => {
        history.push(`${USER_CENTER_BASE_PATH}/topic/${nextPage}`)
      }}
      renderItem={topic => <TopicItem boardMap={boardMap} topic={topic} />}
      service={service}
      emptyText="没有主题"
    />
  )
}

export default UserTopic
