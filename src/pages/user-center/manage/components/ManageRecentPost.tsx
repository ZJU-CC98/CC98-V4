import React from 'react'
import { getUserRecentPostByDay } from 'src/service/user'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { IPost } from '@cc98/api'
import useBoardMap from 'src/hooks/useBoardMap'
import Button from 'src/components/Button'
import List from 'src/components/List'
import IBoardMap from 'src/types/IBoardMap'

import s from './ManageRecentPost.m.scss'

interface IManageRecentPostProps {
  id: string
}

const PAGE_SIZE = 10

const renderPostItem = (
  { time, content, floor, topicId, boardId, ip }: IPost,
  boardMap: IBoardMap
) => (
  <p className={s.post} key={time}>
    <span className={s.postTime}>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
    {floor === -1 ? (
      <span className={s.postContent}>{content}</span>
    ) : (
      <Link
        className={s.postContent}
        to={`/topic/${topicId}/${Math.floor((floor - 1) / 10) + 1}#${
          floor % 10 === 0 ? 10 : floor % 10
        }`}
        target="_blank"
      >
        {content}
      </Link>
    )}
    <Link className={s.postBoard} to={`/board/${boardId}`} target="_blank">
      {(boardMap[boardId] || {}).name || ''}
    </Link>
    <span className={s.postFloor}>{floor === -1 ? '已删除' : floor}</span>
    <span className={s.postIp}>{ip}</span>
  </p>
)

const ManageRecentPost: React.FC<IManageRecentPostProps> = ({ id }) => {
  const [listVisible, setListVisible] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [day, setDay] = React.useState('')

  const boardMap = useBoardMap()

  const service = React.useCallback(
    (page: number, pageSize: number) => {
      return getUserRecentPostByDay(id, day, (page - 1) * PAGE_SIZE, pageSize)
    },
    [day, id]
  )

  const handleDayChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setDay(e.target.value)
    setListVisible(false)
  }

  return (
    <div>
      <h2>查看用户最近发言</h2>
      <p className={s.row}>
        <span>天数：</span>
        <input type="text" value={day} onChange={handleDayChange} />
        <Button primary onClick={() => setListVisible(true)}>
          查看
        </Button>
      </p>
      {listVisible && (
        <List
          renderItem={post => renderPostItem(post, boardMap)}
          service={service}
          emptyText="啥也没有"
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          minHeight={0}
        />
      )}
    </div>
  )
}

export default ManageRecentPost
