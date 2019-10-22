import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { RootStore } from 'src/store'
import UbbEditor from 'src/components/UbbEditor'
import Button from 'src/components/Button'
import { signIn } from 'src/service/user'
import { getGlobalConfig } from 'src/service/config'
import { getTopicInfo } from 'src/service/topic'
import { RouteComponentProps } from 'react-router'
import { getTotalPage } from 'src/pages/topic/utils'
import { refreshSignInInfo } from 'src/store/global-async-actions'

import s from './SignIn.m.scss'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '签到',
]

function selector(store: RootStore) {
  return {
    signInInfo: store.global.signInInfo,
  }
}

const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  useBreadcrumb(breadcrumb)
  const [value, setValue] = React.useState('')
  const { signInInfo } = useSelector(selector)
  const dispatch = useDispatch()

  const handleSignIn = async () => {
    await signIn(value)
    dispatch(refreshSignInInfo(true))
    const globalConfig = await getGlobalConfig()
    const signTopicInfo = await getTopicInfo(globalConfig.signInTopicId)

    const page = getTotalPage(false, 1, signTopicInfo)
    const floor = signTopicInfo.replyCount + 11 - page * 10

    history.push(`/topic/${signTopicInfo.id}/${page}#${floor}`)
  }

  return (
    <div className={s.root}>
      <h3 className={s.title}>论坛签到</h3>
      <p className={s.info}>
        签到功能是 CC98
        论坛提供的一项娱乐功能。每个用户每天可以签到一次，并获得额外的论坛财富值奖励。如果连续多日签到，则奖励会不断增加。目前财富值的奖励情况如下表所示：
      </p>
      <p className={s.item}>第 1 天： 600 到 1200 论坛财富值</p>
      <p className={s.item}>第 2 天： 700 到 1400 论坛财富值</p>
      <p className={s.item}>第 3 天： 800 到 1600 论坛财富值</p>
      <p className={s.item}>第 4 天： 900 到 1800 论坛财富值</p>
      <p className={s.item}>第 5 天及以后： 1000 到 2000 论坛财富值</p>
      {signInInfo && signInInfo.hasSignedInToday ? (
        <div className={s.sign}>
          <p>你上次的签到日期是{dayjs(signInInfo.lastSignInTime).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p>你已经连续签到了{signInInfo.lastSignInCount}天</p>
        </div>
      ) : (
        <div className={s.editor}>
          <p className={s.info}>你今天还未签到</p>
          <UbbEditor value={value} onChange={setValue} />
          <Button onClick={handleSignIn} primary>
            签到
          </Button>
        </div>
      )}
    </div>
  )
}

export default SignIn
