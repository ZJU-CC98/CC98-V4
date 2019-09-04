import React from 'react'
import cn from 'classnames'

import snow from 'src/assets/login/login_snow.png'
import welcome from 'src/assets/login/login_welcome.png'

import s from './Login.m.scss'
import Button from '../../components/Button'

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [formInfo, setFormInfo] = React.useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    console.log(username, password)
    if (!username) {
      setFormInfo('请输入用户名')
      return
    }
  }

  return (
    <div className={s.root}>
      <div>
        <img className={s.snow} src={snow} />
      </div>
      <div className={s.right}>
        <img className={s.welcome} src={welcome} />
        <form className={s.form} onSubmit={handleSubmit} autoComplete="on">
          <label className={s.label}>用户名</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={s.content}
            name="username"
            type="text"
            autoComplete="on"
          />
          <label className={s.label}>密码</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={s.content}
            name="password"
            type="password"
            autoComplete="on"
          />
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
