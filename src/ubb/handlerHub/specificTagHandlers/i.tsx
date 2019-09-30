import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import s from 'src/ubb/style.m.scss'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(_, __, children) {
    return <span className={s.i}>{children}</span>
  },
}

export default handler
