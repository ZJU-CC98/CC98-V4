import React from 'react'
import { range } from 'lodash'
import { IEditUserInfo, IUser } from '@cc98/api'
import Select from 'src/components/Select'
import { getAllDisplayTitles } from 'src/service/config'

import s from './ConfigGeneral.m.scss'

interface IConfigGeneralProps {
  value: IEditUserInfo
  onChange: (value: Partial<IEditUserInfo>) => void
  user: IUser
}

const GENDER = [
  {
    value: 1,
    label: '男',
  },
  {
    value: 0,
    label: '女',
  },
]

const YEAR = range(1920, new Date().getFullYear()).map(year => ({
  label: `${year}`,
  value: year,
}))
YEAR.unshift({ label: '未选择', value: 0 }, { label: '保密', value: 9999 })

const MONTH = range(1, 13)
const DAY = range(1, 32)

const ConfigGeneral: React.FC<IConfigGeneralProps> = ({ value, onChange, user }) => {
  const { userTitleIds = [] } = user
  const [displayTitleMap, setDisplayTitleMap] = React.useState<{ [key: number]: string }>({})

  React.useEffect(() => {
    getAllDisplayTitles().then(titles => {
      setDisplayTitleMap(
        titles.reduce(
          (res, cur) => {
            res[cur.id] = cur.name
            return res
          },
          {} as { [key: number]: string }
        )
      )
    })
  }, [])

  return (
    <div>
      <p className={s.row}>
        <label className={s.label}>性别</label>
        <Select value={value.Gender} onChange={Gender => onChange({ Gender })} data={GENDER} />
      </p>
      <p className={s.row}>
        <label className={s.label}>生日</label>
        <span className={s.birthday}>
          <Select
            value={value.BirthdayYear}
            onChange={BirthdayYear => onChange({ BirthdayYear })}
            data={YEAR}
          />
          <span className={s.birthdayLabel}>年</span>
          <Select
            value={value.BirthdayMonth}
            onChange={BirthdayMonth => onChange({ BirthdayMonth })}
            data={MONTH}
          />
          <span className={s.birthdayLabel}>月</span>
          <Select
            value={value.BirthdayDay}
            onChange={BirthdayDay => onChange({ BirthdayDay })}
            data={DAY}
          />
          <span className={s.birthdayLabel}>日</span>
        </span>
      </p>
      <p className={s.row}>
        <label className={s.label}>头衔</label>
        <Select
          value={value.DisplayTitleId}
          onChange={DisplayTitleId => onChange({ DisplayTitleId })}
          data={userTitleIds.map(item => ({ label: displayTitleMap[item] || '', value: item }))}
        />
      </p>
      <p className={s.row}>
        <label className={s.label}>QQ</label>
        <input type="text" value={value.QQ} onChange={e => onChange({ QQ: e.target.value })} />
      </p>
      <p className={s.row}>
        <label className={s.label}>邮箱</label>
        <input
          type="text"
          value={value.EmailAddress}
          onChange={e => onChange({ EmailAddress: e.target.value })}
        />
      </p>
      <p className={s.row}>
        <label style={{ alignSelf: 'flex-start' }} className={s.label}>
          个人简介
        </label>
        <div>
          <textarea
            value={value.Introduction}
            onChange={e => onChange({ Introduction: e.target.value })}
          />
          <p style={{ fontSize: 12 }}>*不超过100字</p>
        </div>
      </p>
    </div>
  )
}

export default ConfigGeneral
