import React from 'react'
import { SketchPicker } from 'react-color'
import cn from 'classnames'
import Modal from 'src/components/Modal'
import Button from 'src/components/Button'
import { IBoardGroup, ITopic, IUser } from '@cc98/api'
import {
  getAvailableTopicManageTypes,
  getTopicManageTypeDesc,
  TOPIC_MANAGE_SHOW_DAY_TYPES,
  TOPIC_MANAGE_TYPE,
} from 'src/constants/TopicManage'
import { getAllBoard } from 'src/service/board'
import Select from 'src/components/Select'
import {
  cancelTopicBest,
  cancelTopicDisableHot,
  cancelTopicTop,
  deleteTopic,
  lockTopic,
  moveTopic,
  setTopicBest,
  setTopicDisableHot,
  setTopicHighLight,
  setTopicToBoardTop,
  setTopicToSiteTop,
  setTopicUp,
  unlockTopic,
} from 'src/service/topic'

import s from './TopicManageModal.m.scss'

interface ITopicManageModalProps {
  topicId: string
  topicInfo?: ITopic
  currentUser: IUser | null
  visible: boolean
  onClose: () => void
  refresh: () => void
}

const AVAILABLE_DAYS = [0, 7, 14, 30, 98, 1000]

const TopicManageModal: React.FC<ITopicManageModalProps> = ({
  visible,
  onClose,
  topicInfo,
  currentUser,
  topicId,
  refresh,
}) => {
  const availableTypes = getAvailableTopicManageTypes(topicInfo, currentUser)
  const [type, setType] = React.useState(availableTypes[0] || TOPIC_MANAGE_TYPE.LOCK_TOPIC)
  const [reason, setReason] = React.useState<string>('')
  const [days, setDays] = React.useState<number>(AVAILABLE_DAYS[0])
  const [targetBoardGroup, setTargetBoardGroup] = React.useState<number>()
  const [targetBoard, setTargetBoard] = React.useState<number>()
  const [boardGroup, setBoardGroup] = React.useState<IBoardGroup[]>([])
  const [color, setColor] = React.useState('#000000')
  const [isItalic, setIsItalic] = React.useState(false)
  const [isBold, setIsBold] = React.useState(false)

  React.useEffect(() => {
    getAllBoard().then(data => {
      setBoardGroup(data)
      setTargetBoardGroup(data[0].id)
      setTargetBoard(data[0].boards[0].id)
    })
  }, [])

  React.useEffect(() => {
    if (availableTypes[0]) {
      setType(availableTypes[0])
    }
  }, [availableTypes[0]])

  const boards = boardGroup.find(item => item.id === targetBoardGroup)

  const handleOk = async () => {
    switch (type) {
      case TOPIC_MANAGE_TYPE.LOCK_TOPIC:
        await lockTopic(topicId, reason, days)
        break
      case TOPIC_MANAGE_TYPE.UNLOCK_TOPIC:
        await unlockTopic(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.DISABLE_HOT:
        await setTopicDisableHot(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.CANCEL_DISABLE_HOT:
        await cancelTopicDisableHot(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.DELETE_TOPIC:
        await deleteTopic(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.MOVE_TOPIC:
        await moveTopic(topicId, targetBoard!, reason)
        break
      case TOPIC_MANAGE_TYPE.UP_TOPIC:
        await setTopicUp(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.SET_BOARD_TOP:
        await setTopicToBoardTop(topicId, reason, days)
        break
      case TOPIC_MANAGE_TYPE.CANCEL_BOARD_TOP:
      case TOPIC_MANAGE_TYPE.CANCEL_SITE_TOP:
        await cancelTopicTop(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.SET_SITE_TOP:
        await setTopicToSiteTop(topicId, reason, days)
        break
      case TOPIC_MANAGE_TYPE.SET_BEST_TOPIC:
        await setTopicBest(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.CANCEL_BEST_TOPIC:
        await cancelTopicBest(topicId, reason)
        break
      case TOPIC_MANAGE_TYPE.SET_HIGH_LIGHT:
        await setTopicHighLight(topicId, reason, days, isBold, isItalic, color)
        break
      default:
    }

    onClose()
    refresh()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="帖子管理"
      footer={
        <>
          <Button onClick={onClose}>取 消</Button>
          <Button primary onClick={handleOk}>
            确 定
          </Button>
        </>
      }
    >
      <div className={s.root}>
        <div className={s.title}>
          {availableTypes.map(item => (
            <p
              className={cn(s.titleItem, { [s.titleItemCurrent]: item === type })}
              onClick={() => setType(item)}
              key={item}
            >
              {getTopicManageTypeDesc(item)}
            </p>
          ))}
        </div>
        <div>
          {type === TOPIC_MANAGE_TYPE.SET_HIGH_LIGHT && (
            <div>
              <span className={s.checkbox} onClick={() => setIsBold(!isBold)}>
                <input type="checkbox" readOnly checked={isBold} />
                <span>加粗</span>
              </span>
              <span className={s.checkbox} onClick={() => setIsItalic(!isItalic)}>
                <input type="checkbox" readOnly checked={isItalic} />
                <span>斜体</span>
              </span>
            </div>
          )}
          {TOPIC_MANAGE_SHOW_DAY_TYPES.includes(type) && (
            <div>
              <p className={s.label}>天数</p>
              <Select
                width={547}
                popWidth={547}
                value={days}
                onChange={setDays}
                data={AVAILABLE_DAYS}
              />
            </div>
          )}
          <div>
            <p className={s.label}>理由</p>
            <input
              type="text"
              className={s.input}
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </div>
          {type === TOPIC_MANAGE_TYPE.MOVE_TOPIC && (
            <div style={{ display: 'flex', marginTop: 12 }}>
              <Select
                value={targetBoardGroup!}
                onChange={v => {
                  setTargetBoardGroup(v)
                  setTargetBoard(undefined)
                }}
                data={boardGroup.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
              <div style={{ width: 24 }} />
              <Select
                width={300}
                value={targetBoard!}
                onChange={setTargetBoard}
                data={
                  boards
                    ? boards.boards.map(item => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
              />
            </div>
          )}
          {type === TOPIC_MANAGE_TYPE.SET_HIGH_LIGHT && (
            <div>
              <p className={s.label}>颜色</p>
              <SketchPicker color={color} onChangeComplete={({ hex }) => setColor(hex)} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default TopicManageModal
