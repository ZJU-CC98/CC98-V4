import React from 'react'
import { IVoteInfo } from '@cc98/api'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from 'src/components/Button'

import s from './VoteEditor.m.scss'

export const DEFAULT_VOTE_INFO: IVoteInfo = {
  voteItems: ['', ''],
  expiredDays: 0,
  maxVoteCount: 0,
  needVote: false,
}

export function checkVoteInfo(voteInfo: IVoteInfo) {
  if (voteInfo.expiredDays > 1000 || voteInfo.expiredDays < 1) return '请输入合法的过期天数'
  if (voteInfo.maxVoteCount > voteInfo.voteItems.length || voteInfo.maxVoteCount < 1)
    return '请输入合法的最大投票数'
  for (let i = 0; i < voteInfo.voteItems.length; i += 1) {
    if (!voteInfo.voteItems[i]) return '投票选项不能为空'
  }
  return false
}

interface IVoteEditorProps {
  voteInfo: IVoteInfo
  onVoteInfoChange: (v: IVoteInfo) => void
}

const VoteEditor: React.FC<IVoteEditorProps> = ({ voteInfo, onVoteInfoChange }) => {
  const makeHandleItemChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onVoteInfoChange({
      ...voteInfo,
      voteItems: voteInfo.voteItems.map((item, i) => {
        if (i !== index) return item
        return e.target.value
      }),
    })
  }

  const handleAddItem = () => {
    if (voteInfo.voteItems.length >= 20) return
    onVoteInfoChange({
      ...voteInfo,
      voteItems: [...voteInfo.voteItems, ''],
    })
  }

  const makeHandleDelete = (index: number) => () => {
    onVoteInfoChange({
      ...voteInfo,
      voteItems: voteInfo.voteItems.filter((_, i) => i !== index),
    })
  }

  return (
    <>
      <div className={s.row}>
        <span className={s.label}>投票设置</span>
        <span
          className={s.radio}
          onClick={() => onVoteInfoChange({ ...voteInfo, needVote: !voteInfo.needVote })}
        >
          <input type="checkbox" checked={voteInfo.needVote} readOnly />
          <span>投票后结果可见</span>
        </span>
      </div>
      <div className={s.row}>
        <span className={s.label}>有效天数</span>
        <input
          className={s.input}
          type="number"
          placeholder="至少1天，最多1000天"
          value={`${voteInfo.expiredDays === 0 ? '' : voteInfo.expiredDays}`}
          onChange={e =>
            onVoteInfoChange({ ...voteInfo, expiredDays: parseInt(e.target.value || '0', 10) })
          }
        />
      </div>
      <div className={s.row}>
        <span className={s.label}>最多可投数量</span>
        <input
          type="number"
          className={s.input}
          placeholder="至少1项，最多不超过选项数"
          value={`${voteInfo.maxVoteCount === 0 ? '' : voteInfo.maxVoteCount}`}
          onChange={e =>
            onVoteInfoChange({ ...voteInfo, maxVoteCount: parseInt(e.target.value || '0', 10) })
          }
        />
      </div>
      {voteInfo.voteItems.map((item, index) => (
        <div className={s.row}>
          <span className={s.label}>投票选项{index + 1}</span>
          <input
            className={s.input}
            type="text"
            value={item}
            onChange={makeHandleItemChange(index)}
            placeholder="请输入选项内容，不能为空，最多50个字符"
          />
          {voteInfo.voteItems.length > 2 && (
            <span onClick={makeHandleDelete(index)} className={s.delete}>
              <Icon icon={faTimes} />
            </span>
          )}
        </div>
      ))}
      <Button primary border style={{ marginBottom: 16 }} onClick={handleAddItem}>
        添加选项（最少2项，最多20项）
      </Button>
    </>
  )
}

export default VoteEditor
