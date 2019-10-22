import React from 'react'
import { IBoard, IPost, IUser } from '@cc98/api'
import { useHistory } from 'react-router'
import dayjs from 'dayjs'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import LIKE_STATE from 'src/constants/LikeState'
import { EVENT, eventBus } from 'src/utils/event'
import { setPostLikeState } from 'src/service/post'

import RateModal from './RateModal'
import PostManageModal from './PostManageModal'
import s from './PostOperation.m.scss'

interface IPostOperationProps {
  post: IPost
  boardInfo?: IBoard
  canEdit: boolean
  canManage: boolean
  refreshPostLikeState: () => void
  refresh: () => void
  isTracking: boolean
  currentUser: IUser | null
}

const PostOperation: React.FC<IPostOperationProps> = ({
  post,
  canManage,
  canEdit,
  refreshPostLikeState,
  isTracking,
  refresh,
  boardInfo,
  currentUser,
}) => {
  const history = useHistory()
  const [rateVisible, setRateVisible] = React.useState(false)
  const [manageVisible, setManageVisible] = React.useState(false)

  const handleQuote: React.MouseEventHandler = () => {
    eventBus.emit(EVENT.QUOTE_FLOOR, post)
  }

  const handleEdit = () => {
    history.push(`/editor/edit-post/${post.id}`)
  }

  const handleTrack = () => {
    if (!isTracking) {
      history.push(`/topic/${post.topicId}/track/${post.id}`)
    } else {
      history.push(`/topic/${post.topicId}`)
    }
  }

  const handleLike = async () => {
    if (post.likeState === LIKE_STATE.LIKE) {
      await setPostLikeState(post.id, LIKE_STATE.NONE)
    } else {
      await setPostLikeState(post.id, LIKE_STATE.LIKE)
    }

    refreshPostLikeState()
  }

  const handleDisLike = async () => {
    if (post.likeState === LIKE_STATE.DISLIKE) {
      await setPostLikeState(post.id, LIKE_STATE.NONE)
    } else {
      await setPostLikeState(post.id, LIKE_STATE.DISLIKE)
    }

    refreshPostLikeState()
  }

  const handleRate = () => {
    setRateVisible(true)
  }

  const handleManage = () => {
    setManageVisible(true)
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
        <span
          onClick={handleLike}
          className={s.like}
          style={{ color: post.likeState === LIKE_STATE.LIKE ? 'red' : undefined }}
        >
          <span className={s.icon}>
            <Icon icon={faThumbsUp} />
          </span>
          <span>{post.likeCount}</span>
        </span>
        <span
          onClick={handleDisLike}
          className={s.like}
          style={{ color: post.likeState === LIKE_STATE.DISLIKE ? 'red' : undefined }}
        >
          <span className={s.icon}>
            <Icon icon={faThumbsDown} />
          </span>
          <span>{post.dislikeCount}</span>
        </span>
        <span className={s.action} onClick={handleRate}>
          评分
        </span>
        <span className={s.action} onClick={handleQuote}>
          引用
        </span>
        <span className={s.action} onClick={handleTrack}>
          {isTracking ? '返回' : '追踪'}
        </span>
        {canEdit && (
          <span onClick={handleEdit} className={s.action}>
            编辑
          </span>
        )}
        {canManage && (
          <span onClick={handleManage} className={s.action}>
            管理
          </span>
        )}
      </p>
      <RateModal
        postId={post.id}
        refresh={refresh}
        visible={rateVisible}
        setVisible={setRateVisible}
      />
      <PostManageModal
        currentUser={currentUser}
        boardInfo={boardInfo}
        post={post}
        visible={manageVisible}
        onClose={() => setManageVisible(false)}
        refresh={refresh}
      />
    </div>
  )
}

export default PostOperation
