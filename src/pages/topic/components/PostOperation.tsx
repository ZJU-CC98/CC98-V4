import React from 'react'
import { IPost } from '@cc98/api'
import { useHistory } from 'react-router'
import dayjs from 'dayjs'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import LIKE_STATE from 'src/constants/LikeState'
import { EVENT, eventBus } from 'src/utils/event'

import s from './PostOperation.m.scss'

interface IPostOperationProps {
  post: IPost
  canEdit: boolean
  canManage: boolean
  refreshPostLikeState: () => void
  isTracking: boolean
}

const PostOperation: React.FC<IPostOperationProps> = ({
  post,
  canManage,
  canEdit,
  // refreshPostLikeState,
  isTracking,
}) => {
  const history = useHistory()

  const handleQuote: React.MouseEventHandler = () => {
    eventBus.emit(EVENT.QUOTE_FLOOR, post)
  }

  const handleEdit = () => {
    history.push(`/editor/edit-post/${post.id}`)
  }

  return (
    <div className={s.root}>
      <p>
        <span>发表于</span>
        <span>{dayjs(post.time).format('YYYY-MM-DD HH:mm:ss')}</span>
        {post.lastUpdateAuthor && (
          <>
            <span>该贴最后由</span>
            <span>{post.lastUpdateAuthor === post.userName ? '作者' : post.lastUpdateAuthor}</span>
            <span>在</span>
            <span>{dayjs(post.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span>编辑</span>
          </>
        )}
      </p>
      <p className={s.actionRoot}>
        <span className={s.like}>
          <span className={s.icon}>
            <Icon
              color={post.likeState === LIKE_STATE.LIKE ? 'red' : undefined}
              icon={faThumbsUp}
            />
          </span>
          <span>{post.likeCount}</span>
        </span>
        <span className={s.like}>
          <span className={s.icon}>
            <Icon
              color={post.likeState === LIKE_STATE.DISLIKE ? 'red' : undefined}
              icon={faThumbsDown}
            />
          </span>
          <span>{post.dislikeCount}</span>
        </span>
        <span className={s.action}>评分</span>
        <span className={s.action} onClick={handleQuote}>
          引用
        </span>
        <span className={s.action}>{isTracking ? '返回' : '追踪'}</span>
        {canEdit && (
          <span onClick={handleEdit} className={s.action}>
            编辑
          </span>
        )}
        {canManage && <span className={s.action}>管理</span>}
      </p>
    </div>
  )
}

export default PostOperation
