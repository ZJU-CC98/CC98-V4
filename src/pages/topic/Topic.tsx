import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IBoard, IPost, ITopic } from '@cc98/api'
import axios from 'axios'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import produce from 'immer'
import Spin from 'src/components/Spin'
import { getTopicInfo } from 'src/service/topic'
import { getBoardInfo } from 'src/service/board'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import Pagination from 'src/components/Pagination'
import { getUsersByNames } from 'src/service/user'
import { getPostLikeState } from 'src/service/post'
import IUserMap from 'src/types/IUserMap'
import { getPosts, getTotalPage } from 'src/pages/topic/utils'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import ERROR from 'src/constants/Error'

import TopicHeader from 'src/pages/topic/components/Content/TopicHeader'
import PostItem from 'src/pages/topic/components/Content/PostItem'
import TopicReplier from 'src/pages/topic/components/Content/TopicReplier'
import TopicManage from 'src/pages/topic/components/Content/TopicManage'

import s from './Topic.m.scss'

interface ITopicRouteMatch {
  topicId: string
  page?: string
  // 有 postId 说明是追踪模式
  postId?: string
}

const baseBreadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  {
    name: '版面列表',
    url: '/board-list',
  },
]

const Topic: React.FC<RouteComponentProps<ITopicRouteMatch>> = ({ match, location, history }) => {
  const [refreshKey, setRefreshKey] = React.useState(0)
  const [topicInfo, setTopicInfo] = React.useState<ITopic>()
  const [boardInfo, setBoardInfo] = React.useState<IBoard>()
  const [posts, setPosts] = React.useState<IPost[]>([])
  const [hotPosts, setHotPosts] = React.useState<IPost[]>([])
  const [userMap, setUserMap] = React.useState<IUserMap>({})
  const [isTopicLoading, setIsTopicLoading] = React.useState(false)
  const source = React.useRef(axios.CancelToken.source())
  const dispatch = useDispatch()

  const focusFloor = parseInt(location.hash.slice(1), 10)
  const { topicId, postId } = match.params
  const isTracking = !!postId
  const currentPage = parseInt(match.params.page || '1', 10)
  const totalPage = getTotalPage(isTracking, currentPage, topicInfo, posts[0])

  // 获取 topic & board 信息
  React.useEffect(() => {
    getTopicInfo(topicId)
      .catch(error => {
        if (error.response && error.response.data === 'cannot_entry_board') {
          dispatch({
            type: GLOBAL_ACTION_TYPES.SET_ERROR,
            payload: ERROR.TOPIC_NO_PERMISSION,
          } as GlobalActions)
        }

        throw error
      })
      .then(topic => {
        setTopicInfo(topic)
        return getBoardInfo(topic.boardId)
      })
      .then(setBoardInfo)
  }, [topicId, refreshKey])

  // 获取内容
  React.useEffect(() => {
    setIsTopicLoading(true)
    setPosts([])
    setHotPosts([])
    source.current.cancel()
    source.current = axios.CancelToken.source()
    Promise.all(
      getPosts(topicId, currentPage, isTracking, setPosts, setHotPosts, source.current, postId)
    )

      .then(([postData, hotPostData = []]) => {
        setIsTopicLoading(false)
        if (
          (!postData.length || postData[0].isAnonymous) &&
          (!hotPostData.length || hotPostData[0].isAnonymous)
        ) {
          return []
        }

        const allData = [...postData, ...hotPostData]

        const userNames = [
          ...allData.map(item => item.userName),
          ...allData.reduce(
            (res, curr) => [...res, ...(curr.awards || []).map(item => item.operatorName)],
            [] as string[]
          ),
        ]

        return getUsersByNames(userNames)
      })
      .then(users =>
        setUserMap(
          users.reduce(
            (res, user) => {
              res[user.name] = user
              return res
            },
            {} as IUserMap
          )
        )
      )
  }, [topicId, isTracking, postId, currentPage, refreshKey])

  useBreadcrumb([
    ...baseBreadcrumb,
    boardInfo ? { url: `/board/${boardInfo.id}`, name: boardInfo.name } : { name: ' ', url: '/' },
    topicInfo ? topicInfo.title : '',
  ])

  useDocumentTitle(topicInfo ? topicInfo.title : '帖子')

  const handlePage = (page: number) => {
    dispatch(
      push(
        isTracking ? `/topic/${topicId}/postid/${postId}/${page}#1` : `/topic/${topicId}/${page}#1`
      )
    )
  }

  const refreshPostLikeState = (id: number) => {
    getPostLikeState(id).then(likeState => {
      setHotPosts(
        produce(hotPosts, draft => {
          draft
            .filter(item => item.id === id)
            .forEach(item => {
              item.likeState = likeState.likeState
              item.likeCount = likeState.likeCount
              item.dislikeCount = likeState.dislikeCount
            })
        })
      )
      setPosts(
        produce(posts, draft => {
          draft
            .filter(item => item.id === id)
            .forEach(item => {
              item.likeState = likeState.likeState
              item.likeCount = likeState.likeCount
              item.dislikeCount = likeState.dislikeCount
            })
        })
      )
    })
  }

  const refresh = () => {
    setRefreshKey(refreshKey + 1)
  }

  const goToLastPost = () => {
    if (!topicInfo) return

    const page = getTotalPage(false, 1, topicInfo)
    const floor = ((topicInfo.replyCount + 1) % 10) + 1

    const path = `/topic/${topicId}/${page}`

    if (location.pathname === path) {
      refresh()
    }

    history.push({
      pathname: path,
      hash: `${floor}`,
    })
  }

  const basePostProps = {
    isTracking,
    topicInfo,
    boardInfo,
    userMap,
    refresh,
  }

  return (
    <div className={s.root}>
      <Pagination total={totalPage} onChange={handlePage} current={currentPage} />
      {topicInfo && <TopicHeader topicInfo={topicInfo} boardInfo={boardInfo} />}
      {isTopicLoading && <Spin />}
      {posts.slice(0, 1).map(item => (
        <PostItem
          {...basePostProps}
          post={item}
          user={userMap[item.userName]}
          refreshPostLikeState={() => refreshPostLikeState(item.id)}
          key={item.id}
          focus={focusFloor === 1}
        />
      ))}
      {hotPosts.map(item => (
        <PostItem
          {...basePostProps}
          post={item}
          user={userMap[item.userName]}
          refreshPostLikeState={() => refreshPostLikeState(item.id)}
          key={item.id}
          isHot
        />
      ))}
      {posts.slice(1).map((item, index) => (
        <PostItem
          {...basePostProps}
          post={item}
          user={userMap[item.userName]}
          refreshPostLikeState={() => refreshPostLikeState(item.id)}
          key={item.id}
          focus={focusFloor === index + 2}
        />
      ))}
      <Pagination total={totalPage} onChange={handlePage} current={currentPage} />
      <TopicReplier topicId={topicId} onSuccess={goToLastPost} />
      <TopicManage
        refresh={refresh}
        topicId={topicId}
        boardInfo={boardInfo}
        topicInfo={topicInfo}
      />
    </div>
  )
}

export default Topic
