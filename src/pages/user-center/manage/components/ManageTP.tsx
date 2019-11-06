import React from 'react'
import LOCK_STATE, { getLockStateDesc } from 'src/constants/LockState'
import Select from 'src/components/Select'
import Button from 'src/components/Button'
import { defaultAxiosErrorHandler } from 'src/config/axios'
import { manageUser } from 'src/service/user'
import notice from 'src/utils/notice'

import s from './ManageTP.m.scss'

interface IManageTPProps {
  id: string
}

const AVAILABLE_LOCK_TYPES = [
  {
    value: LOCK_STATE.LOCK,
    label: getLockStateDesc(LOCK_STATE.LOCK),
  },
  {
    value: LOCK_STATE.HIDDEN,
    label: getLockStateDesc(LOCK_STATE.HIDDEN),
  },
  {
    value: LOCK_STATE.GLOBAL_BAN,
    label: getLockStateDesc(LOCK_STATE.GLOBAL_BAN),
  },
]

const ManageTP: React.FC<IManageTPProps> = ({ id }) => {
  const [lockType, setLockType] = React.useState<LOCK_STATE>(LOCK_STATE.LOCK)
  const [reason, setReason] = React.useState('')
  const [day, setDay] = React.useState('')

  const handleSubmit = async (isCancel: boolean) => {
    try {
      const Days = parseInt(day, 10)

      if (!reason) {
        throw new Error('请填写理由')
      } else if (
        (!isCancel &&
          lockType === LOCK_STATE.GLOBAL_BAN &&
          (Days < -1 || Days > 1000 || (Days < 7 && Days > -1))) ||
        `${Days}` !== day
      ) {
        throw new Error('不合法的TP天数')
      }

      await manageUser(id, {
        PunishmentType: lockType,
        OperationType: isCancel ? 0 : 1,
        Reason: reason,
        Days,
      })

      notice('操作成功')
    } catch (e) {
      defaultAxiosErrorHandler(e)
    }
  }

  return (
    <div>
      <h2>TP</h2>
      <p className={s.row}>
        <span>OperationType: </span>
        <Select value={lockType} onChange={setLockType} data={AVAILABLE_LOCK_TYPES} />
        <span>Reason:</span>
        <input type="text" value={reason} onChange={e => setReason(e.target.value)} />
        <span>Days:</span>
        <input type="text" value={day} onChange={e => setDay(e.target.value)} />
        <Button primary onClick={() => handleSubmit(false)}>
          提交
        </Button>
        <Button primary onClick={() => handleSubmit(true)}>
          解除
        </Button>
      </p>
    </div>
  )
}

export default ManageTP
