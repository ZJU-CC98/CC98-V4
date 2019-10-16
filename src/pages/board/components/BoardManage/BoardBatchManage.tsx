import React from 'react'
import { ITopic } from '@cc98/api'
import { EVENT, eventBus } from 'src/utils/event'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import Select from 'src/components/Select'
import { deleteTopics, lockTopics } from 'src/service/topic'
import notice from 'src/utils/notice'

import s from './BoardBatchManage.m.scss'

const REASONS = ['重复发帖', '管理要求', '已解决', '内容不符', '违反版规']
const DAYS = [7, 30, 98, 1000]

const BoardBatchManage: React.FC = () => {
  const [topics, setTopics] = React.useState<ITopic[]>([])
  const [select, setSelect] = React.useState<number[]>([])
  const [visible, setVisible] = React.useState(false)
  const [lockModalVisible, setLockModalVisible] = React.useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [reason, setReason] = React.useState<string[]>([])
  const [day, setDay] = React.useState(DAYS[0])

  React.useEffect(() => {
    eventBus.on(EVENT.GET_TOPICS_SUCCESS, setTopics)

    return () => {
      eventBus.off(EVENT.GET_TOPICS_SUCCESS, setTopics)
    }
  }, [])

  React.useEffect(() => {
    setSelect([])
  }, [topics])

  const handleClose = () => {
    setSelect([])
    setVisible(false)
  }

  const handleSelect = (topic: ITopic) => {
    if (select.includes(topic.id)) {
      setSelect(select.filter(item => item !== topic.id))
      return
    }

    setSelect([...select, topic.id])
  }

  const handleLcok = () => {
    lockTopics(select, reason.join('，'), day).then(() => {
      notice('操作成功')
      setLockModalVisible(false)
    })
  }

  const handleDelete = () => {
    deleteTopics(select, reason.join('，')).then(() => {
      notice('操作成功')
      setDeleteModalVisible(false)
    })
  }

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
          setSelect([])
        }}
      >
        批量管理
      </Button>
      <Modal
        title="批量管理"
        footer={
          <>
            <Button onClick={handleClose}>取 消</Button>
            <Button
              primary
              disabled={select.length === 0}
              onClick={() => setLockModalVisible(true)}
            >
              锁 沉
            </Button>
            <Button
              primary
              disabled={select.length === 0}
              onClick={() => setDeleteModalVisible(true)}
            >
              删 除
            </Button>
          </>
        }
        visible={visible}
        onClose={handleClose}
      >
        {topics.map(item => (
          <p className={s.item} key={item.id} onClick={() => handleSelect(item)}>
            <input
              className={s.checkbox}
              readOnly
              checked={select.includes(item.id)}
              type="checkbox"
            />
            {item.title}
          </p>
        ))}
      </Modal>
      <Modal
        visible={lockModalVisible}
        onClose={() => setLockModalVisible(false)}
        title="批量锁沉"
        footer={
          <>
            <Button onClick={() => setLockModalVisible(false)}>取 消</Button>
            <Button primary onClick={handleLcok}>
              确 定
            </Button>
          </>
        }
      >
        <p>
          理由：
          <Select placement="bottom" value={reason} onChange={setReason} data={REASONS} tags />
        </p>
        <p>
          天数：
          <Select placement="bottom" value={day} onChange={setDay} data={DAYS} />
        </p>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="批量删除"
        footer={
          <>
            <Button onClick={() => setDeleteModalVisible(false)}>取 消</Button>
            <Button primary onClick={handleDelete}>
              确 定
            </Button>
          </>
        }
      >
        <p>理由：</p>
        <Select placement="bottom" value={reason} onChange={setReason} data={REASONS} tags />
      </Modal>
    </>
  )
}

export default BoardBatchManage
