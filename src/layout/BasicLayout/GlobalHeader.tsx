import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { sum } from 'lodash'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import Tippy from '@tippy.js/react'
import { RootStore } from 'src/store'
import { GLOBAL_ACTION_TYPES } from 'src/store/global-actions'
import { getMe } from 'src/service/user'
import { clearAll } from 'src/utils/indexedDb'
import { refreshMessageCount, refreshSignInInfo } from 'src/store/global-async-actions'
import { MESSAGE_BASE_PATH } from 'src/pages/message/constants'

import icon from 'src/assets/98LOGO.ico'

import PRIVILEGE from 'src/constants/Privilege'
import HeaderSearch from './HeaderSearch'
import s from './GlobalHeader.m.scss'

function selector(store: RootStore) {
  return {
    isLogin: store.global.isLogin,
    user: store.global.currentUser || ({} as any),
    messageCount: store.global.messageCount,
    signInInfo: store.global.signInInfo,
  }
}

const GlobalHeader: React.FC<{ isHome: boolean }> = ({ isHome }) => {
  const { isLogin, user, messageCount, signInInfo } = useSelector(selector)
  const totalMessageCount = sum(Object.values(messageCount))
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  function logout() {
    clearAll().catch(console.error)
    dispatch({
      type: GLOBAL_ACTION_TYPES.LOGOUT,
    })
  }

  React.useEffect(() => {
    window.addEventListener('storage', e => {
      if (e.key === 'userInfo') {
        if (e.oldValue === e.newValue) return
        if (e.newValue) {
          // 如果用户在其他页面重新登陆
          dispatch({
            type: GLOBAL_ACTION_TYPES.LOGIN_AND_SET_CURRENT_USER,
            payload: JSON.parse(e.newValue.slice(4)),
          })
          dispatch({
            type: GLOBAL_ACTION_TYPES.SET_ERROR,
            payload: null,
          })
        } else {
          // 如果用户在其他页面注销
          logout()
        }
      }
    })
  }, [])

  React.useEffect(() => {
    if (!pathname.startsWith(MESSAGE_BASE_PATH) && isLogin) {
      dispatch(refreshMessageCount())
    }
  }, [])

  React.useEffect(() => {
    if (isLogin) {
      getMe().then(payload => {
        dispatch({
          type: GLOBAL_ACTION_TYPES.SET_CURRENT_USER,
          payload,
        })

        dispatch({
          type: GLOBAL_ACTION_TYPES.SET_THEME,
          payload: payload.theme,
        })
      })

      dispatch(refreshSignInInfo())
    }
  }, [])

  return (
    <div
      className={cn(s.wrapper, {
        [s.notHome]: !isHome,
      })}
    >
      <div className={s.root}>
        <img className={s.logo} src={icon} />
        <h1 className={s.title}>
          <Link to="/">CC98论坛</Link>
        </h1>
        <div className={s.divider} />
        <div className={s.text}>
          <Link to="/board-list">版面列表</Link>
        </div>
        <div className={s.text}>
          <Link to="/new-topics">新帖</Link>
        </div>
        <div className={s.text}>
          <Link to="/focus">关注</Link>
        </div>
        <div className={s.search}>
          <HeaderSearch />
        </div>
        {isLogin ? (
          <>
            <Tippy
              className={s.popover}
              duration={100}
              interactive
              placement="top"
              offset="0, 2"
              animation="perspective"
              content={
                <div className={s.menu}>
                  <Link className={cn(s.menuItem, s.messageMenuItem)} to="/message/response">
                    回复我的
                    {!!messageCount.replyCount && (
                      <span className={s.messageCount}>{messageCount.replyCount}</span>
                    )}
                  </Link>
                  <Link className={cn(s.menuItem, s.messageMenuItem)} to="/message/at-me">
                    @ 我的
                    {!!messageCount.atCount && (
                      <span className={s.messageCount}>{messageCount.atCount}</span>
                    )}
                  </Link>
                  <Link className={cn(s.menuItem, s.messageMenuItem)} to="/message/system">
                    系统通知
                    {!!messageCount.systemCount && (
                      <span className={s.messageCount}>{messageCount.systemCount}</span>
                    )}
                  </Link>
                  <Link className={cn(s.menuItem, s.messageMenuItem)} to="/message/message">
                    我的私信
                    {!!messageCount.messageCount && (
                      <span className={s.messageCount}>{messageCount.messageCount}</span>
                    )}
                  </Link>
                </div>
              }
            >
              <div>
                <div
                  className={cn(s.message, {
                    [s.messageActive]: !!totalMessageCount,
                  })}
                >
                  {totalMessageCount || <Icon icon={faBell} />}
                </div>
              </div>
            </Tippy>
            <Tippy
              className={s.popover}
              duration={100}
              offset="24, -2"
              animation="perspective"
              content={
                <div className={s.menu}>
                  <Link to="/user-center" className={s.menuItem}>
                    个人中心
                  </Link>
                  {user!.privilege === PRIVILEGE.ADMIN && (
                    <Link to="/site-manage" className={s.menuItem}>
                      全站管理
                    </Link>
                  )}
                  <Link to="/sign-in" className={s.menuItem}>
                    {signInInfo?.hasSignedInToday ? '已签到' : '签到'}
                  </Link>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to="#" onClick={logout} className={s.menuItem}>
                    注销
                  </Link>
                </div>
              }
              placement="top"
              interactive
            >
              <div className={s.user}>
                <img className={s.avatar} src={user!.portraitUrl} />
                <span>{user!.name}</span>
              </div>
            </Tippy>
          </>
        ) : (
          <>
            <div className={s.text}>
              <Link to="/log-on">登录</Link>
            </div>
            <div className={s.text}>
              <a href="https://account.cc98.org/">注册</a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GlobalHeader
