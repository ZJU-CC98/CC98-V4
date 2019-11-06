import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IEditUserInfo, IUser } from '@cc98/api'
import { RootStore } from 'src/store'
import { defaultAxiosErrorHandler } from 'src/config/axios'
import Button from 'src/components/Button'
import { editMyInfo } from 'src/service/user'
import { refreshUserInfo } from 'src/store/global-async-actions'
import notice from 'src/utils/notice'

import ConfigAvatar from './components/ConfigAvatar'
import ConfigSignature from './components/ConfigSignature'
import ConfigGeneral from './components/ConfigGeneral'

import s from './UserConfig.m.scss'

interface IUserConfigComponentProps {
  value: IEditUserInfo
  onChange: (value: Partial<IEditUserInfo>) => void
  user: IUser
}

interface IUserConfigItem {
  label: string
  Component: React.ComponentType<IUserConfigComponentProps>
}

const CONFIG_ITEMS: IUserConfigItem[] = [
  {
    label: '修改头像',
    Component: ConfigAvatar,
  },
  {
    label: '修改签名档',
    Component: ConfigSignature,
  },
  {
    label: '其他设置',
    Component: ConfigGeneral,
  },
]

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

function transformUserToEdit(user: IUser): IEditUserInfo {
  return {
    EmailAddress: user.emailAddress || '',
    Gender: user.gender,
    Introduction: user.introduction,
    QQ: user.qq,
    SignatureCode: user.signatureCode,
    Birthday: user.birthday || '',
    DisplayTitleId: user.displayTitleId || 0,
    BirthdayYear: user.birthday ? Number.parseInt(user.birthday.slice(0, 4), 10) : 0,
    BirthdayMonth: user.birthday ? Number.parseInt(user.birthday.slice(5, 7), 10) : 0,
    BirthdayDay: user.birthday ? Number.parseInt(user.birthday.slice(8, 10), 10) : 0,
  }
}

const UserConfig: React.FC = () => {
  const { user } = useSelector(selector)
  const dispatch = useDispatch()

  const [data, setData] = React.useState<IEditUserInfo>()

  React.useEffect(() => {
    if (!user) {
      setData(undefined)
      return
    }

    setData(transformUserToEdit(user))
  }, [user])

  if (!user || !data) return null

  const handleSubmit = async () => {
    try {
      // 检测信息是否正确
      if (data.EmailAddress && !data.EmailAddress.match(/[\S]+@[\S]+\.[\S]+/)) {
        throw new Error('请检查邮箱地址')
      }

      if (
        data.QQ &&
        (Number.parseInt(data.QQ, 10) <= 0 || Number.parseInt(data.QQ, 10).toString() !== data.QQ)
      ) {
        throw new Error('请检查QQ是否正确')
      }

      const birthDay = new Date(data.BirthdayYear + 10, data.BirthdayMonth - 1, data.BirthdayDay)

      if (
        data.BirthdayYear !== 0 &&
        data.BirthdayYear !== 9999 &&
        birthDay.getTime() > Date.now()
      ) {
        throw new Error('请检查生日是否正确')
      }

      await editMyInfo({
        ...data,
        Birthday: data.BirthdayYear
          ? `${data.BirthdayYear}-${data.BirthdayMonth}-${data.BirthdayDay}`
          : '',
      })

      notice('修改成功')
      dispatch(refreshUserInfo())
    } catch (e) {
      defaultAxiosErrorHandler(e)
    }
  }

  return (
    <div>
      {CONFIG_ITEMS.map(({ label, Component }) => (
        <div className={s.block} key={label}>
          <p className={s.title}>{label}</p>
          <Component user={user} value={data} onChange={v => setData({ ...data, ...v })} />
        </div>
      ))}
      <div className={s.block}>
        <p className={s.title}>提交修改</p>
        <p className={s.buttons}>
          <Button onClick={handleSubmit} primary>
            提交
          </Button>
          <Button onClick={() => setData(transformUserToEdit(user))}>重置</Button>
        </p>
      </div>
    </div>
  )
}

export default UserConfig
