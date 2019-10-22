import React from 'react'
import cn from 'classnames'
import { IBoard, IBoardRewardInfo, IPost, IUser } from '@cc98/api'
import Modal from 'src/components/Modal'
import Button from 'src/components/Button'
import { getBoardTodayRewardRecord } from 'src/service/manage'
import Select from 'src/components/Select'
import {
  getPostAvailableManageTypes,
  getPostManageTypeName,
  POST_MANAGE_TYPE,
  POST_SHOW_DAYS_INPUT_TYPES,
  POST_SHOW_PRESTIGE_INPUT_TYPES,
  POST_SHOW_REASON_TYPES,
  POST_SHOW_WEALTH_INPUT_TYPES,
  postReasonMap,
} from 'src/constants/Manage'
import { deletePost, operatePost } from 'src/service/post'
import { defaultAxiosErrorHandler } from 'src/config/axios'
import { ANONYMOUS_BOARD_IDS } from 'src/constants/BoardId'
import { cancelBoardStopPostUser } from 'src/service/board'
import notice from 'src/utils/notice'

import s from './PostManageModal.m.scss'

interface IPostManageModalProps {
  post: IPost
  boardInfo?: IBoard
  currentUser: IUser | null
  visible: boolean
  onClose: () => void
  refresh: () => void
}

function checkNumberAndParse(string: string) {
  const number = parseInt(string, 10)

  if (number.toString() !== string || Number.isNaN(number) || number <= 0) {
    throw new Error('数值不合法')
  }

  return number
}

const PostManageModal: React.FC<IPostManageModalProps> = ({
  visible,
  onClose,
  boardInfo = {},
  currentUser,
  post,
  refresh,
}) => {
  const { name: boardName, id: boardId } = boardInfo
  const availableTypes = getPostAvailableManageTypes(currentUser)
  const [type, setType] = React.useState<POST_MANAGE_TYPE>(POST_MANAGE_TYPE.ADD_WEALTH)
  const [wealth, setWealth] = React.useState('')
  const [prestige, setPrestige] = React.useState('')
  const [days, setDays] = React.useState('')
  // 数组是为了兼容 AutoComplete
  const [reason, setReason] = React.useState<string[]>([])
  const [rewardInfo, setRewardInfo] = React.useState<IBoardRewardInfo>()

  React.useEffect(() => {
    if (visible && boardId) {
      getBoardTodayRewardRecord(boardId).then(setRewardInfo)
    }
  }, [visible, boardId])

  const handleOk = async () => {
    try {
      switch (type) {
        case POST_MANAGE_TYPE.ADD_WEALTH:
          await operatePost(post.id, {
            reason: reason.join('，'),
            operationType: 0,
            wealth: checkNumberAndParse(wealth),
          })
          break
        case POST_MANAGE_TYPE.ADD_PRESTIGE:
          await operatePost(post.id, {
            reason: reason.join('，'),
            operationType: 0,
            prestige: checkNumberAndParse(prestige),
          })
          break
        case POST_MANAGE_TYPE.PUNISH_WEALTH:
          await operatePost(post.id, {
            reason: reason.join('，'),
            operationType: 1,
            wealth: checkNumberAndParse(wealth),
          })
          break
        case POST_MANAGE_TYPE.PUNISH_PRESTIGE:
          await operatePost(post.id, {
            reason: reason.join('，'),
            operationType: 1,
            prestige: checkNumberAndParse(prestige),
          })
          break
        case POST_MANAGE_TYPE.DELETE:
          await deletePost(post.id, reason.join('，'))
          break
        case POST_MANAGE_TYPE.TP:
          await operatePost(post.id, {
            operationType: 1,
            reason: reason.join('，'),
            stopPostDays: checkNumberAndParse(days),
          })
          break
        case POST_MANAGE_TYPE.CANCEL_TP:
          if (ANONYMOUS_BOARD_IDS.includes(boardId!)) {
            throw new Error('请到小黑屋操作')
          }
          await cancelBoardStopPostUser(boardId!, post.userId)
          break
        default:
          throw new Error('未知操作')
      }

      notice('操作成功')
      onClose()
      refresh()
    } catch (e) {
      defaultAxiosErrorHandler(e)
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="发言管理"
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
              {getPostManageTypeName(item)}
            </p>
          ))}
        </div>
      </div>
      <div>
        {type === POST_MANAGE_TYPE.ADD_WEALTH && rewardInfo && (
          <p className={s.info}>
            你今天在{boardName}已经发了{rewardInfo.rewardTotalValue}财富值，最多可发
            {rewardInfo.rewardMaxValue || '不限'}
          </p>
        )}
        {POST_SHOW_WEALTH_INPUT_TYPES.includes(type) && (
          <div>
            <p className={s.label}>财富值</p>
            <input
              className={s.input}
              type="number"
              value={wealth}
              onChange={e => setWealth(e.target.value)}
            />
          </div>
        )}
        {POST_SHOW_PRESTIGE_INPUT_TYPES.includes(type) && (
          <div>
            <p className={s.label}>威望</p>
            <input
              type="number"
              className={s.input}
              value={prestige}
              onChange={e => setPrestige(e.target.value)}
            />
          </div>
        )}
        {POST_SHOW_DAYS_INPUT_TYPES.includes(type) && (
          <div>
            <p className={s.label}>天数</p>
            <input
              type="number"
              className={s.input}
              value={days}
              onChange={e => setDays(e.target.value)}
            />
          </div>
        )}
        {POST_SHOW_REASON_TYPES.includes(type) && (
          <div>
            <p className={s.label}>理由</p>
            {postReasonMap[type] ? (
              <Select width={550} value={reason} onChange={setReason} data={postReasonMap[type]!} />
            ) : (
              <input
                type="text"
                className={s.input}
                value={reason[0]}
                onChange={e => setReason([e.target.value])}
              />
            )}
          </div>
        )}
        {type === POST_MANAGE_TYPE.CANCEL_TP && <p>解除此用户版面 tp</p>}
      </div>
    </Modal>
  )
}

export default PostManageModal
