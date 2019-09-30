import React from 'react'
import { IRootHandler } from '@cc98/ubb-core/dist'

import s from 'src/ubb/style.m.scss'

const handler: IRootHandler<React.ReactNode> = {
  enter() {},

  exit() {},

  render(_, __, children) {
    return <div className={s.root}>{children}</div>
  },
}

export default handler
