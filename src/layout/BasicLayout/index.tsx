import React from 'react'

import s from './index.m.scss'

const BasicLayout: React.FC = ({ children }) => (
  <div className={s.basicLayoutRoot}>
    <div>Global Title</div>
    {children}
  </div>
)

export default BasicLayout
