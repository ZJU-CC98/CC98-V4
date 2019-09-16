import React from 'react'
import { ITag, ITopic } from '@cc98/api'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { get } from 'lodash'
import Tippy from '@tippy.js/react'
import { Link } from 'react-router-dom'
import { stringify } from 'query-string'
import dayjs from 'dayjs'
import cn from 'classnames'
import { RootStore } from 'src/store'
import SEARCH_TYPE from 'src/constants/SearchType'
import Pagination from 'src/components/Pagination'

import my from 'src/assets/board/icon/my.png'
import hot from 'src/assets/board/icon/hot.png'
import lock from 'src/assets/board/icon/lock.png'
import star from 'src/assets/board/icon/star.png'
import topRed from 'src/assets/board/icon/top-red.png'
import topOrange from 'src/assets/board/icon/top-orange.png'
import normal from 'src/assets/board/icon/normal.png'

import s from './TopicItem.m.scss'

interface ITopicItemProps {
  data: ITopic
  tagData1: ITag[]
  tagData2: ITag[]
}

const defaultStyle = {
  color: 'var(--text-color)',
  isBold: false,
  isItalic: false,
}

const TopicItem: React.FC<ITopicItemProps> = ({ data, tagData1, tagData2 }) => {
  const { userName, hitCount, highlightInfo, replyCount, lastPostUser, lastPostTime, id } = data
  const { currentUserName } = useSelector(selector)
  const dispatch = useDispatch()

  const { icon, iconText } = getIconProps(data, currentUserName)
  const { color, isBold, isItalic } = highlightInfo || defaultStyle
  const title = getTopicTitle(data, tagData1, tagData2)
  const postCount = replyCount + 1
  const total = Math.ceil(postCount / 10)

  return (
    <div className={s.root}>
      <Tippy content={iconText}>
        <img className={s.icon} src={icon} />
      </Tippy>
      <div className={s.title}>
        <Link
          style={{
            color,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
          }}
          to={`/topic/${id}`}
        >
          {title}
        </Link>
        <Pagination
          total={total}
          onChange={page => dispatch(push(`/topic/${id}/${page}`))}
          type="mini"
        />
      </div>
      {userName ? (
        <Link
          className={s.user}
          to={{
            pathname: '/search',
            search: stringify({
              type: SEARCH_TYPE.USER,
              keyword: userName,
            }),
          }}
        >
          {userName}
        </Link>
      ) : (
        <span className={cn(s.user, s.anonymous)}>匿名</span>
      )}
      <span className={cn(s.count, s.hitCount)}>
        {hitCount > 10000 ? `${(hitCount / 10000).toFixed(0)}万` : hitCount}
      </span>
      <span className={cn(s.count, s.replyCount)}>{replyCount}</span>
      <Link className={s.lastReply} to={`/topic/${id}/${Math.ceil((replyCount + 1) / 10)}`}>
        {lastPostUser}/{dayjs(lastPostTime).format('YY-MM-DD HH:mm')}
      </Link>
    </div>
  )
}

export default TopicItem

function selector(store: RootStore) {
  return {
    currentUserName: store.global.currentUser ? store.global.currentUser.name : undefined,
  }
}

function getIconProps(
  { userName, replyCount, state, bestState, topState }: ITopic,
  currentUserName: string | undefined
) {
  switch (true) {
    case topState === 2:
      return {
        icon: topOrange,
        iconText: '版面置顶',
      }
    case topState === 4:
      return {
        icon: topRed,
        iconText: '全站置顶',
      }
    case bestState === 1:
      return {
        icon: star,
        iconText: '精华',
      }
    case state === 1:
      return {
        icon: lock,
        iconText: '已被锁定',
      }
    case replyCount > 100:
      return {
        icon: hot,
        iconText: '热帖',
      }
    case currentUserName !== undefined && userName === currentUserName:
      return {
        icon: my,
        iconText: '我的帖子',
      }
    default:
      return {
        icon: normal,
        iconText: '普通帖子',
      }
  }
}

function getTopicTitle(data: ITopic, tagData1: ITag[], tagData2: ITag[]) {
  const tag1 = get(tagData1.filter(item => item.id === data.tag1)[0], 'name', '')
  const tag2 = get(tagData2.filter(item => item.id === data.tag2)[0], 'name', '')

  return `${tag1 ? `[${tag1}]` : ''}${tag2 ? `[${tag2}]` : ''}${data.title}`
}
