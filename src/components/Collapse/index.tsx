import React from 'react'

import s from './index.m.scss'

interface ICollapseProps {
  content: React.ReactNode
  title: React.ReactNode
}

const Collapse: React.FC<ICollapseProps> = ({ content, title }) => {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className={s.root}>
      <div className={s.title} onClick={() => setVisible(!visible)}>
        {title}
      </div>
      {visible && <div className={s.content}>{content}</div>}
    </div>
  )
}

export default Collapse
