import React from 'react'
import cn from 'classnames'

import s from './HomeContainer.m.scss'

const HomeContainer: React.FC<{ color?: 'primary' | 'second' }> = ({
  children,
  color = 'primary',
}) => (
  <div
    className={cn(s.root, {
      [s.second]: color === 'second',
    })}
  >
    {children}
  </div>
)

export default HomeContainer
