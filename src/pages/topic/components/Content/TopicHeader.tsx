import React from 'react'
import { IBoard, ITopic } from '@cc98/api'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faClock, faEye } from '@fortawesome/free-regular-svg-icons'
import dayjs from 'dayjs'
import { RootStore } from 'src/store'
import { getTopicIsFavorite, removeTopicFavorite, setTopicFavorite } from 'src/service/topic'
import { EVENT, eventBus } from 'src/utils/event'
import notice from 'src/utils/notice'

import s from 'src/pages/topic/components/Content/TopicHeader.m.scss'

interface ITopicHeaderProps {
  topicInfo: ITopic
  boardInfo?: IBoard
}

function selector(store: RootStore) {
  return {
    isLogin: store.global.isLogin,
  }
}

const TopicHeader: React.FC<ITopicHeaderProps> = ({ topicInfo, boardInfo }) => {
  const { id, title, time, hitCount } = topicInfo
  const boardName = get(boardInfo, 'name', '')
  const boardTodayCount = get(boardInfo, 'todayCount', 0)
  const boardTopicCount = get(boardInfo, 'topicCount', 0)

  const [isFavorite, setIsFavorite] = React.useState(false)
  const { isLogin } = useSelector(selector)

  React.useEffect(() => {
    if (isLogin) {
      getTopicIsFavorite(id).then(setIsFavorite)
    }
  }, [id, isLogin])

  const handleFavorite = () => {
    return (isFavorite ? removeTopicFavorite(id) : setTopicFavorite(id)).then(() => {
      notice({
        content: isFavorite ? '取消收藏成功' : '收藏成功',
      })
      setIsFavorite(!isFavorite)
    })
  }

  return (
    <div className={s.root}>
      <div className={s.topic}>
        <h2>{title}</h2>
        <p className={s.topicInfo}>
          <span className={s.infoItem}>
            <span className={s.icon}>
              <Icon icon={faClock} />
            </span>
            {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
          </span>
          <span className={s.infoItem}>
            <span className={s.icon}>
              <Icon icon={faEye} />
            </span>
            {hitCount}
          </span>
          {isLogin && (
            <span onClick={handleFavorite} className={s.action}>
              {isFavorite ? '已收藏' : '收藏'}
            </span>
          )}
          <span className={s.action} onClick={() => eventBus.emit(EVENT.EXPAND_ALL_PICTURE, null)}>
            显示所有图片
          </span>
        </p>
      </div>
      <div className={s.board}>
        <p className={s.boardName}>{boardName}</p>
        <p className={s.boardInfo}>
          {boardTodayCount} / {boardTopicCount}
        </p>
      </div>
    </div>
  )
}

export default TopicHeader
