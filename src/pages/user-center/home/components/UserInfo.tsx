import React from 'react'
import dayjs from 'dayjs'
import { IUser } from '@cc98/api'
import PRIVILEGE from 'src/constants/Privilege'
import { KeysMatching } from 'src/utils/types'
import UbbContainer from 'src/ubb'

import s from './UserInfo.m.scss'

interface IUserInfoProps {
  user: IUser
  buttons?: React.ReactNode
}

interface IUserInfoItem {
  key: KeysMatching<IUser, string | number | null>
  label: string
  render?: (value: string | number) => React.ReactNode
}

function getPrivilegeColor({ privilege }: IUser) {
  switch (privilege) {
    case PRIVILEGE.USER:
      return 'grey'
    case PRIVILEGE.SUPER_BOARD_MASTER:
      return 'pink'
    case PRIVILEGE.VIP:
      return 'blue'
    case PRIVILEGE.ADMIN:
      return 'red'
    default:
  }
}

const USER_INFO: IUserInfoItem[] = [
  {
    key: 'gender',
    label: '性别',
    render: gender => (gender === 1 ? '男' : '女'),
  },
  {
    key: 'postCount',
    label: '发帖数',
  },
  {
    key: 'wealth',
    label: '财富值',
  },
  {
    key: 'fanCount',
    label: '粉丝数',
  },
  {
    key: 'prestige',
    label: '威望',
  },
  {
    key: 'popularity',
    label: '风评',
  },
  {
    key: 'registerTime',
    label: '注册时间',
    render: date => dayjs(date!).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    key: 'lastLogOnTime',
    label: '最后登录',
    render: date => dayjs(date!).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    key: 'birthday',
    label: '生日',
    render: date => (date as string).slice(0, (date as string).indexOf('T')).replace('9999-', ''),
  },
  {
    key: 'displayTitle',
    label: '用户组',
  },
  {
    key: 'emailAddress',
    label: '邮箱',
  },
  {
    key: 'qq',
    label: 'QQ',
  },
  {
    key: 'deleteCount',
    label: '被删帖数',
    render: v => -v,
  },
]

const renderItem = ({ key, label, render = v => v }: IUserInfoItem, user: IUser) =>
  user[key] !== null && user[key] !== undefined ? (
    <p className={s.infoItem}>
      <span className={s.infoLabel}>{label}</span>
      <span>{render(user[key]!)}</span>
    </p>
  ) : null

const UserInfo: React.FC<IUserInfoProps> = ({ user, buttons }) => {
  return (
    <div className={s.root}>
      <p className={s.title}>
        <span className={s.userName}>{user.name}</span>
        <span className={s.privilege} style={{ color: getPrivilegeColor(user) }}>
          {user.privilege}
        </span>
        {buttons}
      </p>
      <p className={s.introduction}>{user.introduction}</p>
      <div className={s.infos}>{USER_INFO.map(item => renderItem(item, user))}</div>
      <div className={s.qmd}>
        <p className={s.qmdTitle}>个性签名</p>
        <div className={s.qmdContent}>
          <UbbContainer text={user.signatureCode} config={{ allowExternalImage: false }} />
        </div>
      </div>
    </div>
  )
}

export default UserInfo
