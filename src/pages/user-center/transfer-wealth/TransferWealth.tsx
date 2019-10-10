import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useSelector } from 'react-redux'
import Button from 'src/components/Button'
import { RootStore } from 'src/store'
import { transferWealth } from 'src/service/user'

import s from './TransferWealth.m.scss'

function selector(state: RootStore) {
  return {
    currentWealth: state.global.currentUser ? state.global.currentUser.wealth : 0,
  }
}

const renderInfo = () => (
  <>
    <p>说明</p>
    <ul style={{ marginLeft: '2.5rem' }}>
      <li>
        转账需要收取一定的手续费，手续费金额为<strong>10% 或者 10 中的较大值</strong>。
      </li>
      <li>转账手续费从转账金额中收取，因此对方实际收到的金额会少于您输入的金额。</li>
      <li>
        转账的最小金额不能小于 <strong>10</strong>
      </li>
      <li>
        可以对多人转账，请在收款人一栏用空格隔开每个用户。多人转账时每个用户都会收到您指定的金额并单独扣除手续费。您最多可以同时向{' '}
        <strong>10</strong> 个用户进行转账。
      </li>
    </ul>
  </>
)

const TransferWealth: React.FC<RouteComponentProps> = () => {
  const [userNames, setUserNames] = React.useState('')
  const [wealth, setWealth] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [info, setInfo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { currentWealth } = useSelector(selector)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (loading) return

    setInfo('')
    setLoading(true)

    try {
      if (!userNames) throw new Error('请输入收款人信息')
      const wealthNumber = parseFloat(wealth)
      if (/\D/.test(wealth) || wealthNumber < 10) throw new Error('请输入合法的金额')
      if (!reason) throw new Error('请输入理由')

      // 去重 + 移除空白
      const names = Array.from(new Set(userNames.split(/\s+/).filter(item => item !== '')))

      if (currentWealth < names.length * wealthNumber) throw new Error('财富值不足')

      setInfo('转账中')
      transferWealth(names, wealthNumber, reason)
        .then(successNames => {
          setInfo(
            `成功给${successNames.join(' ')}转账了总计${wealthNumber * successNames.length}个财富值`
          )
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (err) {
      setInfo(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>转账</h2>
      <div className={s.row}>
        <p>收款人</p>
        <input value={userNames} onChange={e => setUserNames(e.target.value)} />
      </div>
      <div className={s.row}>
        <p>金额</p>
        <input value={wealth} onChange={e => setWealth(e.target.value)} />
      </div>
      <div className={s.row}>
        <p>理由</p>
        <input value={reason} onChange={e => setReason(e.target.value)} />
      </div>
      <div className={s.row}>{renderInfo()}</div>
      <div className={s.row} style={{ justifyContent: 'center' }}>
        <Button type="submit" disabled={loading}>
          转账
        </Button>
      </div>
      <p className="transfer-wealth-info">{info}</p>
    </form>
  )
}

export default TransferWealth
