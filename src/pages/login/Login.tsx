import React from 'react'

import snow from 'src/assets/login/login_snow.png'
import welcome from 'src/assets/login/login_welcome.png'

import s from './Login.m.scss'

const Login: React.FC = () => {
  return (
    <div className={s.root}>
      <div>
        <img className={s.snow} src={snow} />
      </div>
      <div className={s.right}>
        <img className={s.welcome} src={welcome} />
        <form className={s.form} autoComplete="on">
          <label className={s.nameLabel}>用户名</label>
          <input className={s.nameInput} name="username" type="text" autoComplete="on" />
          <label className={s.passwordLabel}>密码</label>
          <input className={s.passwordInput} name="password" type="password" autoComplete="on" />
        </form>
      </div>
    </div>
  )
}

export default Login
