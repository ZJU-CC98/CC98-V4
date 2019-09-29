import React from 'react'
import { IBoard, IPost, ITopic, IUser } from '@cc98/api'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { checkCanEditPost, checkCanManagePost } from 'src/utils/permission'
import anonymous from 'src/assets/user/anonymous.gif'
import IUserMap from 'src/types/IUserMap'

import PostOperation from 'src/pages/topic/components/PostOperation'

import hotImg from 'src/assets/topic/hot.png'
import s from 'src/pages/topic/components/PostItem.m.scss'

interface IPostItemProps {
  user?: IUser
  post: IPost
  isTracking: boolean
  boardInfo?: IBoard
  topicInfo?: ITopic
  refreshPostLikeState: () => void
  isHot?: boolean
  userMap: IUserMap
  focus?: boolean
}

function selector(store: RootStore) {
  return {
    currentUser: store.global.currentUser,
    isLogin: store.global.isLogin,
  }
}

const renderUser = (
  isLogin: boolean,
  post: IPost,
  user?: {
    name: string
    portraitUrl: string
    gender: number
    isFollowing: boolean
    id: number
  }
) => (
  <div className={s.user}>
    {user && (
      <>
        <img className={s.avatar} src={user.portraitUrl} />
        <p className={s.userName}>
          <span>{user.name}</span>
          {!post.isAnonymous && (
            <span>
              <Icon icon={user.gender ? faMars : faVenus} />
            </span>
          )}
        </p>
        {!post.isAnonymous && isLogin && (
          <p>
            <span className={s.userAction}>{user.isFollowing ? '取关' : '关注'}</span>
            <span className={s.userAction}>私信</span>
          </p>
        )}
      </>
    )}
  </div>
)

const renderTopBar = (user?: IUser) => (
  <>
    {user && (
      <div className={s.contentTop}>
        <p>{user.introduction || '这个人很懒，没有留下介绍'}</p>
        <p>
          <span className={s.contentTopInfo}>威望</span>
          <span className={s.contentTopInfo}>{user.prestige}</span>
          <span className={s.contentTopInfo}>风评</span>
          <span className={s.contentTopInfo}>{user.popularity}</span>
          <span className={s.contentTopInfo}>帖数</span>
          <span className={s.contentTopInfo}>{user.postCount}</span>
          <span className={s.contentTopInfo}>粉丝</span>
          <span className={s.contentTopInfo}>{user.fanCount}</span>
        </p>
      </div>
    )}
  </>
)

const renderContent = (post: IPost, userMap: IUserMap) => (
  <div className={s.content}>
    <div>{post.content}</div>
    {!!post.awards.length && (
      <div>
        <p>
          <span>用户</span>
          <span>操作</span>
          <span>理由</span>
        </p>
        {post.awards.map(item => (
          <p>
            <span>
              <img src={userMap[item.operatorName] && userMap[item.operatorName]!.portraitUrl} />
              <span>{item.operatorName}</span>
            </span>
            <span>{item.content}</span>
            <span>{item.reason}</span>
          </p>
        ))}
      </div>
    )}
  </div>
)

const PostItem: React.FC<IPostItemProps> = ({
  user,
  post,
  isTracking,
  boardInfo,
  topicInfo,
  refreshPostLikeState,
  isHot = false,
  focus = false,
  userMap,
}) => {
  const { currentUser, isLogin } = useSelector(selector)
  const root = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (focus && root.current) {
      root.current.scrollIntoView()
    }
  }, [focus])

  const canEdit = checkCanEditPost(post, currentUser, boardInfo)
  const canManage = checkCanManagePost(boardInfo, topicInfo, currentUser)

  return (
    <div ref={root} className={s.root}>
      {renderUser(
        isLogin,
        post,
        post.isAnonymous
          ? {
              name: `匿名${post.userName}`,
              portraitUrl: anonymous,
              gender: 0,
              isFollowing: false,
              id: 0,
            }
          : user
      )}
      <div className={s.contentRoot}>
        {renderTopBar(user)}
        {renderContent(post, userMap)}
        <PostOperation
          refreshPostLikeState={refreshPostLikeState}
          canEdit={canEdit}
          canManage={canManage}
          post={post}
          isTracking={isTracking}
        />
        {user && user.signatureCode && <div className={s.qmd}>{user.signatureCode}</div>}
      </div>
      <div
        className={cn(s.floor, {
          [s.hot]: isHot,
        })}
      >
        {isHot ? <img src={hotImg} /> : post.floor}
      </div>
    </div>
  )
}

export default PostItem
