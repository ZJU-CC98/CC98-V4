import React from 'react'
import { ITopic, IUser } from '@cc98/api'
import { Link } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faClock, faEye } from '@fortawesome/free-regular-svg-icons'

import IUserMap from 'src/types/IUserMap'
import { stringify } from 'query-string'
import SEARCH_TYPE from 'src/constants/SearchType'
import { formatCount, formatTime } from './utils'
import s from './index.m.scss'

type BoardMap = Record<
  number, // boardId
  string // boardName
>
type TagMap = Record<
  number, // tagId
  string // tagName
>

// 渲染一个 topic 所必要的用户信息
type BasicUser = Pick<IUser, 'name' | 'portraitUrl'> & Pick<Partial<IUser>, 'id'>

interface IInfinityTopicListProps {
  data: ITopic[]

  onLoadMore?: () => void
  isLoaded?: boolean
  isLoading?: boolean

  userMap: IUserMap
  userFallback: BasicUser

  boardMap: BoardMap
  tagMap: TagMap
}

const renderTags = ({ tag1, tag2 }: ITopic, tagMap: TagMap) => {
  if (tag1 && tag2) {
    return (
      <span>
        标签：{tagMap[tag1]} / {tagMap[tag2]}
      </span>
    )
  }

  if (tag1 || tag2) {
    return <span>标签：{tagMap[tag1 || tag2]}</span>
  }

  return null
}

const renderTopicItem = (
  topic: ITopic,
  { portraitUrl, id, name }: BasicUser,
  { boardName, boardId }: { boardId: number; boardName: string },
  tagMap: TagMap
) => (
  <div className={s.root} key={topic.id}>
    <Link to={id ? `/user/id/${id}` : '#'} className={s.user}>
      <img className={s.avatar} src={portraitUrl} />
      <span>{name}</span>
    </Link>
    <div className={s.content}>
      <h3 className={s.title}>
        <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
      </h3>
      <p className={s.info}>
        {renderTags(topic, tagMap)}
        <span>
          <span className={s.icon}>
            <Icon icon={faClock} />
          </span>
          <span>{formatTime(topic.time)}</span>
        </span>
        <span>
          <span className={s.icon}>
            <Icon icon={faEye} />
          </span>
          <span>{formatCount(topic.hitCount)}</span>
        </span>
        <span>
          <span>
            最后回复：
            {topic.lastPostUser ? (
              <Link
                to={{
                  pathname: '/search',
                  search: stringify({
                    type: SEARCH_TYPE.USER,
                    keyword: topic.lastPostUser,
                  }),
                }}
              >
                {topic.lastPostUser}
              </Link>
            ) : (
              '匿名'
            )}
          </span>
          <Link
            to={`/topic/${topic.id}/${Math.ceil((topic.replyCount + 1) / 10)}#${(topic.replyCount +
              1) %
              10}`}
            style={{ marginLeft: 12 }}
          >
            {formatTime(topic.lastPostTime)}
          </Link>
        </span>
      </p>
    </div>
    <Link to={`/board/${boardId}`} className={s.board}>
      <span>{boardName}</span>
    </Link>
  </div>
)

const InfinityTopicList: React.FC<IInfinityTopicListProps> = ({
  data,
  onLoadMore,
  isLoaded = true,
  isLoading = false,
  userMap,
  userFallback,
  boardMap,
  tagMap,
}) => {
  return (
    <>
      {data.map(item =>
        renderTopicItem(
          item,
          userMap[item.userName] || userFallback,
          {
            boardId: item.boardId,
            boardName: boardMap[item.boardId],
          },
          tagMap
        )
      )}
      {isLoading && <div />}
      {!isLoaded && <Waypoint onEnter={onLoadMore} />}
    </>
  )
}

export default InfinityTopicList
