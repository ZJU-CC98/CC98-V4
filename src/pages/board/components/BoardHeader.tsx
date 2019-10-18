import React from 'react'
import { IBoard } from '@cc98/api'
import { Link } from 'react-router-dom'
import { stringify } from 'query-string'
import SEARCH_TYPE from 'src/constants/SearchType'
import { RootStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import { editBoardBigPaper, followBoard, unFollowBoard } from 'src/service/board'
import { refreshUserInfo } from 'src/store/global-async-actions'
import notice from 'src/utils/notice'
import { checkIsBoardMaster } from 'src/utils/permission'
import UbbContainer from 'src/ubb'
import BoardImg from 'src/components/BoardImg'
import Modal from 'src/components/Modal'

import s from './BoardHeader.m.scss'

interface IBoardHeaderProps {
  data: IBoard
  refreshBoardInfo: () => void
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

const BoardHeader: React.FC<IBoardHeaderProps> = ({ data, refreshBoardInfo }) => {
  const [visible, setVisible] = React.useState(false)
  const [bigPaper, setBigPaper] = React.useState(data.bigPaper || '')
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

  const handleEdit = () => {
    editBoardBigPaper(data.id, bigPaper).then(() => {
      notice('修改成功')
      refreshBoardInfo()
      setVisible(false)
    })
  }

  return (
    <div className={s.root}>
      <div className={s.title}>
        <BoardImg board={data} size={64} />
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
        {isMaster && (
          <Button onClick={() => setVisible(true)} className={s.boardButton}>
            编 辑
          </Button>
        )}
      </div>
      {!!data.bigPaper && (
        <div className={s.bigPaper}>
          <UbbContainer text={data.bigPaper} />
        </div>
      )}
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="编辑大字报"
        footer={
          <>
            <Button onClick={() => setVisible(false)}>取 消</Button>
            <Button primary onClick={handleEdit}>
              确 定
            </Button>
          </>
        }
      >
        <div className={s.edit}>
          <p>支持UBB代码</p>
          <textarea value={bigPaper} onChange={e => setBigPaper(e.target.value)} />
          <UbbContainer text={bigPaper} />
        </div>
      </Modal>
    </div>
  )
}

export default BoardHeader
