import React from 'react'
import { useSelector } from 'react-redux'
import { map } from 'lodash/fp'
import dayjs from 'dayjs'
import { IBoard } from '@cc98/api'
import { cancelBoardStopPostUser, getBoardStopPostUsers } from 'src/service/board'
import { RootStore } from 'src/store'
import List from 'src/components/List'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import { checkIsBoardMaster } from 'src/utils/permission'
import notice from 'src/utils/notice'

import s from './BoardEvent.m.scss'

interface IBoardStopUserProps {
  boardId: string
  boardInfo: IBoard | null
}

const PAGE_SIZE = 20

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

const BoardStopUser: React.FC<IBoardStopUserProps> = ({ boardId, boardInfo }) => {
  const [visible, setVisible] = React.useState(false)
  const { user } = useSelector(selector)

  const service = React.useCallback(
    (page: number, pageSize: number) => {
      return getBoardStopPostUsers(boardId, (page - 1) * PAGE_SIZE, pageSize).then(
        map(item => ({ ...item, id: item.userId }))
      )
    },
    [boardId]
  )

  const handleCancel = (userId: number) => {
    cancelBoardStopPostUser(boardId, userId).then(() => {
      notice('解除tp成功')
    })
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>小黑屋</Button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="小黑屋"
        footer={
          <Button primary onClick={() => setVisible(false)}>
            确 定
          </Button>
        }
      >
        <>
          <List
            minHeight={300}
            renderItem={item => (
              <div className={s.item}>
                <div className={s.content}>
                  <p className={s.contentTitle}>{item.userName}</p>
                  <p>
                    <span className={s.target}>天数：{item.days}</span>
                    <span className={s.time}>
                      到期时间：{dayjs(item.expiredTime).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                    {checkIsBoardMaster(boardInfo, user) && (
                      <Button
                        style={{ marginLeft: 8 }}
                        className={s.button}
                        primary
                        onClick={() => handleCancel(item.userId)}
                      >
                        解除tp
                      </Button>
                    )}
                  </p>
                </div>
                <div className={s.op}>操作人：{item.operatorUserName}</div>
              </div>
            )}
            service={service}
            emptyText="没有用户"
          />
        </>
      </Modal>
    </>
  )
}

export default BoardStopUser
