import React from 'react'
import cn from 'classnames'

import s from './HomeContainer.m.scss'

const HomeContainer: React.FC<{ color?: 'primary' | 'second'; className?: string }> = ({
  children,
  color = 'primary',
  className,
}) => (
  <div
    className={cn(
      s.root,
      {
        [s.second]: color === 'second',
      },
      className
    )}
  >
    {children}
  </div>
)

export default HomeContainer
