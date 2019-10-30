/**
 * 版面顶部的按钮，发帖，发投票
 * 还有广告
 */

import React from 'react'
import { IBoard } from '@cc98/api'
import { RootStore } from 'src/store'
import LOCK_STATE from 'src/constants/LockState'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Button from 'src/components/Button'

import s from 'src/pages/board/components/BoardTopButtons.m.scss'

interface IBoardTopButtonsProps {
  data: IBoard
}

function selector(store: RootStore) {
  return {
    isLogin: store.global.isLogin,
    isVerified: store.global.currentUser ? store.global.currentUser.isVerified : true,
    isLocked: store.global.currentUser
      ? store.global.currentUser.lockState !== LOCK_STATE.NORMAL
      : false,
  }
}

const renderButtons = (
  { isLocked, isVerified, isLogin }: ReturnType<typeof selector>,
  { canVote, id }: IBoard,
  history: ReturnType<typeof useHistory>
) => {
  if (!isLogin) {
    return (
      <p className={s.info}>
        您还未登录，不能发帖，请先<Link to="/logon">登录</Link>。
      </p>
    )
  }

  if (!isVerified) {
    return (
      <p className={s.info}>
        您的帐号未认证，无法发言，请先前往
        <a href="https://account.cc98.org" target="_blank" rel="noreferrer noopener">
          https://account.cc98.org
        </a>
        认证激活。
      </p>
    )
  }

  if (isLocked) {
    return <p className={s.info}>你被全站禁言。</p>
  }

  return (
    <>
      <Button onClick={() => history.push(`/editor/send-topic/${id}`)} className={s.button} primary>
        发主题
      </Button>
      {canVote && (
        <Button
          onClick={() => history.push(`/editor/send-topic/${id}?isVote=1`)}
          className={s.button}
          primary
        >
          发投票
        </Button>
      )}
    </>
  )
}

const BoardTopButtons: React.FC<IBoardTopButtonsProps> = ({ data }) => {
  const result = useSelector(selector)

  return (
    <div className={s.root}>
      {renderButtons(result, data, useHistory())}
      <div className={s.placeholder} />
    </div>
  )
}

export default BoardTopButtons
