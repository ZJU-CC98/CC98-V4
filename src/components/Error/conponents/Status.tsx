import React from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

import s from './Status.m.scss'

interface IStatusProps {
  description: string
  img: string
  title: string
  extraContent?: React.ReactNode
}

const Status: React.FC<IStatusProps> = ({ description, img, extraContent = null, title }) => {
  useDocumentTitle(title)

  return (
    <div className={s.root}>
      <img className={s.img} src={img} />
      <p className={s.title}>糟糕！好像出错了</p>
      <p className={s.desc}>{description}</p>
      <div className={s.link}>
        <Link to="/">返回首页</Link>
        {extraContent}
      </div>
    </div>
  )
}

export default Status
