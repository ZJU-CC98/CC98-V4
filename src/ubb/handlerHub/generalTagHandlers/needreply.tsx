import { IGeneralTagHandler } from '@cc98/ubb-core'
import React from 'react'
import s from 'src/ubb/style.m.scss'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /needreply/,

  render() {
    return (
      <>
        <hr />
        <div className={s.needReply}>该内容回复后才可浏览</div>
        <hr />
      </>
    )
  },
}

export default handler
