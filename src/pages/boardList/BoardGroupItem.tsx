import React from 'react'
import { IBasicBoard, IBoardGroup } from '@cc98/api'
import { Link } from 'react-router-dom'
import { stringify } from 'query-string'
import SEARCH_TYPE from 'src/constants/SearchType'

import s from './BoardGroupItem.m.scss'

interface IBoardGroupItemProps {
  data: IBoardGroup
  initShow?: boolean
  // 不显示图片
  simple?: boolean
}

const renderMasters = (masters: string[] = []) =>
  masters.length ? (
    <p>
      <span>主管：</span>
      {masters.map(name => (
        <Link
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

const renderItem = (board: IBasicBoard) => (
  <div className={s.board} key={board.id}>
    <img className={s.img} src={`/images/board/_${board.name}.png`} />
    <h3 className={s.contentTitle}>
      <Link to={`/board/${board.id}`}>{board.name}</Link>
    </h3>
    <div className={s.count}>
      <p>今日 {board.todayCount}</p>
      <p>总数 {board.postCount}</p>
    </div>
  </div>
)

const renderItemSimple = (board: IBasicBoard) => (
  <div className={s.simple} key={board.id}>
    <Link to={`/board/${board.id}`}>{board.name}</Link>
  </div>
)

const BoardGroupItem: React.FC<IBoardGroupItemProps> = ({
  data,
  initShow = true,
  simple = false,
}) => {
  const [show, setShow] = React.useState(initShow)

  return (
    <div className={s.root}>
      <div className={s.title} onClick={() => setShow(!show)}>
        <div className={s.titleContent}>
          <h2>{data.name}</h2>
          {renderMasters(data.masters)}
        </div>
        <p className={s.action}>{show ? '收起' : '展开'}</p>
      </div>
      {show && (
        <div className={s.content}>
          {data.boards.map(item => (simple ? renderItemSimple(item) : renderItem(item)))}
        </div>
      )}
    </div>
  )
}

export default BoardGroupItem
