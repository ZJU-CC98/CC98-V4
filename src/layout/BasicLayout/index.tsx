import React from 'react'

import s from './index.m.scss'

const BasicLayout: React.FC = ({ children }) => (
  <div className={s.basicLayoutRoot}>
    <div className={s.header}>Global Title</div>
    <div className={s.main}>{children}</div>
    <div className={s.footer}>Global Footer</div>
  </div>
)

export default BasicLayout
