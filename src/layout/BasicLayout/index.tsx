import React from 'react'

import GlobalHeader from 'src/layout/BasicLayout/GlobalHeader'
import s from './index.m.scss'

const BasicLayout: React.FC = ({ children }) => (
  <div className={s.basicLayoutRoot}>
    <div className={s.header}>
      <GlobalHeader />
    </div>
    <div className={s.main}>{children}</div>
    <div className={s.footer}>Global Footer</div>
  </div>
)

export default BasicLayout
