import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import Tippy from '@tippy.js/react'
import { RootStore } from 'src/store'

import icon from 'src/assets/98LOGO.ico'

import s from './GlobalHeader.m.scss'

function selector(store: RootStore) {
  return {
    isLogin: store.global.isLogin,
    user: store.global.currentUser,
  }
}

const GlobalHeader: React.FC = () => {
  const { isLogin, user } = useSelector(selector)

  return (
    <div className={s.root}>
      <img className={s.logo} src={icon} />
      <h1 className={s.title}>CC98论坛</h1>
      <div className={s.divider} />
      <div className={s.text}>
        <Link to="/boardList">版面列表</Link>
      </div>
      <div className={s.text}>
        <Link to="/newTopics">新帖</Link>
      </div>
      <div className={s.text}>
        <Link to="/focus">关注</Link>
      </div>
      <div className={s.search} />
      {isLogin ? (
        <>
          <Icon icon={faBell} />
          <Tippy
            className={s.popover}
            offset="24, -2"
            content={
              <div className={s.menu}>
                <Link to="/usercenter" className={s.menuItem}>
                  个人中心
                </Link>
                {user!.privilege === '管理员' && (
                  <Link to="/sitemanage" className={s.menuItem}>
                    全站管理
                  </Link>
                )}
                <Link to="/signin" className={s.menuItem}>
                  签到
                </Link>
                <p className={s.menuItem}>注销</p>
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
            <Link to="/logOn">登录</Link>
          </div>
          <div className={s.text}>
            <a href="https://account.cc98.org/">注册</a>
          </div>
        </>
      )}
    </div>
  )
}

export default GlobalHeader
