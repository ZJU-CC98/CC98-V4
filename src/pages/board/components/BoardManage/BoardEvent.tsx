import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import { IBoardEvent } from '@cc98/api'
import { getBoardEvents } from 'src/service/board'
import Pagination from 'src/components/Pagination'

import s from './BoardEvent.m.scss'

interface IBoardEventProps {
  boardId: string
}

const PAGE_SIZE = 7

const BoardEvent: React.FC<IBoardEventProps> = ({ boardId }) => {
  const [visible, setVisible] = React.useState(false)
  const [events, setEvents] = React.useState<IBoardEvent[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [total, setTotal] = React.useState(1)

  React.useEffect(() => {
    if (visible) {
      getBoardEvents(boardId, (currentPage - 1) * PAGE_SIZE, PAGE_SIZE).then(
        ({ boardEvents, count }) => {
          setTotal(Math.ceil(count / PAGE_SIZE))
          setEvents(boardEvents)
        }
      )
    }
  }, [boardId, visible, currentPage])

  return (
    <>
      <Button onClick={() => setVisible(true)}>查看版面事件</Button>
      <Modal
        title="版面事件"
        footer={
          <Button className={s.button} primary onClick={() => setVisible(false)}>
            确 定
          </Button>
        }
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <>
          {events.map(item => (
            <div className={s.item} key={item.id}>
              <div className={s.content}>
                <p className={s.contentTitle}>
                  <Link to={`/topic/${item.topicId}`}>{item.content}</Link>
                </p>
                <p>
                  <span className={s.target}>对象：{item.targetUserName}</span>
                  <span className={s.time}>{dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
              </div>
              <div className={s.op}>操作人：{item.operatorUserName}</div>
            </div>
          ))}
          <div className={s.page}>
            <Pagination current={currentPage} total={total} onChange={setCurrentPage} />
          </div>
        </>
      </Modal>
    </>
  )
}

export default BoardEvent
