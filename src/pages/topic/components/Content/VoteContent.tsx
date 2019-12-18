import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { ITopic, IVoteResult } from '@cc98/api'
import { getVoteResult, voteTopic } from 'src/service/topic'
import Button from 'src/components/Button'
import notice from 'src/utils/notice'

import s from './VoteContent.m.scss'

interface IVoteContentProps {
  topicInfo: ITopic
  isLogin: boolean
}

const COLORS = ['#ff0000', '#ff8000', '#22b14c', '#00a2e8', '#3f48cc']

const VoteContent: React.FC<IVoteContentProps> = ({ topicInfo, isLogin }) => {
  const [voteResult, setVoteResult] = React.useState<IVoteResult>()
  const [refreshKey, setRefreshKey] = React.useState(0)
  const [selectedItems, setSelectedItems] = React.useState<number[]>([])
  const [isVoting, setIsVoting] = React.useState(false)

  React.useEffect(() => {
    getVoteResult(topicInfo.id).then(data => {
      setVoteResult(data)

      if (data.myRecord) {
        setSelectedItems(data.myRecord.items)
      }
    })
  }, [topicInfo.id, refreshKey])

  if (!voteResult) return null

  const handleVote = () => {
    setIsVoting(true)

    voteTopic(topicInfo.id, selectedItems).then(() => {
      notice('投票成功')
      setRefreshKey(i => i + 1)
    })
  }

  return (
    <div className={s.voteContent}>
      {voteResult.voteItems.map((item, index) => (
        <div className={s.voteItems} key={item.id}>
          <p
            className={s.voteDescription}
            onClick={() => {
              if (selectedItems.includes(item.id)) {
                setSelectedItems(r => r.filter(i => i !== item.id))
              } else {
                setSelectedItems(r => [...r, item.id])
              }
            }}
          >
            <input
              disabled={
                !voteResult.canVote || // 不能投票
                (selectedItems.indexOf(item.id) === -1 &&
                  selectedItems.length === voteResult.maxVoteCount) // 或者已经选中最多的选项
              }
              checked={selectedItems.includes(item.id)}
              type="checkbox"
            />
            <label>{item.description}</label>
          </p>
          <p className={s.voteBar}>
            <span className={s.voteTotal}>
              <span
                className={s.voteCurrent}
                style={{
                  backgroundColor: COLORS[index % 5],
                  width: (320 * item.count) / (voteResult.voteUserCount || 1),
                }}
              />
            </span>
            {voteResult.needVote && !voteResult.myRecord && voteResult.isAvailable ? null : (
              <span>
                {item.count}人/
                {((100 * item.count) / (voteResult.voteUserCount || 1)).toFixed(2)}%
              </span>
            )}
          </p>
        </div>
      ))}
      <div className={s.voteInfo}>
        <p>投票过期时间：{dayjs(voteResult.expiredTime).format('YYYY年MM月DD日 HH:mm:ss')}</p>
        <p>
          每人最多允许投{voteResult.maxVoteCount}票，已有
          {voteResult.voteUserCount}人参与投票。
        </p>
        {(() => {
          switch (true) {
            case !isLogin:
              return (
                <p>
                  你还未登录，请先<Link to="/logOn">登陆</Link>。
                </p>
              )
            case voteResult.canVote && voteResult.needVote:
              return <p>该投票在过期前，只有完成投票才能查看结果。你还未投过票，请先投票。</p>
            case !!voteResult.myRecord:
              return <p>你已经投过票了，你的投票选项是：{voteResult.myRecord.items.join('，')}。</p>
            default:
              return null
          }
        })()}
      </div>
      {!voteResult.canVote ? null : (
        <div className={s.voteButtons}>
          <Button
            onClick={handleVote}
            primary
            type="button"
            disabled={!selectedItems.length || isVoting}
          >
            投票
          </Button>
          <Button type="button" onClick={() => setSelectedItems([])}>
            重置
          </Button>
        </div>
      )}
    </div>
  )
}

export default VoteContent
