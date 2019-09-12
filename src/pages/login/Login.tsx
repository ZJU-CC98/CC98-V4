import React from 'react'
import cn from 'classnames'
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { RouterAction } from 'connected-react-router'

import snow from 'src/assets/login/login_snow.png'
import welcome from 'src/assets/login/login_welcome.png'

import { getMe } from 'src/service/user'
import Button from 'src/components/Button'
import { login } from 'src/service/oauth'
import { removeLocalStorage, setLocalStorage } from 'src/utils/storage'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import s from './Login.m.scss'

const REFRESH_TOKEN_EXPIRED_TIME = 2592000
const CODE_WRONG_PASSWORD = 400
const USER_LOCKED_STATES = [1, 2]

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [formInfo, setFormInfo] = React.useState('')
  const dispatch = useDispatch() as Dispatch<GlobalActions | RouterAction>

  useBreadcrumb([])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (!username) {
      setFormInfo('请输入用户名')
      return
    }

    if (!password) {
      setFormInfo('请输入密码')
      return
    }

    login(username, password)
      // eslint-disable-next-line camelcase
      .then(({ refresh_token, access_token, expires_in, token_type }) => {
        // eslint-disable-next-line camelcase
        const newToken = `${token_type} ${access_token}`
        // eslint-disable-next-line camelcase
        setLocalStorage('accessToken', newToken, expires_in)
        setLocalStorage('refreshToken', refresh_token, REFRESH_TOKEN_EXPIRED_TIME)

        return true
      })
      .catch(error => {
        if (error.isAxiosError && error.response.status === CODE_WRONG_PASSWORD) {
          setFormInfo('登录失败 密码错误')
          return
        }

        setFormInfo(`登录失败 未知错误 ${error.message}`)
      })
      .then(isSuccess => {
        if (isSuccess) {
          return getMe()
        }
      })
      .then(currentUser => {
        if (currentUser && USER_LOCKED_STATES.includes(currentUser.lockState)) {
          setFormInfo('登录失败 用户已锁定')
          removeLocalStorage('accessToken')
          removeLocalStorage('refreshToken')
          removeLocalStorage('userInfo')
          return
        }

        setFormInfo('登录成功 正在返回')
        // TODO: user theme
        dispatch({
          type: GLOBAL_ACTION_TYPES.LOGIN_AND_SET_CURRENT_USER,
          payload: currentUser!,
        })
        setTimeout(() => {
          if (history.length === 1) {
            history.push('/')
          } else {
            history.go(-1)
          }
        }, 100)
      })
  }

  return (
    <div className={s.root}>
      <div>
        <img className={s.snow} src={snow} />
      </div>
      <div className={s.right}>
        <img className={s.welcome} src={welcome} />
        <form className={s.form} onSubmit={handleSubmit} autoComplete="on">
          <div className={s.formRow}>
            <label className={s.label}>用户名</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={s.content}
              name="username"
              type="text"
              autoComplete="on"
            />
          </div>
          <div className={s.formRow}>
            <label className={s.label}>密码</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={s.content}
              name="password"
              type="password"
              autoComplete="on"
            />
          </div>
          {formInfo !== '' && <p className={cn(s.content, s.formInfo)}>{formInfo}</p>}
          <Button className={s.content} type="submit" primary>
            登录帐号
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
