import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import s from './ItemTitle.m.scss'

interface IItemTitleProps {
  title: string
  extra?: React.ReactNode
  color?: 'primary' | 'second'
}

const ItemTitle: React.FC<IItemTitleProps> = ({ title, extra, color = 'primary' }) => (
  <div
    className={cn(s.root, {
      [s.second]: color === 'second',
    })}
  >
    <Icon icon={faVolumeUp} />
    <h3 className={s.title}>{title}</h3>
    {extra}
  </div>
)

export default ItemTitle
