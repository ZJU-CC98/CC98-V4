import React from 'react'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { keyBy, flatten, fromPairs } from 'lodash'
import { ITopic } from '@cc98/api'
import { getNewTopics } from 'src/service/topic'
import InfinityTopicList from 'src/components/InfinityTopicList'
import IUserMap from 'src/types/IUserMap'
import { getUsersByNames } from 'src/service/user'
import anonymousPortraitUrl from 'src/assets/user/anonymous.gif'
import { getAllBoard } from 'src/service/board'
import { getAllTag } from 'src/service/config'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '查看新帖',
]

const PAGE_SIZE = 20

const anonymous = {
  name: '匿名用户',
  portraitUrl: anonymousPortraitUrl,
}

const NewTopics: React.FC = () => {
  const [topics, setTopics] = React.useState<ITopic[]>([])
  const [userMap, setUserMap] = React.useState<IUserMap>({})
  const [boardMap, setBoardMap] = React.useState<{ [boardId: number]: string }>({})
  const [tagMap, setTagMap] = React.useState<{ [tagId: number]: string }>({})
  const [isLoading, setIsLoading] = React.useState(false)

  const getMore = () => {
    if (isLoading) return
    setIsLoading(true)
    getNewTopics(topics.length, PAGE_SIZE)
      .then(res => {
        setTopics([...topics, ...res])
        setIsLoading(false)
        return res
      })
      .then(res => {
        getUsersByNames(
          // 换行
          res.filter(topic => topic.userName).map(topic => topic.userName)
        ).then(users => {
          setUserMap({ ...userMap, ...keyBy(users, 'name') })
        })
      })
  }

  React.useEffect(() => {
    getAllBoard().then(boardGroups => {
      setBoardMap(
        fromPairs(flatten(boardGroups.map(item => item.boards)).map(item => [item.id, item.name]))
      )
    })
  }, [])

  React.useEffect(() => {
    getAllTag().then(tags => {
      setTagMap(fromPairs(tags.map(item => [item.id, item.name])))
    })
  }, [])

  useBreadcrumb(breadcrumb)

  return (
    <div>
      <InfinityTopicList
        data={topics}
        userMap={userMap}
        userFallback={anonymous}
        isLoading={isLoading}
        boardMap={boardMap}
        tagMap={tagMap}
        isLoaded={topics.length >= 100}
        onLoadMore={getMore}
      />
    </div>
  )
}

export default NewTopics
