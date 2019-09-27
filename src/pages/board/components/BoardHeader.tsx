import React from 'react'
import { IBoard } from '@cc98/api'
import { Link } from 'react-router-dom'
import { stringify } from 'query-string'
import SEARCH_TYPE from 'src/constants/SearchType'
import { RootStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import { followBoard, unFollowBoard } from 'src/service/board'
import { refreshUserInfo } from 'src/store/global-async-actions'
import notice from 'src/utils/notice'
import { checkIsBoardMaster } from 'src/utils/permission'

import s from 'src/pages/board/components/BoardHeader.m.scss'

interface IBoardHeaderProps {
  data: IBoard
}

function selector(store: RootStore) {
  return {
    customBoards: store.global.currentUser ? store.global.currentUser.customBoards : [],
    isLogin: store.global.isLogin,
    currentUser: store.global.currentUser,
  }
}

const renderBoardMasters = (masters: string[] = []) =>
  masters.length ? (
    <p>
      <span>版主：</span>
      {masters.map(name => (
        <Link
          className={s.boardMaster}
          key={name}
          to={{
            pathname: '/search',
            search: stringify({
              type: SEARCH_TYPE.USER,
              keyword: name,
            }),
          }}
        >
          {name}
        </Link>
      ))}
    </p>
  ) : null

const BoardHeader: React.FC<IBoardHeaderProps> = ({ data }) => {
  const { customBoards, isLogin, currentUser } = useSelector(selector)
  const dispatch = useDispatch()
  const isMaster = checkIsBoardMaster(data, currentUser)
  const isFollow = customBoards.includes(data.id)

  const handleFocus = () =>
    (isFollow ? unFollowBoard(data.id) : followBoard(data.id))
      .then(() => {
        return dispatch(refreshUserInfo())
      })
      .then(() => {
        notice({
          content: isFollow ? '取关成功' : '关注成功',
        })
      })

  return (
    <div className={s.root}>
      <div className={s.title}>
        <img
          className={s.image}
          src={`/static/images/board/_${data.name}.png`}
          onError={e => {
            e.preventDefault()
            ;(e.target as HTMLImageElement).src = `/static/images/board/_CC98.png`
          }}
        />
        <h2 className={s.boardName}>{data.name}</h2>
        <span className={s.divider}>|</span>
        <div className={s.boardInfo}>
          <p>版面简介：{data.description}</p>
          {renderBoardMasters(data.boardMasters)}
        </div>
        <div className={s.boardStatus}>
          <p>
            <span className={s.boardStatusLabel}>今日帖数</span>
            <span className={s.boardStatusContent}>{data.todayCount}</span>
          </p>
          <p>
            <span className={s.boardStatusLabel}>总主题数</span>
            <span className={s.boardStatusContent}>{data.topicCount}</span>
          </p>
        </div>
        {isLogin && (
          <Button className={s.boardButton} onClick={handleFocus}>
            {isFollow ? '取 关' : '关 注'}
          </Button>
        )}
        {isMaster && <Button className={s.boardButton}>编 辑</Button>}
      </div>
      {data.bigPaper && <div className={s.bigPaper}>{data.bigPaper}</div>}
    </div>
  )
}

export default BoardHeader
